'use client'

import {
  type RefObject,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react'

export const TOUCH_MEDIA_QUERY =
  '(hover: none), (pointer: coarse), (max-width: 1023px)'

export const PHONE_MEDIA_QUERY =
  '(hover: none) and (max-width: 639px), (pointer: coarse) and (max-width: 639px), (hover: none) and (max-height: 500px), (pointer: coarse) and (max-height: 500px)'

export function matchesTouchMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(TOUCH_MEDIA_QUERY).matches
}

export function matchesPhoneMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(PHONE_MEDIA_QUERY).matches
}

export function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

/**
 * Focuses a terminal input without triggering iOS WebKit's automatic focus-pan.
 *
 * When an unfocused `<input>` sits near the bottom of a `position: fixed`
 * fullscreen overlay, iOS Safari pans the visual viewport upward before
 * `visualViewport` resize events fire, shoving the entire terminal off-screen
 * until React snaps it back down. Briefly translating the input above the top
 * of the viewport during `.focus()` makes WebKit treat it as already above the
 * keyboard so the viewport stays pinned at `offsetTop: 0` while the container
 * resizes cleanly to `visualViewport.height`.
 */
export function focusInputWithoutViewportPan(
  el: HTMLInputElement | null,
  preventViewportPan: boolean,
): void {
  if (!el || el.disabled) return
  if (preventViewportPan && isIOSDevice() && document.activeElement !== el) {
    el.style.transform = 'translateY(-8000px)'
    el.focus({ preventScroll: true })
    window.setTimeout(() => {
      el.style.removeProperty('transform')
    }, 0)
    return
  }
  el.focus({ preventScroll: true })
}

function subscribeTouchMode(callback: () => void) {
  const mq = window.matchMedia(TOUCH_MEDIA_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getTouchModeSnapshot(): boolean {
  return matchesTouchMode()
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

function subscribePhoneMode(callback: () => void) {
  const mq = window.matchMedia(PHONE_MEDIA_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getPhoneModeSnapshot(): boolean {
  return matchesPhoneMode()
}

function getPhoneModeServerSnapshot(): boolean {
  return false
}

/**
 * Returns true on phone-sized touch devices (portrait < 640px or landscape
 * height <= 500px), excluding tablets (iPad mini 744px+) and desktop.
 */
export function usePhoneMode(): boolean {
  return useSyncExternalStore(
    subscribePhoneMode,
    getPhoneModeSnapshot,
    getPhoneModeServerSnapshot,
  )
}

/**
 * Locks background document scroll while a fullscreen terminal or sheet is
 * open. Uses `position: fixed` on `body` (preserving visual scroll position)
 * plus `overflow: hidden` on `html`, because iOS Safari ignores
 * `body { overflow: hidden }` when the software keyboard opens.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY
    const lockedPath = window.location.pathname

    const prevHtmlOverflow = html.style.overflow
    const prevHtmlOverscroll = html.style.overscrollBehavior
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyLeft = body.style.left
    const prevBodyRight = body.style.right
    const prevBodyOverflow = body.style.overflow
    const prevBodyOverscroll = body.style.overscrollBehavior

    html.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0)
    }

    const onWindowScroll = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('scroll', onWindowScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onWindowScroll)
      html.style.overflow = prevHtmlOverflow
      html.style.overscrollBehavior = prevHtmlOverscroll
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.left = prevBodyLeft
      body.style.right = prevBodyRight
      body.style.overflow = prevBodyOverflow
      body.style.overscrollBehavior = prevBodyOverscroll
      if (scrollY > 0 && window.location.pathname === lockedPath) {
        window.scrollTo(0, scrollY)
      }
    }
  }, [locked])
}

function findScrollableAncestor(
  target: EventTarget | null,
  boundary: HTMLElement,
  axis: 'x' | 'y',
): HTMLElement | null {
  let node = target instanceof HTMLElement ? target : null
  while (node && node !== boundary) {
    if (axis === 'x' && node instanceof HTMLInputElement) {
      return node
    }
    const style = window.getComputedStyle(node)
    const overflow = axis === 'y' ? style.overflowY : style.overflowX
    const scrollable = overflow === 'auto' || overflow === 'scroll'
    if (scrollable) {
      const hasOverflow =
        axis === 'y'
          ? node.scrollHeight > node.clientHeight + 1
          : node.scrollWidth > node.clientWidth + 1
      if (hasOverflow) return node
    }
    node = node.parentElement
  }
  return null
}

/**
 * Prevents single-finger touch drags on non-scrollable overlay chrome (or at
 * the overscroll bounds of the output stream) from panning iOS Safari's visual
 * viewport when the software keyboard is open, while preserving native inner
 * scrolling, horizontal chip-rail swiping, and pinch-to-zoom.
 */
export function usePreventOverlayTouchScroll(
  enabled: boolean,
  containerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!enabled || !isIOSDevice()) return
    const container = containerRef.current
    if (!container) return

    let startX: number | null = null
    let startY: number | null = null
    let verticalScroller: HTMLElement | null = null
    let horizontalScroller: HTMLElement | null = null

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        startX = null
        startY = null
        verticalScroller = null
        horizontalScroller = null
        return
      }
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      verticalScroller = findScrollableAncestor(e.target, container, 'y')
      horizontalScroller = findScrollableAncestor(e.target, container, 'x')
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1 || startX === null || startY === null) return
      const vv = window.visualViewport
      if (vv && Math.abs(vv.scale - 1) > 0.01) return

      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const dx = currentX - startX
      const dy = currentY - startY
      startX = currentX
      startY = currentY

      if (horizontalScroller && Math.abs(dx) >= Math.abs(dy)) {
        return
      }

      if (verticalScroller) {
        const { scrollTop, scrollHeight, clientHeight } = verticalScroller
        const atTop = scrollTop <= 0 && dy > 0
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && dy < 0
        if (!atTop && !atBottom) {
          return
        }
      }

      e.preventDefault()
    }

    const resetTouch = () => {
      startX = null
      startY = null
      verticalScroller = null
      horizontalScroller = null
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', resetTouch, { passive: true })
    container.addEventListener('touchcancel', resetTouch, { passive: true })

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', resetTouch)
      container.removeEventListener('touchcancel', resetTouch)
    }
  }, [enabled, containerRef])
}

