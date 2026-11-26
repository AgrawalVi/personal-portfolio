'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, type Transition } from 'motion/react'

import { useGame } from '@/contexts/game-context'
import { TerminalActionProvider } from '@/contexts/terminal-action-context'
import { HOME_QUICK_COMMANDS } from '@/constants/terminal'
import { useTerminal } from '@/hooks/use-terminal'
import {
  focusInputWithoutViewportPan,
  matchesTouchMode,
  useLockBodyScroll,
  usePhoneMode,
  usePreventOverlayTouchScroll,
  useTouchMode,
  useVisualViewport,
} from '@/hooks/use-touch-terminal'
import { COMMANDS } from '@/lib/terminal/commands'
import {
  GAMES_DESKTOP_ONLY_MESSAGE,
  makeGamesCommand,
} from '@/lib/terminal/game-commands'
import {
  makeNavigateCommand,
  makeRouteCommand,
} from '@/lib/terminal/navigate-command'
import { cn } from '@/lib/utils'
import { GamePanel } from '@/components/games/game-panel'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

import type { GameId } from '@/types/games'
import type { TerminalLine } from '@/types/terminal'

import { TerminalTitleBar } from './chrome/terminal-title-bar'
import { TerminalStream } from './stream/terminal-stream'
import { TouchTerminalDock } from './touch-terminal-dock'

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 45,
} as const satisfies Transition

const IDLE_HINT_DELAY_MS = 5_000

interface TerminalWidgetProps {
  initialLines?: Omit<TerminalLine, 'id'>[]
}

export function TerminalWidget(props: TerminalWidgetProps = {}) {
  const isPhoneMode = usePhoneMode()
  if (isPhoneMode) return null
  return <TerminalWidgetInner {...props} />
}

