'use client'

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

import { cn } from '@/lib/utils'

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  magnification?: number
  distance?: number
  direction?: 'top' | 'middle' | 'bottom'
  children: React.ReactNode
}

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

const dockVariants = cva(
  'h-[58px] sm:h-[80px] sm:px-4 flex min-[370px]:px-2 p-2 sm:gap-6 rounded-2xl border bg-background/50 backdrop-blur-lg backdrop-saturate-150'
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = 'bottom',
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false)
    const [width, setWidth] = useState<number>(500)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
      // wait 2 seconds before showing the floating navbar
      setTimeout(() => {
        setVisible(true)
      }, 2000)

      setWidth(window.innerWidth)
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

      const handleResize = () => {
        setWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const mousex = useMotionValue(Infinity)

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mousex: mousex,
          magnification: magnification,
          distance: distance,
        })
      })
    }

    if (width < 400 || isTouchDevice) {
      return (
        <div
          className={cn(
            dockVariants({ className }),
            {
              'items-start': direction === 'top',
              'items-center': direction === 'middle',
              'items-end': direction === 'bottom',
            },
            'hover-none'
          )}
        >
          {renderChildren()}
        </div>
      )
    }

    return (
      <motion.div
        initial={{
          opacity: 1,
          y: 100,
        }}
        animate={{
          y: visible ? 0 : 100,
          opacity: visible ? 1 : 0,
          type: 'spring',
        }}
        transition={{
          type: 'spring',
        }}
        ref={ref}
        onMouseMove={(e) => mousex.set(e.pageX)}
        onMouseLeave={() => mousex.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          'items-start': direction === 'top',
          'items-center': direction === 'middle',
          'items-end': direction === 'bottom',
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = 'Dock'

export interface DockIconProps {
  size?: number
  magnification?: number
  distance?: number
  mousex?: any
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mousex,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const distanceCalc = useTransform(mousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  )

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

DockIcon.displayName = 'DockIcon'

export { Dock, DockIcon, dockVariants }
