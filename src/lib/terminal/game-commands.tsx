import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { GameId } from '@/types/games'
import type { CommandDef } from '@/types/terminal'
import { Muted, Dim, HelpRow } from '@/components/terminal/rich'
import { matchesTouchMode } from '@/hooks/use-touch-terminal'

const GAME_LIST: { id: GameId; description: string }[] = [
  { id: 'snake',          description: 'Classic snake' },
  { id: 'space-invaders', description: 'Defend Earth from the alien fleet' },
]

export const GAMES_DESKTOP_ONLY_MESSAGE =
  'Games require keyboard controls. Open this site on a desktop browser to play.'

interface GamesCommandOptions {
  hiddenFromHelp?: boolean
}

export function makeGamesCommand(
  launchGame: (id: GameId) => void,
  options?: GamesCommandOptions,
): CommandDef {
  return {
    description: 'Browse and launch terminal games',
    usage: '[game]',
    type: 'sync',
    hiddenFromHelp: options?.hiddenFromHelp ?? false,
    complete: (args) =>
      !matchesTouchMode() && args.length === 0 ? GAME_LIST.map(g => g.id) : [],
    handler: (args) => {
      if (matchesTouchMode()) {
        return {
          lines: [{
            type: 'error' as const,
            content: GAMES_DESKTOP_ONLY_MESSAGE,
          }],
        }
      }

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

export function makeGamesRouteCommand(
  router: AppRouterInstance,
  options?: GamesCommandOptions,
): CommandDef {
  return {
    description: 'Browse and launch terminal games',
    usage: '[game]',
    type: 'sync',
    hiddenFromHelp: options?.hiddenFromHelp ?? false,
    complete: (args) =>
      !matchesTouchMode() && args.length === 0 ? GAME_LIST.map(g => g.id) : [],
    handler: (args) => {
      if (matchesTouchMode()) {
        return {
          lines: [{
            type: 'error' as const,
            content: GAMES_DESKTOP_ONLY_MESSAGE,
          }],
        }
      }

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
