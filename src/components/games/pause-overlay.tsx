'use client'

import { useEffect, useState } from 'react'
import { useGame } from '@/contexts/game-context'

import { cn } from '@/lib/utils'

type MenuItem = { label: string; hint?: string; action: () => void }

export function PauseOverlay() {
  const { isMuted, toggleMute, setIsPaused, exitGame, restartGame } = useGame()
  const [selected, setSelected] = useState(0)

  const items: MenuItem[] = [
    { label: 'RESUME', hint: 'ESC', action: () => setIsPaused(false) },
    { label: 'RESTART', hint: 'CTRL+R', action: restartGame },
    {
      label: `SOUND  ${isMuted ? 'OFF' : 'ON'}`,
      hint: 'CTRL+M',
      action: toggleMute,
    },
    { label: 'QUIT', hint: 'CTRL+C', action: () => exitGame() },
  ]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        e.stopPropagation()
        setSelected((s) => (s - 1 + items.length) % items.length)
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        e.stopPropagation()
        setSelected((s) => (s + 1) % items.length)
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        items[selected]?.action()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [selected, isMuted])

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-game-bg/95 backdrop-blur-[1px]">
      <div className="font-pixel bg-game-bg border-2 border-game-border p-5 min-w-[220px] shadow-[0_0_0_1px_var(--game-bg),0_0_24px_rgb(69_212_176/10%)]">
        {/* Title */}
        <p className="text-[9px] text-game-accent tracking-[0.05em] mb-4 pb-2.5 border-b border-game-divider">
          PAUSED
        </p>

        {/* Menu items */}
        <div className="flex flex-col gap-2.5">
          {items.map((item, i) => {
            const isSelected = i === selected
            return (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-1.5 text-[7px]',
                  isSelected ? 'text-game-accent' : 'text-game-border/70',
                )}
              >
                <span className="w-2.5 shrink-0 text-game-mid">
                  {isSelected ? '>' : ' '}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.hint && (
                  <span className="text-[6px] text-game-muted">
                    [{item.hint}]
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation hint */}
        <p className="text-[6px] text-game-muted mt-4 pt-2.5 border-t border-game-divider">
          ↑↓ SELECT · ENTER CONFIRM
        </p>
      </div>
    </div>
  )
}
