'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Maximize2, Minimize2, Terminal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { TerminalActionProvider } from '@/contexts/terminal-action-context'
import { getGlobalQuickCommands } from '@/constants/terminal'
import { useTerminal } from '@/hooks/use-terminal'
import {
  focusInputWithoutViewportPan,
  useLockBodyScroll,
  usePreventOverlayTouchScroll,
  useTouchMode,
  useVisualViewport,
} from '@/hooks/use-touch-terminal'
import { COMMANDS } from '@/lib/terminal/commands'
import { makeGamesRouteCommand } from '@/lib/terminal/game-commands'
import {
  makeNavigateCommand,
  makeRouteCommand,
} from '@/lib/terminal/navigate-command'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

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

function TouchTerminalSheet({
  open,
  pathname,
  onOpenChange,
}: {
  open: boolean
  pathname: string
  onOpenChange: (open: boolean) => void
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
  const inputRef = useRef<HTMLInputElement | null>(null)
  const sheetContainerRef = useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const viewport = useVisualViewport(open)

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

  // Lock background scroll and prevent visualViewport touch-pan while sheet is open
  useLockBodyScroll(open)
  usePreventOverlayTouchScroll(open, sheetContainerRef)

  // Keep output scrolled to bottom when software keyboard opens/resizes
  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [open, viewport.height, expanded, outputRef])

  const selectCommand = useCallback(
    (command: string, options?: { prefillOnly?: boolean }) => {
      if (options?.prefillOnly) {
        setInput(command)
        focusInputWithoutViewportPan(inputRef.current, true)
        return
      }
      submitCommand(command)
    },
    [setInput, submitCommand],
  )

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        inputRef.current?.blur()
      }
      onOpenChange(nextOpen)
    },
    [onOpenChange],
  )

  const handleClose = useCallback(() => {
    handleOpenChange(false)
  }, [handleOpenChange])

  const quickCommands = getGlobalQuickCommands(pathname)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-background/65 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      <Sheet open={open} modal={false} onOpenChange={handleOpenChange}>
        <SheetContent
          ref={sheetContainerRef}
          side="bottom"
          showCloseButton={false}
          showOverlay={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          style={
            viewport.height !== null
              ? { top: viewport.offsetTop, height: viewport.height }
              : undefined
          }
          className="fixed inset-x-0 top-0 bottom-auto h-dvh z-50 flex flex-col justify-end border-0 bg-transparent p-0 shadow-none pointer-events-none md:px-4 motion-safe:transition-[height] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]"
        >
          <TerminalActionProvider value={{ selectCommand }}>
            <div
              className={cn(
                'pointer-events-auto w-full md:max-w-2xl md:mx-auto flex flex-col overflow-hidden bg-card border-t md:border-x border-border shadow-2xl transition-[height,max-height,border-radius] duration-200',
                expanded
                  ? 'h-full rounded-none pt-[env(safe-area-inset-top)] md:pt-0 md:h-[92%] md:rounded-t-2xl'
                  : viewport.isKeyboardOpen
                    ? 'h-[96%] max-h-full rounded-t-2xl'
                    : 'h-[72%] max-h-[600px] rounded-t-2xl',
              )}
            >
              {/* Sheet handle + header */}
              <SheetHeader className="shrink-0 border-b border-border bg-muted/30 px-3.5 pt-2 pb-2.5 gap-0">
                {!expanded && (
                  <div className="flex justify-center pb-2" aria-hidden>
                    <div className="h-1 w-9 rounded-full bg-border" />
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Terminal className="size-3.5 text-terminal-accent shrink-0" />
                    <SheetTitle className="text-xs font-normal font-(family-name:--font-jetbrains-mono) text-muted-foreground truncate">
                      vish — visitor@vishrut.tech
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Quick terminal sheet to navigate pages or run commands
                    </SheetDescription>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setExpanded((prev) => !prev)}
                      aria-label={
                        expanded ? 'Collapse sheet' : 'Expand fullscreen'
                      }
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {expanded ? (
                        <Minimize2 className="size-3.5" />
                      ) : (
                        <Maximize2 className="size-3.5" />
                      )}
                    </Button>
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Close terminal"
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="size-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetHeader>

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
                  lines.map((line) => (
                    <TerminalLine key={line.id} line={line} />
                  ))
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
                safeAreaBottom={!viewport.isKeyboardOpen}
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
        </SheetContent>
      </Sheet>
    </>
  )
}

function DesktopHintBody() {
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
  const pathname = usePathname()
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null)
  const open = openedOnPath === pathname
  const isTouchMode = useTouchMode()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const openTerminal = useCallback(() => {
    setOpenedOnPath(pathname)
  }, [pathname])

  const closeTerminal = useCallback(() => {
    setOpenedOnPath(null)
  }, [])

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
      if (e.key !== '/') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable)
          return
      }
      e.preventDefault()
      if (pathname === '/') {
        window.dispatchEvent(new CustomEvent('terminal:focus'))
      } else {
        setOpenedOnPath(pathname)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [pathname])

  useEffect(() => {
    if (!open || isTouchMode) return
    function onMouseDown(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenedOnPath(null)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open, isTouchMode])

  if (pathname === '/') return null

  if (isTouchMode) {
    return (
      <>
        <AnimatePresence>
          {!open && (
            <Button
              asChild
              variant="outline"
              className="fixed left-1/2 -translate-x-1/2 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 h-10 gap-2 px-4 rounded-full border-border/70 bg-card/90 hover:bg-card backdrop-blur-md shadow-lg font-(family-name:--font-jetbrains-mono) text-xs text-foreground active:scale-95 transition-transform cursor-pointer"
            >
              <motion.button
                key="touch-launcher-pill"
                type="button"
                onClick={openTerminal}
                aria-label="Open terminal"
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.94 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <Terminal className="size-3.5 text-terminal-accent" />
                <span>terminal</span>
              </motion.button>
            </Button>
          )}
        </AnimatePresence>

        <TouchTerminalSheet
          open={open}
          pathname={pathname}
          onOpenChange={(nextOpen) =>
            nextOpen ? openTerminal() : closeTerminal()
          }
        />
      </>
    )
  }

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 flex justify-center pointer-events-none">
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
            className="pointer-events-auto w-full overflow-clip border border-border/40 bg-background/80 backdrop-blur-md shadow-lg"
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
              <DesktopTerminalBody
                onClose={closeTerminal}
                inputRef={inputRef}
              />
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
            initial={{ borderRadius: 12, scale: 0.96 }}
            animate={{ borderRadius: 9999, scale: 1 }}
            exit={{ borderRadius: 12, scale: 0.96 }}
            className="pointer-events-auto overflow-clip border border-border/30 bg-background/40 hover:border-border/60 hover:bg-background/70 backdrop-blur-md transition-colors cursor-pointer"
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
              <DesktopHintBody />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
