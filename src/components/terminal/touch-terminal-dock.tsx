'use client'

import { useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  CornerDownLeft,
  Eraser,
  X,
} from 'lucide-react'

import type { QuickCommand } from '@/constants/terminal'
import {
  focusInputWithoutViewportPan,
  isIOSDevice,
} from '@/hooks/use-touch-terminal'
import type { LiveSuggestion } from '@/lib/terminal/complete'
import { cn } from '@/lib/utils'

interface TouchTerminalDockProps {
  input: string
  isLoading: boolean
  disabled?: boolean
  inputRef: React.RefObject<HTMLInputElement | null>
  suggestions: LiveSuggestion[]
  quickCommands: readonly QuickCommand[]
  canHistoryPrev: boolean
  canHistoryNext: boolean
  hasLines: boolean
  safeAreaBottom?: boolean
  preventFocusScroll?: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  onSubmit: (rawOverride?: string) => void
  onSetInput: (value: string) => void
  onTabComplete: () => void
  onHistoryPrev: () => void
  onHistoryNext: () => void
  onCancel: () => void
  onClear: () => void
}

const KEYCAP_BASE =
  'inline-flex items-center justify-center shrink-0 h-7 rounded-md border border-border/70 bg-background/70 font-(family-name:--font-jetbrains-mono) text-xs text-muted-foreground transition-all active:scale-95 active:bg-muted/80 disabled:opacity-30 disabled:pointer-events-none select-none cursor-pointer'

