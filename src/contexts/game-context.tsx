'use client'

import { createContext, useCallback, useContext, useState, useSyncExternalStore } from 'react'

import type { GameConfig, GameId } from '@/types/games'

const MUTE_STORAGE_KEY = 'vishrut:game-muted'
const muteListeners = new Set<() => void>()
let memoryMuted: boolean | null = null

function readMuted(): boolean {
  try {
    const stored = window.localStorage.getItem(MUTE_STORAGE_KEY)
    if (stored !== null) return stored === 'true'
    return memoryMuted ?? false
  } catch {
    return memoryMuted ?? false
  }
}

function writeMuted(next: boolean): void {
  try {
    window.localStorage.setItem(MUTE_STORAGE_KEY, String(next))
    memoryMuted = null
  } catch {
    memoryMuted = next
  }
  muteListeners.forEach(listener => listener())
}

function subscribeMute(callback: () => void): () => void {
  muteListeners.add(callback)
  const onStorage = (event: StorageEvent) => {
    if (event.key === MUTE_STORAGE_KEY || event.key === null) {
      memoryMuted = null
      callback()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    muteListeners.delete(callback)
    window.removeEventListener('storage', onStorage)
  }
}

const getServerMuted = () => false

interface GameContextValue {
  activeGame: GameId | null
  lastScore: { gameId: GameId; score: number } | null
  liveScore: number | null
  isMuted: boolean
  isPaused: boolean
  activeConfig: GameConfig | null
  restartKey: number
  launchGame: (id: GameId) => void
  exitGame: (score?: number) => void
  restartGame: () => void
  toggleMute: () => void
  setIsPaused: (v: boolean) => void
  setActiveConfig: (c: GameConfig | null) => void
  setLiveScore: (s: number) => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  const [lastScore, setLastScore] = useState<{ gameId: GameId; score: number } | null>(null)
  const isMuted = useSyncExternalStore(subscribeMute, readMuted, getServerMuted)
  const [isPaused, setIsPaused] = useState(false)
  const [activeConfig, setActiveConfig] = useState<GameConfig | null>(null)
  const [liveScore, setLiveScore] = useState<number | null>(null)
  const [restartKey, setRestartKey] = useState(0)

  const launchGame = useCallback((id: GameId) => {
    setActiveGame(id)
  }, [])

  const exitGame = useCallback((score?: number) => {
    setActiveGame(prev => {
      if (prev && score !== undefined) {
        setLastScore({ gameId: prev, score })
      }
      return null
    })
    setIsPaused(false)
    setLiveScore(null)
  }, [])

  const restartGame = useCallback(() => {
    setIsPaused(false)
    setLiveScore(null)
    setRestartKey(k => k + 1)
  }, [])

  const toggleMute = useCallback(() => writeMuted(!readMuted()), [])

  return (
    <GameContext.Provider value={{
      activeGame,
      lastScore,
      liveScore,
      isMuted,
      isPaused,
      activeConfig,
      restartKey,
      launchGame,
      exitGame,
      restartGame,
      toggleMute,
      setIsPaused,
      setActiveConfig,
      setLiveScore,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}
