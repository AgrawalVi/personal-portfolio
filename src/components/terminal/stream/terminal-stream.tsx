import type { RefObject } from 'react'

import { TOUCH_TERMINAL_HINT_COMMANDS } from '@/constants/terminal'
import type { TerminalLine } from '@/types/terminal'

import { TerminalCurrentLine } from './terminal-current-line'
import { TerminalGhostHint } from './terminal-ghost-hint'
import { TerminalLine as TerminalLineComponent } from './terminal-line'

interface TerminalStreamProps {
  lines: TerminalLine[]
  input: string
  isLoading: boolean
  isFocused: boolean
  showHint: boolean
  hideCurrentLine?: boolean
  outputRef: RefObject<HTMLDivElement | null>
}

export function TerminalStream({
  lines,
  input,
  isLoading,
  isFocused,
  showHint,
  hideCurrentLine = false,
  outputRef,
}: TerminalStreamProps) {
  return (
    <div
      ref={outputRef}
      className="font-(family-name:--font-jetbrains-mono) flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-4 py-3 space-y-1 sm:space-y-0.5"
    >
      {lines.map((line) => (
        <TerminalLineComponent key={line.id} line={line} />
      ))}
      {!hideCurrentLine ? (
        <TerminalCurrentLine
          input={input}
          isLoading={isLoading}
          isFocused={isFocused}
          showHint={showHint}
        />
      ) : (
        showHint &&
        input === '' && (
          <div className="text-sm leading-5 flex items-center pt-0.5 select-none pointer-events-none">
            <span className="text-primary/70 shrink-0">
              <span className="hidden sm:inline">visitor@vishrut.tech:</span>~$&nbsp;
            </span>
            <TerminalGhostHint commands={TOUCH_TERMINAL_HINT_COMMANDS} />
          </div>
        )
      )}
    </div>
  )
}
