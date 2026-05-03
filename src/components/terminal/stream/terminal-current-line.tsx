import { cn } from '@/lib/utils'
import { TERMINAL_PROMPT } from '@/constants/terminal'

import { TerminalGhostHint } from './terminal-ghost-hint'

interface TerminalCurrentLineProps {
  input: string
  isLoading: boolean
  isFocused: boolean
  showHint: boolean
}

export function TerminalCurrentLine({
  input,
  isLoading,
  isFocused,
  showHint,
}: TerminalCurrentLineProps) {
  return (
    <div className="text-sm leading-5 flex items-center">
      <span className="text-primary select-none shrink-0">
        {TERMINAL_PROMPT}&nbsp;
      </span>
      <span className="whitespace-pre">{input}</span>
      {showHint && input === '' && <TerminalGhostHint />}
      {!isLoading && (
        <span
          className={cn(
            'inline-block w-[0.55ch] h-[1em] ml-px animate-[blink_1.2s_step-end_infinite]',
            isFocused
              ? 'bg-foreground'
              : 'border border-foreground bg-transparent',
          )}
        />
      )}
    </div>
  )
}
