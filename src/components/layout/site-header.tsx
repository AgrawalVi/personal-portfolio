'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { NavLinks } from '@/components/layout/nav-links'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((prev) => (prev ? y > 24 : y > 64))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-200',
        'border-b',
        scrolled ? 'border-border/40' : 'border-transparent',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background/70 backdrop-blur-md"
      />
      <div
        className={cn(
          'relative z-10 max-w-3xl mx-auto px-4 transition-[padding] duration-300 ease-out',
          scrolled ? 'pt-14 md:pt-4 pb-4' : 'pt-16 md:pt-12 pb-4',
        )}
      >
        <NavLinks />
      </div>
    </header>
  )
}
