type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext
}

let audioCtx: AudioContext | null = null
const bufferCache = new Map<string, AudioBuffer>()
const inFlight = new Map<string, Promise<AudioBuffer | null>>()

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (audioCtx) return audioCtx

  const AudioCtx =
    window.AudioContext ??
    (window as WindowWithWebkitAudio).webkitAudioContext
  if (!AudioCtx) return null

  try {
    audioCtx = new AudioCtx()
  } catch {
    return null
  }
  return audioCtx
}

function loadSound(
  name: string,
  ctx: AudioContext,
): Promise<AudioBuffer | null> {
  const cached = bufferCache.get(name)
  if (cached) return Promise.resolve(cached)

  const pending = inFlight.get(name)
  if (pending) return pending

  const promise = fetch(`/sounds/${name}.wav`)
    .then((res) => {
      if (!res.ok) return null
      return res.arrayBuffer()
    })
    .then((data) => (data ? ctx.decodeAudioData(data) : null))
    .then((buffer) => {
      if (buffer) bufferCache.set(name, buffer)
      return buffer
    })
    .catch(() => null)
    .finally(() => {
      inFlight.delete(name)
    })

  inFlight.set(name, promise)
  return promise
}

function startBuffer(ctx: AudioContext, buffer: AudioBuffer): void {
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(ctx.destination)
  source.start(0)
}

function playFallback(name: string): void {
  try {
    const audio = new Audio(`/sounds/${name}.wav`)
    void audio.play().catch(() => {
      // ignore playback errors (e.g. before user interaction)
    })
  } catch {
    // ignore audio initialization errors
  }
}

export function preloadSounds(names: string[]): void {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    void ctx.resume().catch(() => {})
  }

  for (const name of names) {
    void loadSound(name, ctx)
  }
}

export function playSound(name: string, isMuted: boolean): void {
  if (isMuted || typeof window === 'undefined') return

  const ctx = getAudioContext()
  if (!ctx) {
    playFallback(name)
    return
  }

  const cached = bufferCache.get(name)
  if (cached) {
    if (ctx.state === 'suspended') {
      void ctx
        .resume()
        .then(() => startBuffer(ctx, cached))
        .catch(() => {})
    } else {
      startBuffer(ctx, cached)
    }
    return
  }

  if (ctx.state === 'suspended') {
    void ctx.resume().catch(() => {})
  }

  void loadSound(name, ctx)
    .then((buffer) => {
      if (!buffer) return
      if (ctx.state === 'suspended') {
        return ctx.resume().then(() => startBuffer(ctx, buffer))
      }
      startBuffer(ctx, buffer)
    })
    .catch(() => {})
}
