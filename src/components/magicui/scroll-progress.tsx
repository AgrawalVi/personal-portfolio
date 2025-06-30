'use client'

import { cn } from '@/lib/utils'
import { motion, MotionProps, useScroll } from 'framer-motion'
import React from 'react'
interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#6e5cf5] to-[#7816ef]',
        className,
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
})

ScrollProgress.displayName = 'ScrollProgress'
