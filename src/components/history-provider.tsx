'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

export interface HistoryContextValue {
  history: string[]
  currentPath: string
  previousPath: string | null
  canGoBack: boolean
  back: (fallbackPath?: string) => void
  hasVisited: (path: string) => boolean
  clearHistory: () => void
}

const HistoryContext = createContext<HistoryContextValue | undefined>(undefined)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [history, setHistory] = useState<string[]>(() =>
    pathname ? [pathname] : [],
  )

  useEffect(() => {
    if (!pathname) return

    setHistory((prev) => {
      if (prev[prev.length - 1] === pathname) {
        return prev
      }
      return [...prev, pathname]
    })
  }, [pathname])

  const back = useCallback(
    (fallbackPath = '/') => {
      if (history.length > 1) {
        router.back()
      } else {
        router.push(fallbackPath)
      }
    },
    [history.length, router],
  )

  const hasVisited = useCallback(
    (path: string) => history.includes(path),
    [history],
  )

  const clearHistory = useCallback(() => {
    setHistory(pathname ? [pathname] : [])
  }, [pathname])

  const value = useMemo<HistoryContextValue>(
    () => ({
      history,
      currentPath: pathname,
      previousPath: history.length > 1 ? history[history.length - 2] : null,
      canGoBack: history.length > 1,
      back,
      hasVisited,
      clearHistory,
    }),
    [history, pathname, back, hasVisited, clearHistory],
  )

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  )
}

export function useHistory(): HistoryContextValue {
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}
