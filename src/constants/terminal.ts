export const TERMINAL_PROMPT = 'visitor@vishrut.tech:~$'

export const TERMINAL_HINT_COMMANDS = [
  'help',
  'whoami',
  'weather',
  'joke',
  'nowplaying',
  'games',
  'games snake',
  'games space-invaders',
  'projects',
  'coffee',
] as const

export const TOUCH_TERMINAL_HINT_COMMANDS = TERMINAL_HINT_COMMANDS.filter(
  (cmd) => !cmd.startsWith('games'),
)

export interface QuickCommand {
  label: string
  command: string
  /** If true, fills the input and focuses instead of executing immediately. */
  prefillOnly?: boolean
}

export const TOUCH_QUICK_COMMANDS: readonly QuickCommand[] = [
  { label: 'help', command: 'help' },
  { label: 'ls', command: 'ls' },
  { label: 'nowplaying', command: 'nowplaying' },
  { label: 'weather', command: 'weather' },
  { label: 'joke', command: 'joke' },
  { label: 'date', command: 'date' },
  { label: 'price …', command: 'price ', prefillOnly: true },
  { label: 'define …', command: 'define ', prefillOnly: true },
  { label: 'coffee', command: 'coffee' },
  { label: 'matrix', command: 'matrix' },
  { label: 'hack', command: 'hack' },
  { label: 'whoami', command: 'whoami' },
  { label: 'hello', command: 'hello' },
  { label: 'ping', command: 'ping' },
  { label: 'uname', command: 'uname' },
  { label: 'sudo', command: 'sudo' },
]
