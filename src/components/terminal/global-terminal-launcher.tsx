'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Maximize2, Minimize2, Terminal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { TerminalActionProvider } from '@/contexts/terminal-action-context'
import {
  getGlobalQuickCommands,
  HOME_QUICK_COMMANDS,
} from '@/constants/terminal'
import { useTerminal } from '@/hooks/use-terminal'
import {
  focusInputWithoutViewportPan,
  useLockBodyScroll,
  usePhoneMode,
  usePreventOverlayTouchScroll,
  useTouchMode,
  useVisualViewport,
  type VisualViewportState,
} from '@/hooks/use-touch-terminal'
import { COMMANDS } from '@/lib/terminal/commands'
import { makeGamesRouteCommand } from '@/lib/terminal/game-commands'
import {
  makeNavigateCommand,
  makeRouteCommand,
} from '@/lib/terminal/navigate-command'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { TerminalCurrentLine } from './stream/terminal-current-line'
import { TerminalLine } from './stream/terminal-line'
import { TouchTerminalDock } from './touch-terminal-dock'

const SHELL_LAYOUT_ID = 'global-terminal-shell'
const SHELL_TRANSITION = {
  type: 'spring' as const,
  stiffness: 210,
  damping: 22,
  mass: 1.05,
}

function DesktopTerminalBody({
  onClose,
  inputRef,
}: {
  onClose: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const {
    lines,
    input,
    isLoading,
    setInput,
    submitCommand,
    handleInputChange,
    handleKeyDown,
    outputRef,
  } = useTerminal([])
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    COMMANDS['navigate'] = makeNavigateCommand(router)
    COMMANDS['home'] = makeRouteCommand(router, '/', 'Go to home')
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
    COMMANDS['games'] = makeGamesRouteCommand(router)
  }, [router])

  const selectCommand = useCallback(
    (command: string, options?: { prefillOnly?: boolean }) => {
      if (options?.prefillOnly) {
        setInput(command)
        inputRef.current?.focus()
        return
      }
      submitCommand(command)
    },
    [setInput, submitCommand, inputRef],
  )

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
    <TerminalActionProvider value={{ selectCommand }}>
      <div
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="relative cursor-text"
      >
        {lines.length > 0 && (
          <div
            ref={outputRef}
            className="font-(family-name:--font-jetbrains-mono) max-h-[40vh] overflow-y-auto overscroll-contain px-4 py-3 space-y-0.5 border-b border-border"
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
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
          className="sr-only top-0 left-0"
        />
      </div>
    </TerminalActionProvider>
  )
}

