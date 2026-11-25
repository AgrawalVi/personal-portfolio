import { GameProvider } from '@/contexts/game-context'

import { TerminalWidget } from '../terminal/terminal-widget'

export function TerminalSection() {
  return (
    <GameProvider>
      <TerminalWidget />
    </GameProvider>
  )
}
