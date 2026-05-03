import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { CommandDef } from '@/types/terminal'
import { Dim, HelpRow, Muted } from '@/components/terminal/rich'

const ROUTES: { path: string; description: string }[] = [
  { path: '/', description: 'Home' },
  { path: '/experience', description: 'Work experience' },
  { path: '/projects', description: 'Projects' },
  { path: '/blog', description: 'Writing' },
]

const ALIASES: Record<string, string> = {
  home: '/',
  experience: '/experience',
  exp: '/experience',
  projects: '/projects',
  proj: '/projects',
  blog: '/blog',
  writing: '/blog',
}

function resolve(target: string): string | null {
  const lower = target.toLowerCase()
  if (lower in ALIASES) return ALIASES[lower]
  const path = lower.startsWith('/') ? lower : `/${lower}`
  if (ROUTES.some(r => r.path === path)) return path
  return null
}

export function makeRouteCommand(
  router: AppRouterInstance,
  path: string,
  description: string,
): CommandDef {
  return {
    description,
    type: 'sync',
    hiddenFromHelp: false,
    handler: () => {
      router.push(path)
      return {
        lines: [{ type: 'system' as const, content: `→ ${path}` }],
      }
    },
  }
}

export function makeNavigateCommand(router: AppRouterInstance): CommandDef {
  return {
    description: 'Navigate to a route',
    usage: '<route>',
    aliases: ['cd', 'goto'],
    details: [
      'Routes the page to the given path. Aliases supported (home, exp, proj, blog).',
      'Example: navigate /projects',
    ],
    type: 'sync',
    hiddenFromHelp: false,
    complete: (args) =>
      args.length === 0
        ? ROUTES.map(r => ({
            value: r.path,
            aliases: Object.entries(ALIASES)
              .filter(([, p]) => p === r.path)
              .map(([a]) => a),
          }))
        : [],
    handler: (args) => {
      if (!args.length) {
        return {
          lines: [
            ...ROUTES.map(r => ({
              type: 'output' as const,
              content: <HelpRow name={r.path} description={r.description} />,
            })),
            {
              type: 'output' as const,
              content: <Dim>type <Muted>navigate &lt;route&gt;</Muted> to jump</Dim>,
            },
          ],
        }
      }

      const path = resolve(args[0])
      if (!path) {
        return {
          lines: [{
            type: 'error' as const,
            content: `navigate: no such route '${args[0]}'`,
          }],
        }
      }

      router.push(path)
      return {
        lines: [{
          type: 'system' as const,
          content: `→ ${path}`,
        }],
      }
    },
  }
}
