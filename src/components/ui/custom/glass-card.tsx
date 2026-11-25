'use client'

import { useEffect, useMemo } from 'react'
import type React from 'react'
import { motion, useAnimate } from 'motion/react'

import { cn } from '@/lib/utils'

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function seededRand(seed: number, min: number, max: number) {
  const t = (Math.sin(seed) * 10000) % 1
  return min + Math.abs(t) * (max - min)
}

const blobCenters = [25, 50, 75]

function Blob({
  color,
  position,
}: {
  color: string
  position: React.CSSProperties
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let active = true

    async function roam() {
      await animate(
        scope.current,
        {
          x: rand(-50, 50),
          y: rand(-40, 40),
          scale: rand(0.8, 1.3),
        },
        { duration: 0 },
      )

      while (active) {
        await animate(
          scope.current,
          {
            x: rand(-65, 65),
            y: rand(-55, 55),
            scale: rand(0.7, 1.45),
          },
          {
            duration: rand(2.5, 5.5),
            ease: 'easeInOut',
          },
        )
      }
    }

    roam()
    return () => {
      active = false
    }
  }, [animate, scope])

  return (
    <motion.div
      ref={scope}
      className="absolute h-44 w-44 rounded-full blur-3xl opacity-30 pointer-events-none"
      style={{ backgroundColor: color, ...position }}
    />
  )
}

interface GlassCardProps {
  /** Three hex colors for the animated blobs */
  colors: string[]
  /** Seed string used to deterministically position blobs */
  seed: string
  className?: string
  children: React.ReactNode
  /** Extra props forwarded to the outer motion.div */
  onClick?: () => void
  /** Shared-layout ID for Framer Motion expand animations */
  layoutId?: string
  /** Forwarded to the root motion.div — useful for useOutsideClick */
  ref?: React.Ref<HTMLDivElement>
  /** Replaces the glass/blob aesthetic with a solid bg-background surface */
  solid?: boolean
}

export function GlassCard({
  colors,
  seed,
  className,
  children,
  onClick,
  layoutId,
  ref,
  solid = false,
}: GlassCardProps) {
  const blobPositions = useMemo<React.CSSProperties[]>(() => {
    const s = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return blobCenters.map((cx, i) => ({
      top: `${seededRand(s + i * 7, 10, 55)}%`,
      left: `${seededRand(s + i * 13, cx - 10, cx + 10)}%`,
      transform: 'translate(-50%, -50%)',
    }))
  }, [seed])

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={layoutId}
      onClick={onClick}
      transition={{ layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-muted-foreground/10 shadow-sm transition-colors duration-300',
        solid
          ? 'bg-background hover:border-muted-foreground/20'
          : 'backdrop-blur-md hover:border-muted-foreground/20',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {!solid && colors.map((color, i) => (
        <Blob key={color} color={color} position={blobPositions[i]} />
      ))}

      {!solid && (
        <>
          {/* Background tint */}
          <div className="absolute inset-0 bg-muted-foreground/2 group-hover:bg-muted-foreground/3 transition-colors duration-300 pointer-events-none" />
          {/* Glass sheen */}
          <div className="absolute inset-0 bg-linear-to-br from-muted-foreground/5 to-transparent pointer-events-none" />
        </>
      )}

      <div className="relative z-10 h-full pb-1">{children}</div>
    </motion.div>
  )
}