function TouchTerminalBody({
  pathname,
  expanded,
  viewport,
  inputRef,
  onToggleExpanded,
  onClose,
}: {
  pathname: string
  expanded: boolean
  viewport: VisualViewportState
  inputRef: React.RefObject<HTMLInputElement | null>
  onToggleExpanded: () => void
  onClose: () => void
}) {
  const {
    lines,
    input,
    isLoading,
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
  } = useTerminal([])
  const router = useRouter()

  useEffect(() => {
    COMMANDS['navigate'] = makeNavigateCommand(router)
    COMMANDS['home'] = makeRouteCommand(router, '/', 'Go to home')
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
    COMMANDS['games'] = makeGamesRouteCommand(router, { hiddenFromHelp: true })
  }, [router])

  // Keep output scrolled to bottom when software keyboard opens/resizes
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [viewport.height, expanded, outputRef])

  const selectCommand = useCallback(
    (command: string, options?: { prefillOnly?: boolean }) => {
      if (options?.prefillOnly) {
        setInput(command)
        focusInputWithoutViewportPan(inputRef.current, true)
        return
      }
      submitCommand(command)
    },
    [setInput, submitCommand, inputRef],
  )

  const quickCommands =
    pathname === '/' ? HOME_QUICK_COMMANDS : getGlobalQuickCommands(pathname)

  return (
    <TerminalActionProvider value={{ selectCommand }}>
      <div className="flex flex-1 min-h-0 flex-col">
        {/* Header bar */}
        <div className="shrink-0 border-b border-border/50 bg-muted/20 px-3.5 pt-2 pb-2.5">
          {!expanded && (
            <div className="flex justify-center pb-2" aria-hidden>
              <div className="h-1 w-9 rounded-full bg-foreground/20" />
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Terminal className="size-3.5 text-terminal-accent shrink-0" />
              <span className="text-xs font-normal font-(family-name:--font-jetbrains-mono) text-muted-foreground truncate">
                vsh — visitor@vishrut.tech
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onToggleExpanded}
                aria-label={expanded ? 'Collapse sheet' : 'Expand fullscreen'}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {expanded ? (
                  <Minimize2 className="size-3.5" />
                ) : (
                  <Maximize2 className="size-3.5" />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                aria-label="Close terminal"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scrollable output stream */}
        <div
          ref={outputRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain font-(family-name:--font-jetbrains-mono) px-4 py-3 space-y-1"
        >
          {lines.length === 0 ? (
            <div className="text-sm text-muted-foreground/80 space-y-1 py-1">
              <p>Quick terminal — jump anywhere or run a command.</p>
              <p className="text-xs text-muted-foreground/60">
                Tap a shortcut below or type{' '}
                <span className="text-terminal-accent">help</span>.
              </p>
            </div>
          ) : (
            lines.map((line) => <TerminalLine key={line.id} line={line} />)
          )}
        </div>

        {/* Integrated touch toolbar & prompt dock */}
        <TouchTerminalDock
          input={input}
          isLoading={isLoading}
          inputRef={inputRef}
          suggestions={suggestions}
          quickCommands={quickCommands}
          canHistoryPrev={canHistoryPrev}
          canHistoryNext={canHistoryNext}
          hasLines={lines.length > 0}
          safeAreaBottom={expanded && !viewport.isKeyboardOpen}
          preventFocusScroll
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSubmit={submitCommand}
          onSetInput={setInput}
          onTabComplete={triggerTabComplete}
          onHistoryPrev={historyPrev}
          onHistoryNext={historyNext}
          onCancel={cancelInput}
          onClear={clearTerminal}
        />
      </div>
    </TerminalActionProvider>
  )
}

function LauncherHintBody() {
  return (
    <>
      <span className="touch-only items-center gap-2 h-10 px-4 text-xs text-foreground font-(family-name:--font-jetbrains-mono) select-none">
        <Terminal className="size-3.5 text-terminal-accent" />
        <span>terminal</span>
      </span>
      <span className="desktop-only items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground font-(family-name:--font-jetbrains-mono) select-none">
        <span>press</span>
        <kbd className="rounded border border-border/60 bg-background/40 px-1.5 py-0.5 text-[0.7rem] leading-none font-(family-name:--font-jetbrains-mono)">
          /
        </kbd>
        <span>to open terminal</span>
      </span>
    </>
  )
}

export function GlobalTerminalLauncher() {
  const pathname = usePathname()
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null)
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const open = openedOnPath === pathname
  const isTouchMode = useTouchMode()
  const isPhoneMode = usePhoneMode()
  const isTouchOpen = open && isTouchMode
  const viewport = useVisualViewport(isTouchOpen)
  const viewportContainerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const openTerminal = useCallback(() => {
    setHasOpenedOnce(true)
    setExpanded(false)
    setOpenedOnPath(pathname)
  }, [pathname])

  const closeTerminal = useCallback(() => {
    inputRef.current?.blur()
    setOpenedOnPath(null)
  }, [])

  // Lock background scroll and prevent visualViewport touch-pan while touch sheet is open
  useLockBodyScroll(isTouchOpen)
  usePreventOverlayTouchScroll(isTouchOpen, viewportContainerRef)

  useLayoutEffect(() => {
    if (!open || isTouchMode) return
    inputRef.current?.focus({ preventScroll: true })
    const raf = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(raf)
  }, [open, isTouchMode])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open && isTouchMode) {
        e.preventDefault()
        closeTerminal()
        return
      }
      if (e.key !== '/') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable)
          return
      }
      e.preventDefault()
      if (pathname === '/' && !isPhoneMode) {
        window.dispatchEvent(new CustomEvent('terminal:focus'))
      } else {
        openTerminal()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [pathname, isPhoneMode, isTouchMode, open, openTerminal, closeTerminal])

  useEffect(() => {
    if (!open || isTouchMode) return
    function onMouseDown(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        closeTerminal()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open, isTouchMode, closeTerminal])

  if (pathname === '/' && !isPhoneMode) return null

  const openBorderRadius = isTouchMode ? (expanded ? 0 : 20) : 12

  return (
    <>
      <AnimatePresence>
        {isTouchOpen && (
          <motion.div
            key="launcher-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={closeTerminal}
            className="fixed inset-0 z-[45] bg-background/55"
          />
        )}
      </AnimatePresence>

      <div
        ref={viewportContainerRef}
        style={
          isTouchOpen && viewport.height !== null
            ? { top: viewport.offsetTop, height: viewport.height }
            : undefined
        }
        className={cn(
          'launcher-viewport',
          isTouchOpen &&
            'launcher-viewport-open motion-safe:transition-[height] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]',
        )}
      >
        {open ? (
          <motion.div
            key="terminal"
            ref={wrapperRef}
            role={isTouchMode ? 'dialog' : undefined}
            aria-modal={isTouchMode ? true : undefined}
            aria-label={isTouchMode ? 'Quick terminal' : undefined}
            layoutId={SHELL_LAYOUT_ID}
            transition={SHELL_TRANSITION}
            style={{ borderRadius: openBorderRadius }}
            className={cn(
              'pointer-events-auto overflow-hidden isolate border border-border/40 bg-background/80 backdrop-blur-md shadow-lg',
              isTouchMode
                ? cn(
                    'flex flex-col shadow-2xl',
                    expanded
                      ? 'w-full h-full border-0 md:border md:max-w-2xl md:h-[92%] pt-[env(safe-area-inset-top)] md:pt-0'
                      : viewport.isKeyboardOpen
                        ? 'w-full md:max-w-2xl h-[96%] max-h-full'
                        : 'w-[calc(100%-1rem)] md:max-w-2xl h-[72%] min-h-[min(320px,100%)] max-h-[600px] mb-[max(0.5rem,env(safe-area-inset-bottom))]',
                  )
                : 'w-full',
            )}
          >
            <motion.div
              initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: { delay: 0.14, duration: 0.22, ease: 'easeOut' },
                transitionEnd: { filter: 'none' },
              }}
              className={
                isTouchMode ? 'flex flex-1 min-h-0 flex-col' : undefined
              }
            >
              {isTouchMode ? (
                <TouchTerminalBody
                  pathname={pathname}
                  expanded={expanded}
                  viewport={viewport}
                  inputRef={inputRef}
                  onToggleExpanded={() => setExpanded((prev) => !prev)}
                  onClose={closeTerminal}
                />
              ) : (
                <DesktopTerminalBody
                  onClose={closeTerminal}
                  inputRef={inputRef}
                />
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.button
            key="hint"
            type="button"
            onClick={openTerminal}
            aria-label="Open terminal"
            layoutId={SHELL_LAYOUT_ID}
            transition={SHELL_TRANSITION}
            style={{ borderRadius: 21 }}
            className="pointer-events-auto overflow-hidden isolate border border-border/30 bg-background/40 hover:border-border/60 hover:bg-background/70 backdrop-blur-md transition-colors cursor-pointer"
          >
            <motion.div
              initial={
                hasOpenedOnce ? { opacity: 0, filter: 'blur(6px)' } : false
              }
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                transition: { delay: 0.12, duration: 0.2, ease: 'easeOut' },
                transitionEnd: { filter: 'none' },
              }}
            >
              <LauncherHintBody />
            </motion.div>
          </motion.button>
        )}
      </div>
    </>
  )
}
