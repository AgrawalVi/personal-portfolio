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
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'

import { TerminalGhostHint } from './stream/terminal-ghost-hint'

interface TouchTerminalDockProps {
  input: string
  isLoading: boolean
  disabled?: boolean
  showHint?: boolean
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

const KEYCAP_CLASS =
  'shrink-0 font-(family-name:--font-jetbrains-mono) text-xs text-muted-foreground border-border/70 bg-background/70 hover:bg-muted/60 active:scale-95 active:bg-muted/80 disabled:opacity-30 cursor-pointer'

export function TouchTerminalDock({
  input,
  isLoading,
  disabled = false,
  showHint = false,
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
  const showGhostHint = showHint && input.length === 0 && !isDisabled

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
        'shrink-0 border-t border-border/70 bg-muted/25',
        safeAreaBottom && 'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      {/* Row 1: Hardware-style keycaps + contextual quick-command / autocomplete rail */}
      <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-border/40">
        <div className="flex items-center gap-1 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDisabled || !hasInput}
            onPointerDown={keepKeyboardOpen}
            onClick={onTabComplete}
            aria-label="Tab autocomplete"
            className={cn(
              KEYCAP_CLASS,
              'px-2 font-medium',
              hasInput &&
                suggestions.length > 0 &&
                'border-terminal-accent/40 text-terminal-accent bg-primary/10 hover:bg-primary/15 hover:text-terminal-accent',
            )}
          >
            Tab
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isDisabled || !canHistoryPrev}
            onPointerDown={keepKeyboardOpen}
            onClick={onHistoryPrev}
            aria-label="Previous command"
            className={KEYCAP_CLASS}
          >
            <ChevronUp className="size-3.5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={isDisabled || !canHistoryNext}
            onPointerDown={keepKeyboardOpen}
            onClick={onHistoryNext}
            aria-label="Next command"
            className={KEYCAP_CLASS}
          >
            <ChevronDown className="size-3.5" />
          </Button>

          {hasInput ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isDisabled}
              onPointerDown={keepKeyboardOpen}
              onClick={onCancel}
              aria-label="Cancel input (Ctrl+C)"
              className={cn(
                KEYCAP_CLASS,
                'px-1.5 text-destructive/90 hover:text-destructive',
              )}
            >
              ^C
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              disabled={isDisabled || !hasLines}
              onPointerDown={keepKeyboardOpen}
              onClick={onClear}
              aria-label="Clear terminal"
              title="Clear terminal"
              className={KEYCAP_CLASS}
            >
              <Eraser className="size-3.5" />
            </Button>
          )}
        </div>

        <Separator orientation="vertical" className="h-4 bg-border/60" />

        {/* Contextual chip rail: live completions while typing, quick commands when idle */}
        <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 pr-5 [mask-image:linear-gradient(to_right,black_calc(100%-20px),transparent)]">
          {showLiveSuggestions ? (
            suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <Button
                  key={suggestion.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isDisabled}
                  onPointerDown={keepKeyboardOpen}
                  onClick={() => handleSuggestionChip(suggestion)}
                  className="shrink-0 rounded-full px-2.5 border-terminal-accent/30 bg-primary/10 font-(family-name:--font-jetbrains-mono) text-xs text-terminal-accent hover:bg-primary/15 hover:text-terminal-accent active:scale-95 active:bg-primary/20 cursor-pointer"
                >
                  {suggestion.label}
                </Button>
              ))
            ) : (
              <span className="text-xs font-(family-name:--font-jetbrains-mono) text-muted-foreground/60 px-1 truncate select-none">
                press enter to run
              </span>
            )
          ) : (
            quickCommands.map((chip) => (
              <Button
                key={chip.command}
                type="button"
                variant="outline"
                size="sm"
                disabled={isDisabled}
                onPointerDown={chip.prefillOnly ? keepKeyboardOpen : undefined}
                onClick={() => handleQuickChip(chip)}
                className="shrink-0 rounded-full px-2.5 border-border/70 bg-background/60 font-(family-name:--font-jetbrains-mono) text-xs text-foreground/85 hover:border-terminal-accent/40 hover:text-terminal-accent active:scale-95 active:bg-primary/15 active:text-terminal-accent cursor-pointer"
              >
                {chip.label}
              </Button>
            ))
          )}
        </div>
      </div>

      {/* Row 2: Single integrated terminal prompt input (16px font prevents iOS Safari auto-zoom) */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="px-2.5 py-2 bg-background/50"
      >
        <InputGroup className="h-10 rounded-lg border-border/70 bg-background/70 dark:bg-background/70 focus-within:border-terminal-accent/50 has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot=input-group-control]:focus-visible]:ring-terminal-accent/30">
          <InputGroupAddon
            align="inline-start"
            onClick={() =>
              focusInputWithoutViewportPan(inputRef.current, preventFocusScroll)
            }
            className="pl-2.5 pr-1 font-(family-name:--font-jetbrains-mono) text-sm font-medium text-primary"
          >
            <span aria-hidden>
              <span className="hidden md:inline">vsh:</span>~$
            </span>
          </InputGroupAddon>

          <div className="relative flex-1 min-w-0 flex items-center">
            <InputGroupInput
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
              placeholder={
                isLoading
                  ? 'Running…'
                  : showGhostHint
                    ? ''
                    : 'Type a command…'
              }
              className="h-10 px-1.5 font-(family-name:--font-jetbrains-mono) text-base md:text-base leading-6 text-foreground placeholder:text-muted-foreground/60"
            />
            {showGhostHint && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-1.5 right-1 flex items-center font-(family-name:--font-jetbrains-mono) text-base leading-6 overflow-hidden whitespace-nowrap"
              >
                <TerminalGhostHint />
              </div>
            )}
          </div>

          <InputGroupAddon
            align="inline-end"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button')) return
              focusInputWithoutViewportPan(inputRef.current, preventFocusScroll)
            }}
            className="pr-1.5 gap-1"
          >
            {input.length > 0 && !isDisabled && (
              <InputGroupButton
                type="button"
                variant="ghost"
                size="icon-sm"
                onPointerDown={keepKeyboardOpen}
                onClick={() => onSetInput('')}
                aria-label="Clear command input"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </InputGroupButton>
            )}

            <InputGroupButton
              type="submit"
              variant="outline"
              size="icon-sm"
              disabled={isDisabled}
              onPointerDown={keepKeyboardOpen}
              aria-label="Run command"
              className={cn(
                'cursor-pointer active:scale-95',
                hasInput
                  ? 'border-terminal-accent/40 bg-primary/20 text-terminal-accent hover:bg-primary/25 hover:text-terminal-accent'
                  : 'border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted/60',
              )}
            >
              <CornerDownLeft className="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
