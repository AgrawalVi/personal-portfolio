'use client'

import { createContext, useContext } from 'react'

export interface TerminalActionContextValue {
  /** Execute a command immediately or prefill it into the prompt and focus. */
  selectCommand: (command: string, options?: { prefillOnly?: boolean }) => void
}

const TerminalActionContext = createContext<TerminalActionContextValue | null>(
  null,
)

export function TerminalActionProvider({
  value,
  children,
}: {
  value: TerminalActionContextValue
  children: React.ReactNode
}) {
  return (
    <TerminalActionContext.Provider value={value}>
      {children}
    </TerminalActionContext.Provider>
  )
}

export function useTerminalAction(): TerminalActionContextValue | null {
  return useContext(TerminalActionContext)
}
