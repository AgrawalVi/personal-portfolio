'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from 'motion/react'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevPathnameRef = useRef(pathname)

  useIsomorphicLayoutEffect(() => {
    if (prevPathnameRef.current === pathname) return
    prevPathnameRef.current = pathname

    const el = containerRef.current
    if (shouldReduceMotion || !el || typeof el.animate !== 'function') return

    const animation = el.animate(
      [
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 240,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    )

    return () => {
      animation.cancel()
    }
  }, [pathname, shouldReduceMotion])

  return (
    <div ref={containerRef} className="px-2 min-w-0">
      {children}
    </div>
  )
}
