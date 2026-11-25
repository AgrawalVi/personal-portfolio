import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { GameId } from '@/types/games'
import type { CommandDef } from '@/types/terminal'
import { Muted, Dim, HelpRow } from '@/components/terminal/rich'

const GAME_LIST: { id: GameId; description: string }[] = [
  { id: 'snake',          description: 'Classic snake' },
  { id: 'space-invaders', description: 'Defend Earth from the alien fleet' },
]

function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

const MOBILE_BLOCK_MESSAGE =
  'Games require keyboard controls. Open this site on a desktop browser to play.'

export function makeGamesCommand(launchGame: (id: GameId) => void): CommandDef {
  return {
    description: 'Browse and launch terminal games',
    usage: '[game]',
    type: 'sync',
    hiddenFromHelp: false,
    complete: (args) => (args.length === 0 ? GAME_LIST.map(g => g.id) : []),
    handler: (args) => {
      if (!args.length) {
        return {
          lines: [
            ...GAME_LIST.map(g => ({
              type: 'output' as const,
              content: (
                <HelpRow
                  name={g.id}
                  description={g.description}
                  runCommand={`games ${g.id}`}
                />
              ),
            })),
            {
              type: 'output' as const,
              content: <Dim>type <Muted>games &lt;name&gt;</Muted> to launch</Dim>,
            },
          ],
        }
      }

      const gameId = args[0].toLowerCase()
      const game = GAME_LIST.find(g => g.id === gameId)

      if (!game) {
        return {
          lines: [{
            type: 'error' as const,
            content: `Unknown game: "${gameId}". Type 'games' to see available games.`,
          }],
        }
      }

      if (isMobileViewport()) {
        return {
          lines: [{
            type: 'error' as const,
            content: MOBILE_BLOCK_MESSAGE,
          }],
        }
      }

      launchGame(game.id)
      return {
        lines: [{
          type: 'system' as const,
          content: `Launching ${game.id}... (Escape or q to exit)`,
        }],
      }
    },
  }
}

export function makeGamesRouteCommand(router: AppRouterInstance): CommandDef {
  return {
    description: 'Browse and launch terminal games',
    usage: '[game]',
    type: 'sync',
    hiddenFromHelp: false,
    complete: (args) => (args.length === 0 ? GAME_LIST.map(g => g.id) : []),
    handler: (args) => {
      if (!args.length) {
        return {
          lines: [
            ...GAME_LIST.map(g => ({
              type: 'output' as const,
              content: (
                <HelpRow
                  name={g.id}
                  description={g.description}
                  runCommand={`games ${g.id}`}
                />
              ),
            })),
            {
              type: 'output' as const,
              content: <Dim>type <Muted>games &lt;name&gt;</Muted> to launch</Dim>,
            },
          ],
        }
      }

      const gameId = args[0].toLowerCase()
      const game = GAME_LIST.find(g => g.id === gameId)

      if (!game) {
        return {
          lines: [{
            type: 'error' as const,
            content: `Unknown game: "${gameId}". Type 'games' to see available games.`,
          }],
        }
      }

      if (isMobileViewport()) {
        return {
          lines: [{
            type: 'error' as const,
            content: MOBILE_BLOCK_MESSAGE,
          }],
        }
      }

      sessionStorage.setItem('pendingGame', game.id)
      router.push('/')
      return {
        lines: [{
          type: 'system' as const,
          content: `Launching ${game.id}...`,
        }],
      }
    },
  }
}
