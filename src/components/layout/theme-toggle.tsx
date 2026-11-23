'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Skeleton } from '../ui/skeleton'

const emptySubscribe = () => () => {}

const CYCLE: Record<string, string> = {
  light: 'dark',
  dark: 'light',
}

const LABELS: Record<string, string> = {
  light: 'Light mode',
  dark: 'Dark mode',
}

const ICONS: Record<string, React.ReactNode> = {
  light: <Sun className="size-4" />,
  dark: <Moon className="size-4" />,
}

export function ThemeToggle() {
  const { theme = 'dark', setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  function cycleTheme() {
    setTheme(CYCLE[theme])
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
          onClick={cycleTheme}
        >
          {mounted ? ICONS[theme] : <Skeleton className="size-4" />}
          <span className="sr-only">{LABELS[theme]}</span>
        </Button>
      </TooltipTrigger>
      {mounted && <TooltipContent>{LABELS[theme]}</TooltipContent>}
    </Tooltip>
  )
}
