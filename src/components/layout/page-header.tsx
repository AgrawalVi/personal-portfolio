'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react'

import { getLastOverride, getOverride, subscribe, type PageHeaderConfig } from '@/lib/page-header-store'

const BASE_ROUTES: { path: string; config: PageHeaderConfig }[] = [
  { path: '/', config: { subtitle: 'Software Engineer', title: 'Vishrut Agrawal' } },
  { path: '/experience', config: { subtitle: '01.', title: 'Experience' } },
  { path: '/projects', config: { subtitle: '02.', title: 'Projects' } },
  { path: '/blog', config: { subtitle: '03.', title: 'Blog' } },
]

const OVERRIDE_SLOT_INDEX = BASE_ROUTES.length

const REEL_SPRING = {
  type: 'spring' as const,
  stiffness: 440,
  damping: 36,
  mass: 0.85,
  restDelta: 0.001,
  restSpeed: 0.01,
}

function getBaseRouteIndex(pathname: string): number | null {
  if (pathname === '/') return 0
  const idx = BASE_ROUTES.findIndex(
    (route, i) => i > 0 && (pathname === route.path || pathname.startsWith(`${route.path}/`)),
  )
  return idx === -1 ? null : idx
}

function ReelSlot({
  config,
  index,
  isActive,
  reelPosition,
}: {
  config: PageHeaderConfig
  index: number
  isActive: boolean
  reelPosition: MotionValue<number>
}) {
  const y = useTransform(reelPosition, (pos) => `${(index - pos) * 100}%`)
  const rotateX = useTransform(reelPosition, [index - 1, index, index + 1], [-34, 0, 34])
  const opacity = useTransform(
    reelPosition,
    [index - 0.92, index - 0.22, index, index + 0.22, index + 0.92],
    [0, 1, 1, 1, 0],
  )
  const scale = useTransform(reelPosition, [index - 1, index, index + 1], [0.95, 1, 0.95])

  const HeadingTag = isActive ? 'h1' : 'p'

  return (
    <motion.div
      aria-hidden={!isActive || undefined}
      className={
        isActive
          ? 'absolute inset-0 py-2 px-8 will-change-transform'
          : 'pointer-events-none absolute inset-0 select-none py-2 px-8 will-change-transform'
      }
      style={{
        y,
        rotateX,
        opacity,
        scale,
        transformOrigin: 'center center',
      }}
    >
      <p className="text-xs text-muted-foreground tracking-widest font-(family-name:--font-jetbrains-mono) mb-2 uppercase">
        {config.subtitle}
      </p>
      <HeadingTag className="text-4xl leading-tight tracking-tight text-balance wrap-break-word font-(family-name:--font-josefin-sans)">
        {config.title}
      </HeadingTag>
    </motion.div>
  )
}

export function PageHeader() {
  const pathname = usePathname()
  const override = useSyncExternalStore(subscribe, getOverride, () => null)
  const lastOverride = useSyncExternalStore(subscribe, getLastOverride, () => null)
  const shouldReduceMotion = useReducedMotion()

  const baseIndex = getBaseRouteIndex(pathname)
  const targetIndex = override !== null ? OVERRIDE_SLOT_INDEX : baseIndex

  const reelPosition = useMotionValue(targetIndex ?? 0)

  useEffect(() => {
    if (targetIndex === null) return

    if (shouldReduceMotion) {
      reelPosition.set(targetIndex)
      return
    }

    const controls = animate(reelPosition, targetIndex, REEL_SPRING)
    return () => controls.stop()
  }, [targetIndex, shouldReduceMotion, reelPosition])

  const activeIndex = targetIndex ?? 0
  const activeConfig = override ?? (baseIndex !== null ? BASE_ROUTES[baseIndex].config : BASE_ROUTES[0].config)

  const dynamicSlotConfig = override ?? lastOverride
  const slots = [
    ...BASE_ROUTES.map((route) => ({ key: route.path, config: route.config })),
    ...(dynamicSlotConfig ? [{ key: '__override__', config: dynamicSlotConfig }] : []),
  ]

  return (
    <div className="mt-6 pb-2">
      {/* Physical rolling reel viewport */}
      <div className="relative -my-2 overflow-hidden py-2 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] [perspective:700px]">
        {/* Spacer keeps the container sized to the active heading */}
        <div aria-hidden className="pointer-events-none invisible select-none px-8">
          <p className="text-xs tracking-widest font-(family-name:--font-jetbrains-mono) mb-2 uppercase">
            {activeConfig.subtitle}
          </p>
          <p className="text-4xl leading-tight tracking-tight text-balance wrap-break-word font-(family-name:--font-josefin-sans)">
            {activeConfig.title}
          </p>
        </div>

        {slots.map((slot, index) => (
          <ReelSlot
            key={slot.key}
            config={slot.config}
            index={index}
            isActive={index === activeIndex}
            reelPosition={reelPosition}
          />
        ))}
      </div>
    </div>
  )
}
