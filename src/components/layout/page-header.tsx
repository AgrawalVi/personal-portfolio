'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'

import { getOverride, subscribe } from '@/lib/page-header-store'
import { cn } from '@/lib/utils'

type RouteConfig = {
  subtitle: string
  title: string
}

const routes: Record<string, RouteConfig> = {
  '/': { subtitle: 'Software Engineer', title: 'Vishrut Agrawal' },
  '/experience': { subtitle: '01.', title: 'Experience' },
  '/projects': { subtitle: '02.', title: 'Projects' },
  '/blog': { subtitle: '03.', title: 'Blog' },
}

function getRoute(pathname: string): RouteConfig {
  if (pathname === '/') return routes['/']
  const match = Object.keys(routes).find((key) => key !== '/' && pathname.startsWith(key))
  return match ? routes[match] : routes['/']
}

const ANIM_DURATION = 300

const ANIM_IN: React.CSSProperties = {
  animation: `page-header-in ${ANIM_DURATION}ms ease both`,
}

const ANIM_OUT: React.CSSProperties = {
  animation: `page-header-out ${ANIM_DURATION}ms ease both`,
}

function TextLayer({
  config,
  style,
  exiting = false,
}: {
  config: RouteConfig
  style?: React.CSSProperties
  exiting?: boolean
}) {
  const Title = exiting ? 'p' : 'h1'

  return (
    <div
      aria-hidden={exiting || undefined}
      className={cn('px-8', exiting ? 'absolute inset-x-0 top-0 pointer-events-none select-none' : 'relative')}
      style={style}
    >
      <p className="text-xs text-muted-foreground tracking-widest font-(family-name:--font-jetbrains-mono) mb-2 uppercase">
        {config.subtitle}
      </p>
      <Title className="text-4xl leading-tight tracking-tight text-balance wrap-break-word font-(family-name:--font-josefin-sans)">
        {config.title}
      </Title>
    </div>
  )
}

export function PageHeader() {
  const pathname = usePathname()
  const override = useSyncExternalStore(subscribe, getOverride, () => null)

  const effective = override ?? getRoute(pathname)

  const [current, setCurrent] = useState(effective)
  const [exiting, setExiting] = useState<RouteConfig | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const prevConfigRef = useRef(effective)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const prev = prevConfigRef.current
    const next = override ?? getRoute(pathname)

    if (prev.subtitle === next.subtitle && prev.title === next.title) return

    prevConfigRef.current = next

    if (timerRef.current) clearTimeout(timerRef.current)

    setExiting(prev)
    setCurrent(next)
    setTransitioning(true)

    timerRef.current = setTimeout(() => {
      setExiting(null)
      setTransitioning(false)
      timerRef.current = null
    }, ANIM_DURATION)
  }, [pathname, override])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="mt-6 pb-2">
      {/* Animated subtitle + title */}
      <div className={cn('relative', transitioning && 'overflow-hidden')}>
        {exiting && (
          <TextLayer key={`exiting:${exiting.subtitle}:${exiting.title}`} config={exiting} style={ANIM_OUT} exiting />
        )}
        <TextLayer
          key={`active:${current.subtitle}:${current.title}`}
          config={current}
          style={transitioning ? ANIM_IN : undefined}
        />
      </div>
    </div>
  )
}
