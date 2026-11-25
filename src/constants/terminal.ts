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

export const HOME_QUICK_COMMANDS: readonly QuickCommand[] = [
  { label: 'help', command: 'help' },
  { label: 'projects', command: 'projects' },
  { label: 'experience', command: 'experience' },
  { label: 'blog', command: 'blog' },
  { label: 'weather', command: 'weather' },
  { label: 'nowplaying', command: 'nowplaying' },
  { label: 'joke', command: 'joke' },
  { label: 'price …', command: 'price ', prefillOnly: true },
  { label: 'define …', command: 'define ', prefillOnly: true },
]

export function getGlobalQuickCommands(pathname: string): QuickCommand[] {
  const navCommands: { path: string; item: QuickCommand }[] = [
    { path: '/', item: { label: 'home', command: 'home' } },
    { path: '/experience', item: { label: 'experience', command: 'experience' } },
    { path: '/projects', item: { label: 'projects', command: 'projects' } },
    { path: '/blog', item: { label: 'blog', command: 'blog' } },
  ]

  const activeNav = navCommands
    .filter(({ path }) =>
      path === '/' ? pathname !== '/' : !pathname.startsWith(path),
    )
    .map(({ item }) => item)

  return [
    ...activeNav,
    { label: 'help', command: 'help' },
    { label: 'weather', command: 'weather' },
    { label: 'nowplaying', command: 'nowplaying' },
    { label: 'joke', command: 'joke' },
    { label: 'price …', command: 'price ', prefillOnly: true },
    { label: 'define …', command: 'define ', prefillOnly: true },
  ]
}
