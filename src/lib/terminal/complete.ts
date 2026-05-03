import type { CommandDef } from '@/types/terminal'

export interface CompletionResult {
  completed: string
  matches: string[]
}

function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return ''
  let prefix = strs[0]
  for (const s of strs.slice(1)) {
    while (!s.startsWith(prefix)) prefix = prefix.slice(0, -1)
    if (!prefix) return ''
  }
  return prefix
}

function resolveCommand(
  token: string,
  commands: Record<string, CommandDef>,
): CommandDef | undefined {
  const key = token.toLowerCase()
  if (commands[key]) return commands[key]
  return Object.values(commands).find(d => d.aliases?.includes(key))
}

export function getCompletion(
  input: string,
  commands: Record<string, CommandDef>,
): CompletionResult {
  if (!input) return { completed: input, matches: [] }
  const endsWithSpace = /\s$/.test(input)
  const tokens = input.trim().split(/\s+/)

  let candidates: string[]
  let partial: string
  let prefix: string

  if (tokens.length === 1 && !endsWithSpace) {
    const entries = Object.entries(commands)
    candidates = [
      ...entries.map(([name]) => name),
      ...entries.flatMap(([, d]) => d.aliases ?? []),
    ]
    partial = tokens[0].toLowerCase()
    prefix = ''
  } else {
    const def = resolveCommand(tokens[0], commands)
    if (!def?.complete) return { completed: input, matches: [] }
    const args = endsWithSpace ? tokens.slice(1) : tokens.slice(1, -1)
    partial = endsWithSpace ? '' : (tokens.at(-1) ?? '')
    candidates = def.complete(args, partial)
    prefix = endsWithSpace ? input : input.slice(0, input.length - partial.length)
  }

  const matches = candidates.filter(c =>
    c.toLowerCase().startsWith(partial.toLowerCase()),
  )
  if (matches.length === 0) return { completed: input, matches: [] }

  const cp = matches.length === 1 ? matches[0] : longestCommonPrefix(matches)
  if (cp.length <= partial.length) return { completed: input, matches }

  const trailing =
    matches.length === 1 && tokens.length === 1 && !endsWithSpace ? ' ' : ''
  return { completed: prefix + cp + trailing, matches }
}