function TerminalWidgetInner({ initialLines }: TerminalWidgetProps = {}) {
  const {
    lines,
    input,
    isLoading,
    history,
    suggestions,
    canHistoryPrev,
    canHistoryNext,
    setInput,
    submitCommand,
    cancelInput,
    clearTerminal,
    historyPrev,
    historyNext,
    triggerTabComplete,
    handleInputChange,
    handleKeyDown,
    outputRef,
    appendLine,
  } = useTerminal(initialLines)
  const { activeGame, lastScore, launchGame } = useGame()
  const router = useRouter()
  const isTouchMode = useTouchMode()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [idleHintActive, setIdleHintActive] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const showFullscreen = isFullscreen && !activeGame
  const viewport = useVisualViewport(showFullscreen)

  const canReplayHint =
    !input &&
    !isLoading &&
    !activeGame &&
    lines.length === 0 &&
    history.length > 0
  const showHint =
    (!input && !isLoading && history.length === 0) ||
    (canReplayHint && idleHintActive)

  useEffect(() => {
    if (!canReplayHint) return
    const timer = setTimeout(() => setIdleHintActive(true), IDLE_HINT_DELAY_MS)
    return () => {
      clearTimeout(timer)
      setIdleHintActive(false)
    }
  }, [canReplayHint])

  useEffect(() => {
    COMMANDS['games'] = makeGamesCommand(launchGame, {
      hiddenFromHelp: isTouchMode,
    })
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
  }, [launchGame, router, isTouchMode])

  useEffect(() => {
    if (lastScore) {
      appendLine(
        'system',
        `[${lastScore.gameId}] Game over — score: ${lastScore.score}`,
      )
    }
  }, [lastScore]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-focus only on desktop (never randomly summon the software keyboard on touch devices)
  useEffect(() => {
    if (!activeGame && !isTouchMode) {
      inputRef.current?.focus()
    }
  }, [lines, activeGame, isTouchMode])

  // Lock background page scroll and prevent visualViewport touch-pan while fullscreen is open
  useLockBodyScroll(showFullscreen)
  usePreventOverlayTouchScroll(showFullscreen, fullscreenContainerRef)

  // Keep latest output scrolled into view when toggling fullscreen or virtual keyboard
  useEffect(() => {
    if (!showFullscreen) return
    const raf = requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [showFullscreen, viewport.height, outputRef])

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
    // Read media query directly: pendingGame is already consumed above.
    if (matchesTouchMode()) {
      appendLine('error', GAMES_DESKTOP_ONLY_MESSAGE)
      return
    }
    launchGame(pending as GameId)
  }, [launchGame, appendLine])

  const selectCommand = useCallback(
    (command: string, options?: { prefillOnly?: boolean }) => {
      if (options?.prefillOnly) {
        setInput(command)
        focusInputWithoutViewportPan(inputRef.current, showFullscreen)
        return
      }
      submitCommand(command)
    },
    [setInput, submitCommand, showFullscreen],
  )

  const exitFullscreen = useCallback(() => {
    inputRef.current?.blur()
    setIsFullscreen(false)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      inputRef.current?.blur()
    }
    setIsFullscreen((prev) => !prev)
  }, [isFullscreen])

  const terminalInner = (
    <TerminalActionProvider value={{ selectCommand }}>
      <TerminalTitleBar
        isFullscreen={showFullscreen}
        showFullscreenToggle={isTouchMode}
        onToggleFullscreen={toggleFullscreen}
      />
      <TerminalStream
        lines={lines}
        input={input}
        isLoading={isLoading}
        isFocused={isFocused}
        showHint={showHint}
        hideCurrentLine={isTouchMode}
        outputRef={outputRef}
      />
      {isTouchMode && (
        <TouchTerminalDock
          input={input}
          isLoading={isLoading}
          disabled={!!activeGame}
          showHint={showHint}
          inputRef={inputRef}
          suggestions={suggestions}
          quickCommands={HOME_QUICK_COMMANDS}
          canHistoryPrev={canHistoryPrev}
          canHistoryNext={canHistoryNext}
          hasLines={lines.length > 0}
          safeAreaBottom={showFullscreen && !viewport.isKeyboardOpen}
          preventFocusScroll={showFullscreen}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmit={submitCommand}
          onSetInput={setInput}
          onTabComplete={triggerTabComplete}
          onHistoryPrev={historyPrev}
          onHistoryNext={historyNext}
          onCancel={cancelInput}
          onClear={clearTerminal}
        />
      )}
    </TerminalActionProvider>
  )

  const inlineHeightClass = isTouchMode
    ? 'h-[390px] sm:h-[440px]'
    : 'h-[400px]'

  return (
    <>
      <p className="text-xs text-muted-foreground font-(family-name:--font-jetbrains-mono) mb-3 sm:mb-4">
        {isTouchMode ? (
          <>
            Type <span className="text-foreground">help</span> or tap a command
            to explore.
          </>
        ) : (
          <>
            Type <span className="text-foreground">help</span> to explore.
          </>
        )}
      </p>

      {/* In-flow slot: terminal when idle & inline, spacer when game or fullscreen is active */}
      {activeGame || showFullscreen ? (
        <div className={inlineHeightClass} />
      ) : (
        <motion.div
          layoutId="terminal-card"
          transition={SPRING}
          className={inlineHeightClass}
        >
          <Card
            className={cn(
              'flex flex-col shadow-none border-border overflow-hidden h-full py-0 gap-0',
              !isTouchMode && 'cursor-text',
            )}
            onClick={() => {
              if (!isTouchMode) inputRef.current?.focus()
            }}
          >
            {terminalInner}
          </Card>
        </motion.div>
      )}

      {/* Desktop-only sr-only input driven by Card click; touch devices use the integrated TouchTerminalDock */}
      {!isTouchMode && (
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
          className="sr-only"
        />
      )}

      {/* Fullscreen touch/tablet terminal dialog — synced to visualViewport so keyboard never obscures input */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            key="terminal-fullscreen-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={exitFullscreen}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <Dialog
        open={showFullscreen}
        modal={false}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) exitFullscreen()
        }}
      >
        <DialogContent
          ref={fullscreenContainerRef}
          showCloseButton={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          style={
            viewport.height !== null
              ? { top: viewport.offsetTop, height: viewport.height }
              : undefined
          }
          className="fixed inset-x-0 top-0 left-0 translate-x-0 translate-y-0 h-dvh w-full max-w-none sm:max-w-none rounded-none border-0 ring-0 bg-transparent p-0 md:p-6 shadow-none flex flex-col gap-0 pointer-events-none motion-safe:transition-[height] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]"
        >
          <DialogTitle className="sr-only">Interactive terminal</DialogTitle>
          <DialogDescription className="sr-only">
            Fullscreen interactive portfolio terminal
          </DialogDescription>
          <Card className="pointer-events-auto w-full h-full md:max-w-3xl md:mx-auto flex flex-col shadow-2xl border-0 md:border md:border-border rounded-none md:rounded-xl overflow-hidden py-0 gap-0 pt-[env(safe-area-inset-top)] md:pt-0 bg-card">
            {terminalInner}
          </Card>
        </DialogContent>
      </Dialog>

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
                <Card className="flex flex-col shadow-none border-border overflow-hidden h-full py-0 gap-0">
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
