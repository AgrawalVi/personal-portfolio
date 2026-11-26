import type { AppendLine, CommandResult } from '@/types/terminal'

import { out, err } from './helpers'
import { POOLS, pick } from './response-pools'

export function handleClear(): CommandResult {
  return { lines: [], nextState: { lines: [] } }
}

export function handleWhoami(): CommandResult {
  return out('visitor')
}

export function handleDate(args: string[]): CommandResult {
  const flags = new Set(args.filter(a => a.startsWith('--')))
  const now = new Date()
  return out(
    flags.has('--utc')
      ? now.toUTCString()
      : now.toLocaleString('en-US', { timeZoneName: 'short' }),
  )
}

const LS_DOTFILES = [
  '-rw-------  403B  .env (nice try)',
  '-rw-------  666B  .secrets_do_not_commit',
  '-rw-r--r--   42B  .vim_how_to_exit',
  '-rw-r--r--  1.2G  .unpushed_stashes',
]

const LS_ENTRIES = [
  'drwxr-xr-x  4.2T  node_modules/',
  'drwxr-xr-x  128K  unfinished_side_projects/',
  '-rw-r--r--  159B  AGENTS.md',
  '-rw-r--r--  4.2K  README_definitely_not_boilerplate.md',
  '-rw-r--r--    0B  bug_free_code.ts',
  '-rw-r--r--  999M  coffee_supply.log',
  '-rwxr-xr-x   42B  ship_on_friday.sh',
]

const NODE_MODULES_ENTRIES = [
  'drwxr-xr-x   12K  left-pad/',
  'drwxr-xr-x    8K  is-odd/',
  'drwxr-xr-x    8K  is-even/',
  'drwxr-xr-x   16K  is-thirteen/',
  'drwxr-xr-x    4K  is-number/',
  "... and 847,291 more (please don't)",
]

const UNFINISHED_PROJECTS_ENTRIES = [
  'drwxr-xr-x    1K  git_test/',
  'drwxr-xr-x   87K  Odin-Project/',
  'drwxr-xr-x  1.2M  odin-recipes/',
  'drwxr-xr-x   42K  startup-idea-v1/',
  'drwxr-xr-x   44K  startup-idea-v2-final/',
  'drwxr-xr-x   46K  startup-idea-v2-FINAL-real/',
  'drwxr-xr-x  266K  flutter_tutorial/',
  'drwxr-xr-x   67M  google-maps-test/',
  'drwxr-xr-x   88K  blog-rewrite-2023/',
  'drwxr-xr-x   91K  blog-rewrite-2024/',
  'drwxr-xr-x  152K  binary-converter/',
  'drwxr-xr-x  422K  nextjs-template/',
  'drwxr-xr-x  6.8M  top-css-exercises/',
  'drwxr-xr-x  256K  ai-wrapper-weekend-hack/',
  'drwxr-xr-x   53M  shadcn-fork/',
  'drwxr-xr-x  247K  vui/',
  'drwxr-xr-x   33K  saas-landing-page-no-backend/',
  'drwxr-xr-x   15K  untitled-folder-7/',
  'drwxr-xr-x   62K  definitely-finishing-this-one/',
  'drwxr-xr-x    4K  new-project-template-v9/',
]

