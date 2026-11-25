'use client'

import { Maximize2, Minimize2 } from 'lucide-react'

import { useGame } from '@/contexts/game-context'
import { TitleBar } from './title-bar'

interface TerminalTitleBarProps {
  isFullscreen?: boolean
  showFullscreenToggle?: boolean
  onToggleFullscreen?: () => void
}

export function TerminalTitleBar({
  isFullscreen = false,
  showFullscreenToggle = false,
  onToggleFullscreen,
}: TerminalTitleBarProps = {}) {
  const { activeGame, exitGame, liveScore } = useGame()

  if (activeGame) {
    return (
      <TitleBar
        title={
          <span className="font-pixel text-[7px] pt-0.5 uppercase tracking-widest">
            games — {activeGame}
          </span>
        }
        rightContent={
          <span className="font-pixel text-[8px] text-game-accent">
            score: {liveScore ?? 0}
          </span>
        }
        redAction={{ onClick: exitGame, ariaLabel: 'Exit game' }}
      />
    )
  }

  return (
    <TitleBar
      title="vish — visitor@vishrut.tech"
      redAction={
        isFullscreen && onToggleFullscreen
          ? { onClick: onToggleFullscreen, ariaLabel: 'Exit fullscreen' }
          : undefined
      }
      rightContent={
        showFullscreenToggle && onToggleFullscreen ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFullscreen()
            }}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Expand terminal'}
            title={isFullscreen ? 'Exit fullscreen' : 'Expand terminal'}
            className="inline-flex items-center gap-1.5 -my-1 -mr-1 px-2 py-1 rounded-md text-xs font-(family-name:--font-jetbrains-mono) text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="size-3.5" />
                <span className="text-[11px]">done</span>
              </>
            ) : (
              <Maximize2 className="size-3.5" />
            )}
          </button>
        ) : undefined
      }
    />
  )
}
