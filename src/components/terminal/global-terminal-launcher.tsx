'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { COMMANDS } from '@/lib/terminal/commands'
import { makeGamesRouteCommand } from '@/lib/terminal/game-commands'
import { makeNavigateCommand, makeRouteCommand } from '@/lib/terminal/navigate-command'
import { useTerminal } from '@/hooks/use-terminal'

import { TerminalCurrentLine } from './stream/terminal-current-line'
import { TerminalLine } from './stream/terminal-line'

function FloatingTerminal({ onClose }: { onClose: () => void }) {
  const { lines, input, isLoading, handleInputChange, handleKeyDown, outputRef } = useTerminal([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    COMMANDS['navigate'] = makeNavigateCommand(router)
    COMMANDS['home'] = makeRouteCommand(router, '/', 'Go to home')
    COMMANDS['experience'] = makeRouteCommand(router, '/experience', 'View my work experience')
    COMMANDS['projects'] = makeRouteCommand(router, '/projects', 'Browse my projects')
    COMMANDS['blog'] = makeRouteCommand(router, '/blog', 'Read the blog')
    COMMANDS['games'] = makeGamesRouteCommand(router)
  }, [router])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [onClose])

  function onKeyDownWrap(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }
    handleKeyDown(e)
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => inputRef.current?.focus()}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
    >
      <div className="flex flex-col rounded-lg border border-border/40 bg-background/70 backdrop-blur-md shadow-lg overflow-hidden cursor-text">
        {lines.length > 0 && (
          <div
            ref={outputRef}
            className="font-(family-name:--font-jetbrains-mono) max-h-[40vh] overflow-y-auto px-4 py-3 space-y-0.5 border-b border-border"
          >
            {lines.map((line) => (
              <TerminalLine key={line.id} line={line} />
            ))}
          </div>
        )}
        <div className="font-(family-name:--font-jetbrains-mono) px-4 py-3">
          <TerminalCurrentLine input={input} isLoading={isLoading} isFocused={isFocused} showHint={false} />
        </div>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDownWrap}
          disabled={isLoading}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
          className="sr-only"
        />
      </div>
    </div>
  )
}

export function GlobalTerminalLauncher() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== '/') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return
      }
      e.preventDefault()
      if (pathname === '/') {
        window.dispatchEvent(new CustomEvent('terminal:focus'))
      } else {
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [pathname])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (pathname === '/') return null
  if (open) return <FloatingTerminal onClose={() => setOpen(false)} />
  return <TerminalHint />
}

function TerminalHint() {
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-10 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-center gap-1.5 rounded-full border border-border/30 bg-background/30 backdrop-blur-md px-3 py-1.5 text-xs text-muted-foreground font-(family-name:--font-jetbrains-mono)">
        <span>press</span>
        <kbd className="rounded border border-border/60 bg-background/40 px-1.5 py-0.5 text-[0.7rem] leading-none font-(family-name:--font-jetbrains-mono)">
          /
        </kbd>
        <span>to open terminal</span>
      </div>
    </div>
  )
}