function normalizePathArg(raw: string): string {
  return raw.replace(/^\.\//, '').replace(/\/+$/, '')
}

export async function handleLs(
  args: string[],
  _state?: unknown,
  append?: AppendLine,
): Promise<CommandResult> {
  const showAll = args.some(
    a => a === '--all' || (a.startsWith('-') && !a.startsWith('--') && a.includes('a')),
  )
  const rawTarget = args.find(a => !a.startsWith('-'))

  if (!rawTarget || rawTarget === '.' || rawTarget === './') {
    return out(...(showAll ? [...LS_DOTFILES, ...LS_ENTRIES] : LS_ENTRIES))
  }

  const target = normalizePathArg(rawTarget)

  if (target === 'node_modules') {
    return out(...NODE_MODULES_ENTRIES)
  }

  if (target === 'unfinished_side_projects') {
    const oomError =
      'FATAL ERROR: JavaScript heap out of memory — too many unfinished side projects'
    if (!append) {
      return {
        lines: [
          ...UNFINISHED_PROJECTS_ENTRIES.map(content => ({ type: 'output' as const, content })),
          { type: 'error' as const, content: oomError },
        ],
      }
    }
    for (const entry of UNFINISHED_PROJECTS_ENTRIES) {
      append('output', entry)
      await new Promise(resolve => setTimeout(resolve, 45))
    }
    return { lines: [{ type: 'error', content: oomError }] }
  }

  const singleMatch = [...LS_DOTFILES, ...LS_ENTRIES].find(line => {
    const name = line.slice(18).split(' ')[0].replace(/\/$/, '')
    return name === target
  })
  if (singleMatch) {
    return out(singleMatch)
  }

  return err(`ls: cannot access '${rawTarget}': No such file or directory`)
}

export const CAT_VISIBLE_FILES = [
  'AGENTS.md',
  'README_definitely_not_boilerplate.md',
  'bug_free_code.ts',
  'coffee_supply.log',
  'ship_on_friday.sh',
] as const

export const CAT_DOTFILES = [
  '.env',
  '.secrets_do_not_commit',
  '.vim_how_to_exit',
  '.unpushed_stashes',
] as const

const FAKE_DIRS = new Set(['node_modules', 'unfinished_side_projects'])

const FAKE_FILES: Record<string, () => CommandResult> = {
  'agents.md': () =>
    out(
      '# AGENTS.md',
      '',
      '- Make no mistakes.',
      '- Do not write bugs.',
      '- Never hallucinate.',
      '- Get it right on the first try.',
      '- Do not break anything.',
      '- Simply write good code.',
    ),
  'readme_definitely_not_boilerplate.md': () =>
    out(
      '# Personal Portfolio',
      '',
      'Definitely written 100% from scratch and not created with create-next-app.',
      'Please do not run git log --reverse.',
    ),
  'bug_free_code.ts': () => ({
    lines: [{ type: 'system', content: '(empty — 0 bytes)' }],
  }),
  'coffee_supply.log': () =>
    out(
      '[08:02:11] INFO  Brewing first cup of the day',
      '[11:47:03] WARN  Caffeine reserves at 30%',
      '[14:15:44] WARN  Running on iced latte fumes',
      '[16:59:59] CRIT  Supply critically low — run `coffee` immediately',
    ),
  'ship_on_friday.sh': () =>
    out(
      '#!/usr/bin/env bash',
      '# TODO: make sure pagerduty is muted first',
      'git push origin main --force',
    ),
  '.env': () => err('cat: .env: Permission denied (nice try)'),
  '.secrets_do_not_commit': () =>
    err('cat: .secrets_do_not_commit: Permission denied (seriously, stop snooping)'),
  '.vim_how_to_exit': () =>
    out(
      '1. Press Esc (mash it 4 or 5 times just to be sure)',
      '2. Type :q! and hit Enter',
      '3. If that fails, close the browser tab and buy a new laptop',
    ),
  '.unpushed_stashes': () =>
    out(
      'stash@{0}: WIP on new: quick fix before lunch (4 months ago)',
      'stash@{1}: WIP on main: DO NOT DELETE THIS ONE',
      'stash@{2}: WIP on feat/redesign: temp test (do not commit)',
      '... 41 more stashes',
    ),
}

export function handleCat(args: string[]): CommandResult {
  const rawTarget = args[0]
  if (!rawTarget) {
    return err('cat: missing file operand')
  }

  const target = normalizePathArg(rawTarget).toLowerCase()
  if (FAKE_DIRS.has(target)) {
    return err(`cat: ${rawTarget}: Is a directory`)
  }

  const reader = FAKE_FILES[target]
  if (reader) {
    return reader()
  }

  return err(`cat: ${rawTarget}: No such file or directory`)
}

export function handleShipOnFriday(): CommandResult {
  const isFriday = new Date().getDay() === 5
  if (isFriday) {
    return {
      lines: [
        { type: 'output', content: 'Checking calendar... IT IS LITERALLY FRIDAY.' },
        {
          type: 'error',
          content: 'ABORTED: Step away from the keyboard and enjoy your weekend.',
        },
      ],
    }
  }
  return {
    lines: [
      { type: 'output', content: 'Deploying to production...' },
      {
        type: 'error',
        content: 'ABORTED: nice try. Even on a weekday, we do not run ./ship_on_friday.sh.',
      },
    ],
  }
}

export function handleSh(args: string[]): CommandResult {
  const rawTarget = args[0]
  if (!rawTarget) {
    return err('sh: missing script operand')
  }
  const target = normalizePathArg(rawTarget).toLowerCase()
  if (target === 'ship_on_friday.sh') {
    return handleShipOnFriday()
  }
  return err(`sh: ${rawTarget}: Permission denied`)
}

export function handleSudo(): CommandResult {
  return err(pick(POOLS.sudo))
}

export function handleRm(args: string[]): CommandResult {
  if (args.includes('-rf') || args.includes('-r') || args.includes('/')) {
    return err(pick(POOLS.rm))
  }
  return err('rm: missing operand')
}

export function handleExit(): CommandResult {
  return out(pick(POOLS.exit))
}

export function handleHello(): CommandResult {
  return out(pick(POOLS.hello))
}

// ── Hidden easter eggs (PORT-049) ──────────────────────────────────────────

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789#$%&*+-/<>=?@'

function randomString(len: number): string {
  let s = ''
  for (let i = 0; i < len; i++) {
    s += MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  }
  return s
}

export async function handleMatrix(
  _args: string[],
  _state: unknown,
  append?: AppendLine,
): Promise<CommandResult> {
  if (!append) {
    return out(...Array.from({ length: 10 }, () => randomString(48)))
  }
  for (let i = 0; i < 12; i++) {
    append('output', randomString(48))
    await new Promise(resolve => setTimeout(resolve, 90))
  }
  return { lines: [{ type: 'system', content: 'Wake up, Neo...' }] }
}

export function handleCoffee(): CommandResult {
  return out(
    '      ( (',
    '       ) )',
    '    ........',
    '    |      |]',
    '    \\      /',
    '     `----\'',
    'Brewing... ☕',
  )
}

export function handleHack(): CommandResult {
  const filenames = [
    '/etc/passwd',
    '/var/log/auth.log',
    '~/.ssh/id_rsa',
    'mainframe.db',
    'firewall.cfg',
    'core.dump',
    'kernel.bin',
    'nuclear-launch-codes.txt',
  ]
  const lines = filenames.map(f => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
    return `[0x${hex}] decrypting ${f}...`
  })
  return out(...lines, 'Access granted. Welcome.')
}

export function handleUname(): CommandResult {
  return out('Linux vishrut.tech 6.1.0 #1 SMP x86_64 GNU/Linux')
}

export function handlePing(args: string[]): CommandResult {
  const target = args[0] || 'vishrut.tech'
  const lines = Array.from({ length: 4 }, (_, i) => {
    const ms = (Math.random() * 30 + 5).toFixed(1)
    return `64 bytes from ${target}: icmp_seq=${i + 1} ttl=64 time=${ms} ms`
  })
  return out(
    `PING ${target}: 56 data bytes`,
    ...lines,
    '',
    `--- ${target} ping statistics ---`,
    '4 packets transmitted, 4 received, 0% packet loss',
  )
}
