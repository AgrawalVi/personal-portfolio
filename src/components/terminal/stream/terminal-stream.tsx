import type { RefObject } from 'react'

import type { TerminalLine } from '@/types/terminal'

import { TerminalCurrentLine } from './terminal-current-line'
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
        lines.length === 0 && (
          <p className="text-xs leading-5 text-muted-foreground/55 select-none">
            visitor@vishrut.tech — ready. Tap a command or type below.
          </p>
        )
      )}
    </div>
  )
}