export function TouchTerminalDock({
  input,
  isLoading,
  disabled = false,
  inputRef,
  suggestions,
  quickCommands,
  canHistoryPrev,
  canHistoryNext,
  hasLines,
  safeAreaBottom = false,
  preventFocusScroll = false,
  onInputChange,
  onKeyDown,
  onFocus,
  onBlur,
  onSubmit,
  onSetInput,
  onTabComplete,
  onHistoryPrev,
  onHistoryNext,
  onCancel,
  onClear,
}: TouchTerminalDockProps) {
  const isDisabled = isLoading || disabled
  const hasInput = input.trim().length > 0
  const showLiveSuggestions = input.trim().length > 0

  useEffect(() => {
    if (!preventFocusScroll || !isIOSDevice()) return
    const el = inputRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      if (
        el.disabled ||
        document.activeElement === el ||
        e.touches.length !== 1
      ) {
        return
      }
      e.preventDefault()
      focusInputWithoutViewportPan(el, true)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    return () => el.removeEventListener('touchstart', onTouchStart)
  }, [preventFocusScroll, inputRef])

  function keepKeyboardOpen(e: React.PointerEvent) {
    e.preventDefault()
  }

  function handleQuickChip(chip: QuickCommand) {
    if (isDisabled) return
    if (chip.prefillOnly) {
      onSetInput(chip.command)
      focusInputWithoutViewportPan(inputRef.current, preventFocusScroll)
      return
    }
    onSubmit(chip.command)
  }

  function handleSuggestionChip(suggestion: LiveSuggestion) {
    if (isDisabled) return
    const alreadyMatches =
      suggestion.nextInput.trim().toLowerCase() === input.trim().toLowerCase()
    if (alreadyMatches && !suggestion.appendSpace) {
      onSubmit(suggestion.nextInput)
      return
    }
    onSetInput(suggestion.nextInput)
    focusInputWithoutViewportPan(inputRef.current, preventFocusScroll)
  }

  return (
    <div
      className={cn(
        'shrink-0 border-t border-border/70 bg-muted/25 backdrop-blur-sm',
        safeAreaBottom && 'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      {/* Row 1: Hardware-style keycaps + contextual quick-command / autocomplete rail */}
      <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-border/40">
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            disabled={isDisabled || !hasInput}
            onPointerDown={keepKeyboardOpen}
            onClick={onTabComplete}
            aria-label="Tab autocomplete"
            className={cn(
              KEYCAP_BASE,
              'px-2 font-medium',
              hasInput &&
                suggestions.length > 0 &&
                'border-terminal-accent/40 text-terminal-accent bg-primary/10',
            )}
          >
            Tab
          </button>

          <button
            type="button"
            disabled={isDisabled || !canHistoryPrev}
            onPointerDown={keepKeyboardOpen}
            onClick={onHistoryPrev}
            aria-label="Previous command"
            className={cn(KEYCAP_BASE, 'w-7')}
          >
            <ChevronUp className="size-3.5" />
          </button>

          <button
            type="button"
            disabled={isDisabled || !canHistoryNext}
            onPointerDown={keepKeyboardOpen}
            onClick={onHistoryNext}
            aria-label="Next command"
            className={cn(KEYCAP_BASE, 'w-7')}
          >
            <ChevronDown className="size-3.5" />
          </button>

          {hasInput ? (
            <button
              type="button"
              disabled={isDisabled}
              onPointerDown={keepKeyboardOpen}
              onClick={onCancel}
              aria-label="Cancel input (Ctrl+C)"
              className={cn(KEYCAP_BASE, 'px-1.5 text-destructive/90')}
            >
              ^C
            </button>
          ) : (
            <button
              type="button"
              disabled={isDisabled || !hasLines}
              onPointerDown={keepKeyboardOpen}
              onClick={onClear}
              aria-label="Clear terminal"
              className={cn(KEYCAP_BASE, 'w-7')}
              title="Clear terminal"
            >
              <Eraser className="size-3.5" />
            </button>
          )}
        </div>

        <div className="h-4 w-px bg-border/60 shrink-0" aria-hidden />

        {/* Contextual chip rail: live completions while typing, quick commands when idle */}
        <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 pr-5 [mask-image:linear-gradient(to_right,black_calc(100%-20px),transparent)]">
          {showLiveSuggestions ? (
            suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <button
                  key={suggestion.label}
                  type="button"
                  disabled={isDisabled}
                  onPointerDown={keepKeyboardOpen}
                  onClick={() => handleSuggestionChip(suggestion)}
                  className="shrink-0 h-7 px-2.5 rounded-full border border-terminal-accent/30 bg-primary/10 font-(family-name:--font-jetbrains-mono) text-xs text-terminal-accent transition-all active:scale-95 active:bg-primary/20 disabled:opacity-40 select-none cursor-pointer"
                >
                  {suggestion.label}
                </button>
              ))
            ) : (
              <span className="text-xs font-(family-name:--font-jetbrains-mono) text-muted-foreground/60 px-1 truncate select-none">
                press enter to run
              </span>
            )
          ) : (
            quickCommands.map((chip) => (
              <button
                key={chip.command}
                type="button"
                disabled={isDisabled}
                onPointerDown={chip.prefillOnly ? keepKeyboardOpen : undefined}
                onClick={() => handleQuickChip(chip)}
                className="shrink-0 h-7 px-2.5 rounded-full border border-border/70 bg-background/60 font-(family-name:--font-jetbrains-mono) text-xs text-foreground/85 hover:border-terminal-accent/40 hover:text-terminal-accent transition-all active:scale-95 active:bg-primary/15 active:text-terminal-accent disabled:opacity-40 select-none cursor-pointer"
              >
                {chip.label}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Row 2: Integrated terminal prompt input (16px font prevents iOS Safari auto-zoom) */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="flex items-center gap-2 px-3 py-2 bg-background/50"
      >
        <span
          aria-hidden
          className="font-(family-name:--font-jetbrains-mono) text-sm font-medium text-primary select-none shrink-0"
        >
          <span className="hidden md:inline">vish:</span>~$
        </span>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          disabled={isDisabled}
          onFocus={onFocus}
          onBlur={onBlur}
          enterKeyHint="send"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label="Terminal input"
          placeholder={isLoading ? 'Running…' : 'Type a command…'}
          className="flex-1 min-w-0 bg-transparent font-(family-name:--font-jetbrains-mono) text-base leading-6 text-foreground outline-none placeholder:text-muted-foreground/60 disabled:opacity-60"
        />

        {input.length > 0 && !isDisabled && (
          <button
            type="button"
            onPointerDown={keepKeyboardOpen}
            onClick={() => onSetInput('')}
            aria-label="Clear command input"
            className="shrink-0 size-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground active:bg-muted/60 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          onPointerDown={keepKeyboardOpen}
          aria-label="Run command"
          className={cn(
            'shrink-0 size-9 rounded-md border flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 cursor-pointer',
            hasInput
              ? 'border-terminal-accent/40 bg-primary/20 text-terminal-accent'
              : 'border-border/60 bg-muted/40 text-muted-foreground',
          )}
        >
          <CornerDownLeft className="size-4" />
        </button>
      </form>
    </div>
  )
}
