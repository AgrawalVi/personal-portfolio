'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGame } from '@/contexts/game-context'
import { AnimatePresence, motion, Transition } from 'motion/react'

import type { GameId } from '@/types/games'
import type { TerminalLine } from '@/types/terminal'
import { COMMANDS } from '@/lib/terminal/commands'
import { makeGamesCommand } from '@/lib/terminal/game-commands'
import {
  makeNavigateCommand,
  makeRouteCommand,
} from '@/lib/terminal/navigate-command'
import { useTerminal } from '@/hooks/use-terminal'
import { Card } from '@/components/ui/card'
import { GamePanel } from '@/components/games/game-panel'

import { TerminalTitleBar } from './chrome/terminal-title-bar'
import { TerminalStream } from './stream/terminal-stream'

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 45,
} as const satisfies Transition

interface TerminalWidgetProps {
  initialLines?: Omit<TerminalLine, 'id'>[]
}

export function TerminalWidget({ initialLines }: TerminalWidgetProps = {}) {
  const {
    lines,
    input,
    isLoading,
    history,
    handleInputChange,
    handleKeyDown,
    outputRef,
    appendLine,
  } = useTerminal(initialLines)
  const showHint = !input && !isLoading && history.length === 0
  const { activeGame, lastScore, launchGame } = useGame()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    COMMANDS['games'] = makeGamesCommand(launchGame)
    COMMANDS['navigate'] = makeNavigateCommand(router)
    COMMANDS['experience'] = makeRouteCommand(
      router,
      '/experience',
      'View my work experience',
    )
    COMMANDS['projects'] = makeRouteCommand(
      router,
      '/projects',
      'Browse my projects',
    )
    COMMANDS['blog'] = makeRouteCommand(router, '/blog', 'Read the blog')
    COMMANDS['home'] = makeRouteCommand(router, '/', 'Go to home')
  }, [launchGame, router])

  useEffect(() => {
    if (lastScore) {
      appendLine(
        'system',
        `[${lastScore.gameId}] Game over — score: ${lastScore.score}`,
      )
    }
  }, [lastScore]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!activeGame) inputRef.current?.focus()
  }, [lines, activeGame])

  useEffect(() => {
    function onFocusEvent() {
      inputRef.current?.focus()
    }
    window.addEventListener('terminal:focus', onFocusEvent)
    return () => window.removeEventListener('terminal:focus', onFocusEvent)
  }, [])

  useEffect(() => {
    const pending = sessionStorage.getItem('pendingGame')
    if (!pending) return
    sessionStorage.removeItem('pendingGame')
    const valid: GameId[] = ['snake', 'space-invaders']
    if (!valid.includes(pending as GameId)) return
    // Read viewport directly: a state hook is false until its effect runs,
    // and pendingGame is already consumed above.
    if (window.matchMedia('(max-width: 767px)').matches) {
      appendLine(
        'error',
        'Games require keyboard controls. Open this site on a desktop browser to play.',
      )
      return
    }
    launchGame(pending as GameId)
  }, [launchGame, appendLine])

  return (
    <>
      {/* In-flow slot: terminal when idle, spacer when game is active */}
      {activeGame ? (
        <div className="h-[400px]" />
      ) : (
        <motion.div
          layoutId="terminal-card"
          transition={SPRING}
          className="h-[400px]"
        >
          <Card
            className="flex flex-col shadow-none border-border overflow-hidden cursor-text h-full"
            onClick={() => inputRef.current?.focus()}
          >
            <TerminalTitleBar />
            <TerminalStream
              lines={lines}
              input={input}
              isLoading={isLoading}
              isFocused={isFocused}
              showHint={showHint}
              outputRef={outputRef}
            />
          </Card>
        </motion.div>
      )}

      {/* Mobile: visible prompt input. Desktop (md+): sr-only, focus driven by Card click. */}
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading || !!activeGame}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Terminal input"
        placeholder="Type a command…"
        className="mt-3 block w-full rounded-md border border-border bg-muted/40 px-3 py-2 font-(family-name:--font-jetbrains-mono) text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 md:sr-only"
      />

      <AnimatePresence>
        {activeGame && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                layoutId="terminal-card"
                transition={SPRING}
                className="w-full max-w-3xl px-4 h-[480px] pointer-events-auto"
              >
                <Card className="flex flex-col shadow-none border-border overflow-hidden h-full">
                  <TerminalTitleBar />
                  <GamePanel />
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
