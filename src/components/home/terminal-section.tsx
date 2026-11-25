import { GameProvider } from '@/contexts/game-context'

import { TerminalWidget } from '../terminal/terminal-widget'

export function TerminalSection() {
  return (
    <div className="phone-hidden">
      <GameProvider>
        <TerminalWidget />
      </GameProvider>
    </div>
  )
}
