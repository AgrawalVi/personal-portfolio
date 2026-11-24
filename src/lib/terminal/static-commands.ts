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
