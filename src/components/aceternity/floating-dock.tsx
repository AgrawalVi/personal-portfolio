'use client'

/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from '@/lib/utils'
import { IconLayoutNavbarCollapse } from '@tabler/icons-react'
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'

import { useRef, useState } from 'react'

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="fixed bottom-14 right-4 z-50 mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                >
                  <div className="z-50 h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  let mouseX = useMotionValue(Infinity)
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'fixed bottom-4 left-1/2 z-50 mx-auto hidden h-16 -translate-x-1/2 items-end gap-4 rounded-2xl border bg-background/50 px-4 pb-3 backdrop-blur-lg backdrop-saturate-150 md:flex',
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string
}) {
  let ref = useRef<HTMLDivElement>(null)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }

    return val - bounds.x - bounds.width / 2
  })

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href} target={href.startsWith('http') ? '_blank' : undefined}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-slate-900 backdrop-blur-3xl backdrop-saturate-150"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border bg-gray-100 px-2 pt-0.5 text-xs text-neutral-700 dark:bg-slate-900 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  )
}
