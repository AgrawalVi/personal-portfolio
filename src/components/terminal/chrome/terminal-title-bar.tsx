'use client'

import { useGame } from '@/contexts/game-context'
import { Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react'

import { cn } from '@/lib/utils'

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
  const { activeGame, exitGame, liveScore, isMuted, toggleMute } = useGame()

  if (activeGame) {
    return (
      <TitleBar
        title={
          <span className="font-pixel pt-0.5 text-[7px] tracking-widest uppercase">
            games — {activeGame}
          </span>
        }
        rightContent={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              onMouseDown={(e) => e.preventDefault()}
              aria-pressed={isMuted}
              aria-label={isMuted ? 'Unmute game audio' : 'Mute game audio'}
              title={isMuted ? 'Sound muted (Ctrl+M to unmute)' : 'Sound on (Ctrl+M to mute)'}
              className={cn(
                'font-pixel inline-flex cursor-pointer items-center gap-1.5 border px-2 py-1 text-[7px] leading-none transition-colors',
                isMuted
                  ? 'border-destructive/40 bg-destructive/10 text-destructive/90 hover:border-destructive/70'
                  : 'border-game-border/50 bg-game-accent/10 text-game-accent hover:border-game-accent',
              )}
            >
              {isMuted ? (
                <>
                  <VolumeX className="size-3 shrink-0" aria-hidden="true" />
                  <span>MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="size-3 shrink-0" aria-hidden="true" />
                  <span>ON</span>
                </>
              )}
            </button>
            <span className="font-pixel text-game-accent text-[8px]">score: {liveScore ?? 0}</span>
          </div>
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
