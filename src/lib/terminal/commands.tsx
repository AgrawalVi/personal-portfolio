import type { CommandDef, CommandResult } from '@/types/terminal'
import {
  Arg,
  Badge,
  Cmd,
  Dim,
  HelpRow,
  Indent,
  Muted,
  Stack,
} from '@/components/terminal/rich'

import {
  handleDefine,
  handleJoke,
  handleNowPlaying,
  handlePrice,
  handleWeather,
} from './async-commands'
import {
  handleClear,
  handleCoffee,
  handleDate,
  handleExit,
  handleHack,
  handleHello,
  handleMatrix,
  handlePing,
  handleRm,
  handleSudo,
  handleUname,
  handleWhoami,
} from './static-commands'

// ─── Registry ─────────────────────────────────────────────────────────────────

export const COMMANDS: Record<string, CommandDef> = {
  // ── Meta ──────────────────────────────────────────────────────────────────
  help: {
    description: 'Show available commands',
    usage: '[command]',
    details: [
      'Lists all available commands with their usage.',
      'Run `help <command>` for detailed info on a specific command.',
    ],
    type: 'sync',
    handler: (args): CommandResult => {
      const flags = new Set(args.filter(a => a.startsWith('--')))
      const positional = args.filter(a => !a.startsWith('--'))

      // help <command> — detail view for a specific command
      if (positional[0]) {
        const query = positional[0].toLowerCase()
        const entry = Object.entries(COMMANDS).find(
          ([name, def]) => name === query || def.aliases?.includes(query),
        )
        if (!entry) {
          return {
            lines: [
              { type: 'error', content: `help: no such command '${positional[0]}'` },
            ],
          }
        }
        const [name, def] = entry
        return {
          lines: [
            {
              type: 'output',
              content: (
                <Stack>
                  <div>
                    <Cmd>{name}</Cmd>
                    {def.usage && (
                      <>
                        {' '}
                        <Arg>{def.usage}</Arg>
                      </>
                    )}
                    {def.type === 'async' && (
                      <>
                        {' '}
                        <Badge>async</Badge>
                      </>
                    )}
                  </div>
                  <Indent>
                    <Stack>
                      <Muted>{def.description}</Muted>
                      {def.details?.map((line, i) => (
                        <Dim key={i}>{line}</Dim>
                      ))}
                      {def.aliases?.length ? (
                        <Dim>aliases: {def.aliases.join(', ')}</Dim>
                      ) : null}
                    </Stack>
                  </Indent>
                </Stack>
              ),
            },
          ],
        }
      }

      // help — list visible commands. --all also includes hidden ones.
      const showAll = flags.has('--all')
      const lines = Object.entries(COMMANDS)
        .filter(([, def]) => showAll || !def.hiddenFromHelp)
        .map(([name, def]) => ({
          type: 'output' as const,
          content: (
            <HelpRow
              name={name}
              usage={def.usage}
              description={def.description}
              isAsync={def.type === 'async'}
              aliases={def.aliases}
            />
          ),
        }))
      return { lines }
    },
    complete: (args, partial) =>
      args.length === 0
        ? [
            ...Object.keys(COMMANDS),
            ...Object.values(COMMANDS).flatMap(d => d.aliases ?? []),
          ].filter(n => n.startsWith(partial.toLowerCase()))
        : [],
    hiddenFromHelp: false,
  },

  clear: {
    description: 'Clear the terminal',
    type: 'sync',
    handler: handleClear,
    hiddenFromHelp: false,
  },

  // ── Info ──────────────────────────────────────────────────────────────────
  whoami: {
    description: 'Who are you?',
    type: 'sync',
    handler: handleWhoami,
    hiddenFromHelp: true,
  },

  date: {
    description: 'Print current date and time',
    type: 'sync',
    handler: handleDate,
    hiddenFromHelp: false,
  },

  // ── Easter eggs ───────────────────────────────────────────────────────────
  sudo: {
    description: '...',
    type: 'sync',
    handler: handleSudo,
    hiddenFromHelp: true,
  },

  rm: {
    description: '...',
    type: 'sync',
    handler: (args) => handleRm(args),
    hiddenFromHelp: true,
  },

  exit: {
    description: 'Exit the terminal',
    aliases: ['quit'],
    type: 'sync',
    handler: handleExit,
    hiddenFromHelp: true,
  },

  hello: {
    description: 'Saying hi never hurts',
    type: 'sync',
    handler: handleHello,
    hiddenFromHelp: true,
  },

  // ── Async ─────────────────────────────────────────────────────────────────
  nowplaying: {
    description: 'What am I listening to right now?',
    details: [
      'Fetches the currently playing (or most recently played) track from Spotify.',
      'Uses the Spotify Web API with a server-side refresh token — no login required.',
    ],
    aliases: ['music'],
    type: 'async',
    handler: () => handleNowPlaying(),
    hiddenFromHelp: false,
  },

  weather: {
    description: 'Current weather in Madison, WI',
    details: [
      'Fetches live conditions from the OpenWeatherMap API.',
      "Always shows Madison, WI — where I'm based.",
    ],
    aliases: ['location'],
    type: 'async',
    handler: () => handleWeather(),
    hiddenFromHelp: false,
  },

  joke: {
    description: 'Tell me a programming joke',
    details: [
      'Pulls a random safe-mode programming joke from jokeapi.dev.',
      'Handles both single-line and two-part (setup/punchline) formats.',
    ],
    type: 'async',
    handler: () => handleJoke(),
    hiddenFromHelp: false,
  },

  price: {
    description: 'Crypto price lookup',
    usage: '<ticker>',
    details: [
      'Fetches the current USD price and 24h change from the CoinGecko API.',
      'Works with any crypto ticker — e.g. price btc, price pepe, price wif',
    ],
    type: 'async',
    handler: (args) => handlePrice(args),
    hiddenFromHelp: false,
  },

  define: {
    description: 'Look up a word definition',
    usage: '<word>',
    details: [
      'Fetches the definition, phonetic, and part of speech from dictionaryapi.dev.',
      'Example: define ephemeral',
    ],
    type: 'async',
    handler: (args) => handleDefine(args),
    hiddenFromHelp: false,
  },

  // ── Hidden easter eggs ────────────────────────────────────────────────────
  matrix: {
    description: 'Enter the matrix',
    type: 'async',
    stream: true,
    handler: (args, state, append) => handleMatrix(args, state, append),
    hiddenFromHelp: true,
  },

  coffee: {
    description: 'Brew a cup',
    type: 'sync',
    handler: handleCoffee,
    hiddenFromHelp: true,
  },

  hack: {
    description: 'Definitely a real hack',
    type: 'sync',
    handler: handleHack,
    hiddenFromHelp: true,
  },

  uname: {
    description: 'System info',
    type: 'sync',
    handler: handleUname,
    hiddenFromHelp: true,
  },

  ping: {
    description: 'Ping a host',
    usage: '[host]',
    type: 'sync',
    handler: (args) => handlePing(args),
    hiddenFromHelp: true,
  },
}
