'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Dim } from '@/components/terminal/rich'
import { COMMANDS } from '@/lib/terminal/commands'
import { getCompletion, getCompletionSuggestions } from '@/lib/terminal/complete'
import type { CommandResult, TerminalLine, TerminalState } from '@/types/terminal'

function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function makeLine(
  type: TerminalLine['type'],
  content: TerminalLine['content'],
): TerminalLine {
  return { id: makeId(), type, content }
}

function hydrateLines(lines: Omit<TerminalLine, 'id'>[]): TerminalLine[] {
  return lines.map(l => ({ ...l, id: makeId() }))
}

const DEFAULT_INITIAL_LINES: Omit<TerminalLine, 'id'>[] = [
  { type: 'system', content: 'Welcome to vishrut.tech' },
  { type: 'system', content: "Type 'help' to see available commands." },
]

function buildInitialState(
  initialLines?: Omit<TerminalLine, 'id'>[],
): TerminalState {
  return {
    lines: hydrateLines(initialLines ?? DEFAULT_INITIAL_LINES),
    input: '',
    history: [],
    historyIndex: -1,
    isLoading: false,
  }
}

export function useTerminal(initialLines?: Omit<TerminalLine, 'id'>[]) {
  const [state, setState] = useState<TerminalState>(() => buildInitialState(initialLines))
  const outputRef = useRef<HTMLDivElement | null>(null)
  // Keep a ref to state so async callbacks always see current state
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  // Auto-scroll output pane on new lines
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [state.lines])

  const setInput = useCallback((value: string) => {
    setState(prev => ({ ...prev, input: value, historyIndex: -1 }))
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, input: e.target.value }))
  }, [])

  // ─── Command dispatch ─────────────────────────────────────────────────────

  const runCommand = useCallback(async (raw: string) => {
    const [name, ...args] = raw.trim().split(/\s+/)
    const key = name.toLowerCase()

    // Resolve command by name or alias
    let def = COMMANDS[key]
    if (!def) {
      const entry = Object.entries(COMMANDS).find(([, d]) => d.aliases?.includes(key))
      if (entry) def = entry[1]
    }

    if (!def) {
      setState(prev => ({
        ...prev,
        lines: [...prev.lines, makeLine('error', `command not found: ${key}`)],
      }))
      return
    }

    const currentState = stateRef.current

    if (def.type === 'sync') {
      const result = def.handler(args, currentState) as CommandResult
      setState(prev => ({
        ...prev,
        lines: [...prev.lines, ...hydrateLines(result.lines)],
        ...(result.nextState ?? {}),
      }))
      return
    }

    // Streaming async: no loading placeholder; handler appends lines as it goes.
    if (def.stream) {
      const append = (type: TerminalLine['type'], content: TerminalLine['content']) => {
        setState(prev => ({ ...prev, lines: [...prev.lines, makeLine(type, content)] }))
      }
      setState(prev => ({ ...prev, isLoading: true }))
      try {
        const result = (await def.handler(args, currentState, append)) as CommandResult | undefined
        setState(prev => ({
          ...prev,
          isLoading: false,
          lines: result?.lines ? [...prev.lines, ...hydrateLines(result.lines)] : prev.lines,
          ...(result?.nextState ?? {}),
        }))
      } catch {
        setState(prev => ({
          ...prev,
          isLoading: false,
          lines: [...prev.lines, makeLine('error', 'Command failed. Please try again.')],
        }))
      }
      return
    }

    // Async: show a loading placeholder, then swap it out
    const loadingId = makeId()
    setState(prev => ({
      ...prev,
      isLoading: true,
      lines: [...prev.lines, { id: loadingId, type: 'system' as const, content: 'Loading...' }],
    }))

    try {
      const result = await (def.handler(args, currentState) as Promise<CommandResult>)
      setState(prev => ({
        ...prev,
        isLoading: false,
        lines: [
          ...prev.lines.filter(l => l.id !== loadingId),
          ...hydrateLines(result.lines),
        ],
        ...(result.nextState ?? {}),
      }))
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        lines: [
          ...prev.lines.filter(l => l.id !== loadingId),
          makeLine('error', 'Command failed. Please try again.'),
        ],
      }))
    }
  }, [])

  // ─── Imperative actions (shared by keyboard & touch toolbar) ──────────────

  const submitCommand = useCallback(
    async (rawOverride?: string) => {
      const { input, isLoading } = stateRef.current
      if (isLoading) return

      const raw = rawOverride !== undefined ? rawOverride : input
      const trimmed = raw.trim()

      // Echo the typed line and update history
      setState(prev => ({
        ...prev,
        input: '',
        historyIndex: -1,
        lines: [...prev.lines, makeLine('input', trimmed || '')],
        history: trimmed
          ? [trimmed, ...prev.history.filter(h => h !== trimmed)]
          : prev.history,
      }))

      if (!trimmed) return

      await runCommand(trimmed)
    },
    [runCommand],
  )

  const cancelInput = useCallback(() => {
    if (stateRef.current.isLoading) return
    setState(prev => ({
      ...prev,
      input: '',
      historyIndex: -1,
      lines: [...prev.lines, makeLine('system', '^C')],
    }))
  }, [])

  const clearTerminal = useCallback(() => {
    if (stateRef.current.isLoading) return
    setState(prev => ({ ...prev, lines: [], input: '', historyIndex: -1 }))
  }, [])

  const historyPrev = useCallback(() => {
    const { history, historyIndex, isLoading } = stateRef.current
    if (isLoading || history.length === 0) return
    const next = Math.min(historyIndex + 1, history.length - 1)
    setState(prev => ({ ...prev, historyIndex: next, input: history[next] ?? '' }))
  }, [])

  const historyNext = useCallback(() => {
    const { history, historyIndex, isLoading } = stateRef.current
    if (isLoading || historyIndex === -1) return
    const next = Math.max(historyIndex - 1, -1)
    setState(prev => ({
      ...prev,
      historyIndex: next,
      input: next === -1 ? '' : history[next],
    }))
  }, [])

  const triggerTabComplete = useCallback(() => {
    const { input, isLoading } = stateRef.current
    if (isLoading || !input) return
    const { completed, matches } = getCompletion(input, COMMANDS)
    if (completed !== input) {
      setState(prev => ({ ...prev, input: completed }))
    } else if (matches.length > 1) {
      const display =
        matches.length > 12
          ? `${matches.slice(0, 12).join('  ')}  … +${matches.length - 12} more`
          : matches.join('  ')
      setState(prev => ({
        ...prev,
        lines: [...prev.lines, makeLine('output', <Dim>{display}</Dim>)],
      }))
    }
  }, [])

  // ─── Keyboard handler ─────────────────────────────────────────────────────

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (stateRef.current.isLoading) return

      // Ctrl+C — cancel
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault()
        cancelInput()
        return
      }

      // Ctrl+L — clear
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        clearTerminal()
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        historyPrev()
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        historyNext()
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        triggerTabComplete()
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        await submitCommand()
      }
    },
    [
      cancelInput,
      clearTerminal,
      historyPrev,
      historyNext,
      triggerTabComplete,
      submitCommand,
    ],
  )

  const appendLine = useCallback(
    (type: TerminalLine['type'], content: TerminalLine['content']) => {
      setState(prev => ({ ...prev, lines: [...prev.lines, makeLine(type, content)] }))
    },
    [],
  )

  const suggestions = getCompletionSuggestions(state.input, COMMANDS)
  const canHistoryPrev =
    state.history.length > 0 && state.historyIndex < state.history.length - 1
  const canHistoryNext = state.historyIndex >= 0

  return {
    lines: state.lines,
    input: state.input,
    isLoading: state.isLoading,
    history: state.history,
    suggestions,
    canHistoryPrev,
    canHistoryNext,
    setInput,
    submitCommand,
    cancelInput,
    clearTerminal,
    historyPrev,
    historyNext,
    triggerTabComplete,
    handleInputChange,
    handleKeyDown,
    outputRef,
    appendLine,
  }
}
