/**
 * Rich terminal output primitives.
 *
 * Usage:
 *   import { Accent, Muted, Row, HelpRow, KV } from '@/components/terminal/rich'
 *
 * All components render as plain inline/block elements — no terminal-specific
 * logic. Compose them freely inside any TerminalLine `content` value.
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ─── Inline text ──────────────────────────────────────────────────────────────

/** Terminal accent color — commands, highlights. Distinct from the prompt color. */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('text-terminal-accent', className)}>{children}</span>
}

/** Secondary text — labels, descriptions. */
export function Muted({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('text-muted-foreground', className)}>{children}</span>
}

/** Faint text — metadata, hints. */
export function Dim({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('text-muted-foreground/50', className)}>{children}</span>
}

/** Error / destructive text. */
export function Err({ children }: { children: ReactNode }) {
  return <span className="text-destructive">{children}</span>
}

/** Success / affirmative text. */
export function Ok({ children }: { children: ReactNode }) {
  return <span className="text-green-500">{children}</span>
}

// ─── Layout ───────────────────────────────────────────────────────────────────

/** Horizontal flex row. Children align on baseline by default. */
export function Row({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-baseline gap-x-3', className)}>{children}</div>
  )
}

/** Left-padded block — for nested or indented content. */
export function Indent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('pl-4', className)}>{children}</div>
}

/** Vertical stack with a small gap — for multi-line output blocks. */
export function Stack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-y-0.5', className)}>{children}</div>
}

// ─── Composites ───────────────────────────────────────────────────────────────

/** A command name — terminal accent color, slightly bold. */
export function Cmd({ children }: { children: ReactNode }) {
  return <span className="text-terminal-accent font-medium">{children}</span>
}

/** An argument hint — e.g. `<ticker>`, `[game]`. */
export function Arg({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground/70">{children}</span>
}

/** Inline micro-badge — e.g. "async", "alias". */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] text-muted-foreground/60 border border-muted-foreground/25 rounded px-1 py-px leading-none">
      {children}
    </span>
  )
}

/** Key-value row — `label:  value`. Useful for neofetch, weather, etc. */
export function KV({
  label,
  value,
  labelWidth = '10ch',
}: {
  label: string
  value: ReactNode
  labelWidth?: string
}) {
  return (
    <div className="flex items-baseline gap-x-2">
      <Muted>
        <span style={{ display: 'inline-block', minWidth: labelWidth }}>{label}</span>
      </Muted>
      <span>{value}</span>
    </div>
  )
}

/** A single row in a help listing. */
export function HelpRow({
  name,
  usage,
  description,
  isAsync,
  aliases,
}: {
  name: string
  usage?: string
  description: string
  isAsync?: boolean
  aliases?: string[]
}) {
  return (
    <div className="flex items-baseline gap-x-3 py-px">
      <span className="shrink-0" style={{ minWidth: '18ch' }}>
        <Cmd>{name}</Cmd>
        {usage && <Arg> {usage}</Arg>}
      </span>
      <span className="flex-1 text-muted-foreground">{description}</span>
      <span className="flex items-center gap-1.5 shrink-0">
        {isAsync && <Badge>async</Badge>}
      </span>
    </div>
  )
}
