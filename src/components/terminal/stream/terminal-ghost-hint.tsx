'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { TERMINAL_HINT_COMMANDS } from '@/constants/terminal'

const TYPE_MS = 80
const DELETE_MS = 45
const HOLD_MS = 900
const PAUSE_MS = 350
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type Phase = 'typing' | 'holding' | 'deleting' | 'pausing'

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getReducedMotionServerSnapshot() {
  return false
}

function pickNext(current: string, pool: readonly string[]): string {
  if (pool.length <= 1) return pool[0] ?? ''
  let next = current
  while (next === current) {
    next = pool[Math.floor(Math.random() * pool.length)]
  }
  return next
}

interface TerminalGhostHintProps {
  commands?: readonly string[]
}

export function TerminalGhostHint({
  commands = TERMINAL_HINT_COMMANDS,
}: TerminalGhostHintProps) {
  const [target, setTarget] = useState(() => pickNext('', commands))
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduced) return

    if (phase === 'typing') {
      if (text === target) {
        timerRef.current = setTimeout(() => setPhase('holding'), 0)
        return
      }
      timerRef.current = setTimeout(() => {
        setText(target.slice(0, text.length + 1))
      }, TYPE_MS)
    } else if (phase === 'holding') {
      timerRef.current = setTimeout(() => setPhase('deleting'), HOLD_MS)
    } else if (phase === 'deleting') {
      if (text.length === 0) {
        timerRef.current = setTimeout(() => setPhase('pausing'), 0)
        return
      }
      timerRef.current = setTimeout(() => {
        setText(t => t.slice(0, -1))
      }, DELETE_MS)
    } else if (phase === 'pausing') {
      timerRef.current = setTimeout(() => {
        setTarget(prev => pickNext(prev, commands))
        setPhase('typing')
      }, PAUSE_MS)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [phase, text, target, commands, reduced])

  if (reduced) return null

  return (
    <span
      aria-hidden
      className="text-muted-foreground/60 select-none pointer-events-none"
    >
      {text}
    </span>
  )
}
