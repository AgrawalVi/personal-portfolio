'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useGame } from '@/contexts/game-context'
import { Volume2, VolumeX } from 'lucide-react'

import { cn } from '@/lib/utils'

type MenuItem = {
  id: string
  label: string
  hint?: string
  status?: ReactNode
  ariaLabel?: string
  action: () => void
}

export function PauseOverlay() {
  const { isMuted, toggleMute, setIsPaused, exitGame, restartGame } = useGame()
  const [selected, setSelected] = useState(0)

  const items = useMemo<MenuItem[]>(
    () => [
      { id: 'resume', label: 'RESUME', hint: 'ESC', action: () => setIsPaused(false) },
      { id: 'restart', label: 'RESTART', hint: 'CTRL+R', action: restartGame },
      {
        id: 'sound',
        label: 'SOUND',
        hint: 'CTRL+M',
        ariaLabel: isMuted ? 'Sound: Off. Toggle sound' : 'Sound: On. Toggle sound',
        status: (
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex min-w-[46px] items-center justify-center gap-1 border px-1.5 py-0.5 text-[6px] leading-none transition-colors',
              isMuted
                ? 'border-game-divider text-game-dim bg-transparent'
                : 'border-game-accent/50 bg-game-accent/15 text-game-accent',
            )}
          >
            {isMuted ? (
              <>
                <VolumeX className="size-2.5 shrink-0" />
                <span>OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="size-2.5 shrink-0" />
                <span>ON</span>
              </>
            )}
          </span>
        ),
        action: toggleMute,
      },
      { id: 'quit', label: 'QUIT', hint: 'CTRL+C', action: () => exitGame() },
    ],
    [exitGame, isMuted, restartGame, setIsPaused, toggleMute],
  )

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
        e.stopPropagation()
        items[selected]?.action()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [items, selected])

  return (
    <div className="bg-game-bg/95 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
      <div className="font-pixel bg-game-bg border-game-border min-w-[272px] border-2 p-5 shadow-[0_0_0_1px_var(--game-bg),0_0_24px_rgb(69_212_176/10%)]">
        {/* Title */}
        <p className="text-game-accent border-game-divider mb-4 border-b pb-2.5 text-[9px] tracking-[0.05em]">
          PAUSED
        </p>

        {/* Menu items */}
        <div role="menu" aria-label="Pause menu" className="flex flex-col gap-3">
          {items.map((item, i) => {
            const isSelected = i === selected
            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                aria-label={item.ariaLabel}
                onMouseEnter={() => setSelected(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={item.action}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 text-left text-[7px] transition-colors',
                  isSelected ? 'text-game-accent' : 'text-game-border/70',
                )}
              >
                <span className="text-game-mid w-2.5 shrink-0" aria-hidden="true">
                  {isSelected ? '>' : ' '}
                </span>
                <span className="flex flex-1 items-center gap-2.5">
                  <span>{item.label}</span>
                  {item.status}
                </span>
                {item.hint && (
                  <span className="text-game-muted shrink-0 text-[6px]">
                    [{item.hint}]
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Navigation hint */}
        <p className="text-game-muted border-game-divider mt-4 border-t pt-2.5 text-[6px]">
          ↑↓ SELECT · ENTER CONFIRM
        </p>
      </div>
    </div>
  )
}
