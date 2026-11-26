'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const ROUTE_ORDER = ['/', '/experience', '/projects', '/blog'] as const

function getRoutePosition(pathname: string): number {
  const exactIndex = ROUTE_ORDER.indexOf(pathname as (typeof ROUTE_ORDER)[number])
  if (exactIndex !== -1) return exactIndex
  // Blog detail pages (/blog/[slug]) and 404s sit in the dynamic slot past /blog.
  return ROUTE_ORDER.length
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [navState, setNavState] = useState<{
    pathname: string
    direction: 'up' | 'down'
  }>({
    pathname,
    direction: 'up',
  })

  if (navState.pathname !== pathname) {
    const prevPos = getRoutePosition(navState.pathname)
    const nextPos = getRoutePosition(pathname)
    setNavState({
      pathname,
      direction: nextPos < prevPos ? 'down' : 'up',
    })
  }

  return (
    <div
      key={pathname}
      className={
        navState.direction === 'down' ? 'animate-page-enter-down min-w-0 px-2' : 'animate-page-enter-up min-w-0 px-2'
      }
    >
      {children}
    </div>
  )
}
