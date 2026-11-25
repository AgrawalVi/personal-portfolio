'use client'

import { createContext, useCallback, useContext, useState } from 'react'

export interface TerminalHistoryContextValue {
  history: string[]
  pushHistory: (command: string) => void
  clearHistory: () => void
}

const TerminalHistoryContext = createContext<TerminalHistoryContextValue | null>(null)

export function TerminalHistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<string[]>([])

  const pushHistory = useCallback((command: string) => {
    const trimmed = command.trim()
    if (!trimmed) return
    setHistory((prev) => [trimmed, ...prev.filter((h) => h !== trimmed)])
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return (
    <TerminalHistoryContext.Provider value={{ history, pushHistory, clearHistory }}>
      {children}
    </TerminalHistoryContext.Provider>
  )
}

export function useTerminalHistory(): TerminalHistoryContextValue {
  const ctx = useContext(TerminalHistoryContext)
  if (!ctx) {
    throw new Error('useTerminalHistory must be used within a TerminalHistoryProvider')
  }
  return ctx
}
