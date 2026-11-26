export type PageHeaderConfig = { subtitle: string; title: string }
type Listener = () => void

let override: PageHeaderConfig | null = null
let lastOverride: PageHeaderConfig | null = null
const listeners = new Set<Listener>()

export function getOverride() {
  return override
}

export function getLastOverride() {
  return lastOverride
}

export function setOverride(config: PageHeaderConfig | null) {
  override = config
  if (config !== null) {
    lastOverride = config
  }
  listeners.forEach((fn) => fn())
}

export function subscribe(fn: Listener) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
