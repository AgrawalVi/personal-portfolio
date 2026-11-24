import type { CommandDef, CommandResult } from '@/types/terminal'
import {
  Arg,
  Badge,
  Cmd,
  Dim,
  HelpRow,
  Indent,
  KV,
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
  handleLs,
  handleMatrix,
  handlePing,
  handleRm,
  handleSudo,
  handleUname,
  handleWhoami,
} from './static-commands'

interface SocialLink {
  label: string
  display: string
  href: string
  external: boolean
}

const SOCIALS: Record<'github' | 'linkedin' | 'email', SocialLink> = {
  github: {
    label: 'GitHub',
    display: 'https://github.com/AgrawalVi',
    href: 'https://github.com/AgrawalVi',
    external: true,
  },
  linkedin: {
    label: 'LinkedIn',
    display: 'https://linkedin.com/in/vishrut-agrawal',
    href: 'https://linkedin.com/in/vishrut-agrawal',
    external: true,
  },
  email: {
    label: 'Email',
    display: 'zvishrut@gmail.com',
    href: 'mailto:zvishrut@gmail.com',
    external: false,
  },
}

function renderSocialLink(link: SocialLink) {
  return (
    <KV
      label={link.label}
      value={
        <a
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          className="text-terminal-accent hover:underline underline-offset-4 break-all"
        >
          {link.display}
        </a>
      }
    />
  )
}

function renderCommandDetail(name: string, def: CommandDef) {
  return (
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
  )
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export const COMMANDS: Record<string, CommandDef> = {
  // ── Meta ──────────────────────────────────────────────────────────────────
  help: {
    description: 'Show available commands',
    usage: '[command]',
    details: [
      'Lists all available commands with their usage.',
      'Run help <command> for detailed info on a specific command.',
      'Run help --verbose (or -v) to show detailed info for all commands.',
    ],
    type: 'sync',
    handler: (args): CommandResult => {
      const flags = new Set(args.filter(a => a.startsWith('-')))
      const positional = args.filter(a => !a.startsWith('-'))

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
              content: renderCommandDetail(name, def),
            },
          ],
        }
      }

      const showAll = flags.has('--all')
      const verbose = flags.has('--verbose') || flags.has('-v')
      const entries = Object.entries(COMMANDS).filter(
        ([, def]) => showAll || !def.hiddenFromHelp,
      )

      // help --verbose (or -v) — detail view for all matched commands
      if (verbose) {
        return {
          lines: entries.map(([name, def]) => ({
            type: 'output' as const,
            content: <div className="py-1">{renderCommandDetail(name, def)}</div>,
          })),
        }
      }

      // help — list visible commands. --all also includes hidden ones.
      return {
        lines: [
          ...entries.map(([name, def]) => ({
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
          })),
          {
            type: 'output' as const,
            content: (
              <Dim className="block pt-1">
                type <Muted>help &lt;command&gt;</Muted> for details, or{' '}
                <Muted>help --verbose</Muted> to show details for all
              </Dim>
            ),
          },
        ],
      }
    },
    complete: (args, partial) => {
      if (args.some(a => !a.startsWith('-'))) return []
      const used = new Set(args)
      const remainingFlags = [
        ...(!used.has('--verbose') && !used.has('-v') ? ['--verbose'] : []),
        ...(!used.has('--all') ? ['--all'] : []),
      ]
      const candidates =
        args.length === 0
          ? [
              ...remainingFlags,
              ...Object.keys(COMMANDS),
              ...Object.values(COMMANDS).flatMap(d => d.aliases ?? []),
            ]
          : remainingFlags
      return candidates.filter(n => n.startsWith(partial.toLowerCase()))
    },
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
    usage: '[--utc]',
    details: [
      'Prints the current local date and time.',
      'Pass --utc to display Coordinated Universal Time instead.',
    ],
    type: 'sync',
    handler: handleDate,
    complete: (args, partial) =>
      args.length === 0 && '--utc'.startsWith(partial.toLowerCase())
        ? ['--utc']
        : [],
    hiddenFromHelp: false,
  },

  ls: {
    description: 'List portfolio files',
    usage: '[-a]',
    details: [
      'Lists the totally real files powering this portfolio.',
      'Pass -a or -la to reveal hidden dotfiles.',
    ],
    type: 'sync',
    handler: (args) => handleLs(args),
    complete: (args, partial) =>
      args.length === 0
        ? ['-a', '-la', '--all'].filter(f => f.startsWith(partial.toLowerCase()))
        : [],
    hiddenFromHelp: false,
  },

  social: {
    description: 'Show social & contact links',
    aliases: ['links'],
    details: [
      'Displays clickable links for GitHub, LinkedIn, and Email.',
      'Shortcuts: github, linkedin, email',
    ],
    type: 'sync',
    handler: (): CommandResult => ({
      lines: Object.values(SOCIALS).map(link => ({
        type: 'output' as const,
        content: renderSocialLink(link),
      })),
    }),
    hiddenFromHelp: false,
  },

  github: {
    description: 'GitHub profile link',
    type: 'sync',
    handler: (): CommandResult => ({
      lines: [{ type: 'output', content: renderSocialLink(SOCIALS.github) }],
    }),
    hiddenFromHelp: true,
  },

  linkedin: {
    description: 'LinkedIn profile link',
    type: 'sync',
    handler: (): CommandResult => ({
      lines: [{ type: 'output', content: renderSocialLink(SOCIALS.linkedin) }],
    }),
    hiddenFromHelp: true,
  },

  email: {
    description: 'Email address',
    type: 'sync',
    handler: (): CommandResult => ({
      lines: [{ type: 'output', content: renderSocialLink(SOCIALS.email) }],
    }),
    hiddenFromHelp: true,
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
    description: "Weather where I'm currently based",
    details: [
      'Fetches live conditions from the OpenWeatherMap API.',
      "Shows the weather where I'm currently based.",
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