export interface VisualViewportState {
  height: number | null
  offsetTop: number
  isKeyboardOpen: boolean
}

function isTextInputFocused(): boolean {
  const active = document.activeElement
  if (!active) return false
  const tag = active.tagName
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    (active instanceof HTMLElement && active.isContentEditable)
  )
}

const EMPTY_VIEWPORT: VisualViewportState = {
  height: null,
  offsetTop: 0,
  isKeyboardOpen: false,
}

/**
 * Tracks the browser's visualViewport so fullscreen overlays and bottom sheets
 * stay pinned cleanly above the software keyboard on iOS Safari and Android.
 */
export function useVisualViewport(enabled: boolean): VisualViewportState {
  const [viewport, setViewport] = useState<VisualViewportState>(EMPTY_VIEWPORT)
  const [prevEnabled, setPrevEnabled] = useState(enabled)

  if (prevEnabled !== enabled) {
    setPrevEnabled(enabled)
    setViewport(EMPTY_VIEWPORT)
  }

  useEffect(() => {
    if (!enabled) return

    const vv = window.visualViewport
    if (!vv) return

    let restingHeight = Math.max(window.innerHeight, Math.round(vv.height))
    let blurResetTimer: number | null = null

    const clearBlurReset = () => {
      if (blurResetTimer !== null) {
        window.clearTimeout(blurResetTimer)
        blurResetTimer = null
      }
    }

    const updateViewport = (next: VisualViewportState) => {
      setViewport((prev) => {
        if (
          prev.height === next.height &&
          prev.offsetTop === next.offsetTop &&
          prev.isKeyboardOpen === next.isKeyboardOpen
        ) {
          return prev
        }
        return next
      })
    }

    const sync = () => {
      const nextHeight = Math.round(vv.height)
      const nextOffsetTop = Math.max(0, Math.round(vv.offsetTop))
      const isZoomed = Math.abs(vv.scale - 1) > 0.01
      const focused = isTextInputFocused()

      if (!isZoomed && !focused) {
        restingHeight = Math.max(window.innerHeight, nextHeight)
      }

      const baseline = Math.max(window.innerHeight, restingHeight)
      const keyboardOpen = !isZoomed && baseline - nextHeight > 120

      // When no input is focused and not pinch-zoomed, let CSS 100dvh own layout.
      // If Safari left visualViewport height/offsetTop stale after keyboard dismissal
      // or tab/app switching, clear it once the dismiss transition settles.
      if (!focused && !isZoomed) {
        if (!keyboardOpen && nextOffsetTop === 0) {
          clearBlurReset()
          updateViewport(EMPTY_VIEWPORT)
          return
        }
        if (blurResetTimer === null) {
          blurResetTimer = window.setTimeout(() => {
            blurResetTimer = null
            const stillZoomed = Math.abs(vv.scale - 1) > 0.01
            if (!isTextInputFocused() && !stillZoomed) {
              restingHeight = window.innerHeight
              updateViewport(EMPTY_VIEWPORT)
            }
          }, 350)
        }
        return
      }

      clearBlurReset()
      updateViewport({
        height: nextHeight,
        offsetTop: nextOffsetTop,
        isKeyboardOpen: keyboardOpen,
      })
    }

    const onOrientationChange = () => {
      clearBlurReset()
      restingHeight = Math.max(window.innerHeight, Math.round(vv.height))
      sync()
    }

    const onFocusOut = () => {
      clearBlurReset()
      blurResetTimer = window.setTimeout(() => {
        blurResetTimer = null
        const stillZoomed = Math.abs(vv.scale - 1) > 0.01
        if (!isTextInputFocused() && !stillZoomed) {
          restingHeight = window.innerHeight
          updateViewport(EMPTY_VIEWPORT)
          return
        }
        sync()
      }, 350)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        clearBlurReset()
        if (!isTextInputFocused()) {
          restingHeight = window.innerHeight
          updateViewport(EMPTY_VIEWPORT)
        }
        sync()
      }
    }

    const initRaf = requestAnimationFrame(sync)
    vv.addEventListener('resize', sync)
    vv.addEventListener('scroll', sync)
    window.addEventListener('resize', sync)
    window.addEventListener('focus', sync)
    window.addEventListener('orientationchange', onOrientationChange)
    window.addEventListener('pageshow', onVisibilityChange)
    document.addEventListener('visibilitychange', onVisibilityChange)
    document.addEventListener('focusin', sync)
    document.addEventListener('focusout', onFocusOut)

    return () => {
      cancelAnimationFrame(initRaf)
      clearBlurReset()
      vv.removeEventListener('resize', sync)
      vv.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      window.removeEventListener('focus', sync)
      window.removeEventListener('orientationchange', onOrientationChange)
      window.removeEventListener('pageshow', onVisibilityChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      document.removeEventListener('focusin', sync)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [enabled])

  if (!enabled) {
    return EMPTY_VIEWPORT
  }

  return viewport
}
