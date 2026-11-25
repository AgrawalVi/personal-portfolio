'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

const TOUCH_MEDIA_QUERY = '(hover: none), (pointer: coarse), (max-width: 1023px)'

function subscribeTouchMode(callback: () => void) {
  const mq = window.matchMedia(TOUCH_MEDIA_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getTouchModeSnapshot(): boolean {
  return window.matchMedia(TOUCH_MEDIA_QUERY).matches
}

function getTouchModeServerSnapshot(): boolean {
  return false
}

/**
 * Returns true on mobile phones, tablets (both portrait and landscape via
 * pointer: coarse / hover: none), and compact viewports (< 1024px).
 * Returns false on desktop viewports with a fine pointer and hover capability.
 */
export function useTouchMode(): boolean {
  return useSyncExternalStore(
    subscribeTouchMode,
    getTouchModeSnapshot,
    getTouchModeServerSnapshot,
  )
}

export interface VisualViewportState {
  height: number | null
  offsetTop: number
  isKeyboardOpen: boolean
}

/**
 * Tracks the browser's visualViewport so fullscreen overlays and bottom sheets
 * stay pinned cleanly above the software keyboard on iOS Safari and Android.
 */
export function useVisualViewport(enabled: boolean): VisualViewportState {
  const [viewport, setViewport] = useState<VisualViewportState>({
    height: null,
    offsetTop: 0,
    isKeyboardOpen: false,
  })

  useEffect(() => {
    if (!enabled) return

    const vv = window.visualViewport
    if (!vv) return

    let rafId = 0

    const update = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const layoutHeight = window.innerHeight
        const nextHeight = Math.round(vv.height)
        const nextOffsetTop = Math.max(0, Math.round(vv.offsetTop))
        const keyboardOpen = layoutHeight - nextHeight > 120

        setViewport((prev) => {
          if (
            prev.height === nextHeight &&
            prev.offsetTop === nextOffsetTop &&
            prev.isKeyboardOpen === keyboardOpen
          ) {
            return prev
          }
          return {
            height: nextHeight,
            offsetTop: nextOffsetTop,
            isKeyboardOpen: keyboardOpen,
          }
        })
      })
    }

    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    window.addEventListener('orientationchange', update)

    return () => {
      cancelAnimationFrame(rafId)
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [enabled])

  if (!enabled) {
    return { height: null, offsetTop: 0, isKeyboardOpen: false }
  }

  return viewport
}
