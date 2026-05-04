'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import { COMMANDS } from '@/lib/terminal/commands'
import { makeGamesRouteCommand } from '@/lib/terminal/game-commands'
import { makeNavigateCommand, makeRouteCommand } from '@/lib/terminal/navigate-command'
import { useTerminal } from '@/hooks/use-terminal'

import { TerminalCurrentLine } from './stream/terminal-current-line'
import { TerminalLine } from './stream/terminal-line'

const SHELL_LAYOUT_ID = 'global-terminal-shell'
const SHELL_TRANSITION = {
  type: 'spring' as const,
  stiffness: 210,
  damping: 22,
  mass: 1.05,
}

function TerminalBody({
  onClose,
  inputRef,
}: {
  onClose: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const { lines, input, isLoading, handleInputChange, handleKeyDown, outputRef } =
    useTerminal([])
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    COMMANDS['navigate'] = makeNavigateCommand(router)
    COMMANDS['home'] = makeRouteCommand(router, '/', 'Go to home')
    COMMANDS['experience'] = makeRouteCommand(router, '/experience', 'View my work experience')
    COMMANDS['projects'] = makeRouteCommand(router, '/projects', 'Browse my projects')
    COMMANDS['blog'] = makeRouteCommand(router, '/blog', 'Read the blog')
    COMMANDS['games'] = makeGamesRouteCommand(router)
  }, [router])

  function onKeyDownWrap(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      e.preventDefault()
      inputRef.current?.blur()
      onClose()
      return
    }
    handleKeyDown(e)
  }

  return (
    <div onClick={() => inputRef.current?.focus()} className="cursor-text">
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
        <TerminalCurrentLine
          input={input}
          isLoading={isLoading}
          isFocused={isFocused}
          showHint={false}
        />
      </div>
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDownWrap}
        disabled={isLoading}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Terminal input"
        className="sr-only"
      />
    </div>
  )
}

function HintBody() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground font-(family-name:--font-jetbrains-mono) select-none">
      <span>press</span>
      <kbd className="rounded border border-border/60 bg-background/40 px-1.5 py-0.5 text-[0.7rem] leading-none font-(family-name:--font-jetbrains-mono)">
        /
      </kbd>
      <span>to open terminal</span>
    </div>
  )
}

export function GlobalTerminalLauncher() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useLayoutEffect(() => {
    if (!open) return
    inputRef.current?.focus({ preventScroll: true })
    const raf = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(raf)
  }, [open])

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

  useEffect(() => {
    if (!open) return
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  if (pathname === '/') return null

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 flex justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {open ? (
          <motion.div
            key="terminal"
            ref={wrapperRef}
            layoutId={SHELL_LAYOUT_ID}
            transition={SHELL_TRANSITION}
            initial={{ borderRadius: 9999, scale: 0.96 }}
            animate={{ borderRadius: 12, scale: 1 }}
            exit={{ borderRadius: 9999, scale: 0.96 }}
            className="w-full overflow-hidden border border-border/40 bg-background/80 backdrop-blur-md shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: { delay: 0.18, duration: 0.24, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                filter: 'blur(6px)',
                transition: { duration: 0.1 },
              }}
            >
              <TerminalBody onClose={() => setOpen(false)} inputRef={inputRef} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="hint"
            layoutId={SHELL_LAYOUT_ID}
            transition={SHELL_TRANSITION}
            initial={{ borderRadius: 12, scale: 0.96 }}
            animate={{ borderRadius: 9999, scale: 1 }}
            exit={{ borderRadius: 12, scale: 0.96 }}
            className="overflow-hidden border border-border/30 bg-background/40 backdrop-blur-md pointer-events-none"
            aria-hidden
          >
            <motion.div
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                transition: { delay: 0.14, duration: 0.2, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                filter: 'blur(4px)',
                transition: { duration: 0.08 },
              }}
            >
              <HintBody />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
