export function playSound(name: string, isMuted: boolean): void {
  if (isMuted) return
  try {
    const audio = new Audio(`/sounds/${name}.wav`)
    void audio.play().catch(() => {
      // ignore playback errors (e.g. before user interaction)
    })
  } catch {
    // ignore audio initialization errors
  }
}
