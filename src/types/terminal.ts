import type { ReactNode } from 'react'

export type TerminalLineType = 'input' | 'output' | 'error' | 'system'

export interface TerminalLine {
  id: string
  type: TerminalLineType
  content: ReactNode
}

export interface TerminalState {
  lines: TerminalLine[]
  input: string
  history: string[]
  historyIndex: number
  isLoading: boolean
}

export interface CommandResult {
  lines: Omit<TerminalLine, 'id'>[]
  nextState?: Partial<TerminalState>
}

export type AppendLine = (type: TerminalLineType, content: TerminalLine['content']) => void

export interface CommandDef {
  description: string
  /** One-line description shown in `help` listing. */
  usage?: string
  /** Extended info shown in `help <command>`. Supports multiple lines as an array. */
  details?: string[]
  aliases?: string[]
  type: 'sync' | 'async'
  /** Streaming async commands skip the loading placeholder and receive an `append` callback. */
  stream?: boolean
  handler: (
    args: string[],
    state: TerminalState,
    append?: AppendLine,
  ) => CommandResult | Promise<CommandResult>
  /** Returns candidate completions for the next token. `args` = already-completed
   * positional args; `partial` = the token being completed (empty if input ends in space). */
  complete?: (args: string[], partial: string) => string[]
  hiddenFromHelp: boolean
}
