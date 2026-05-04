import { HeroSection } from '@/components/home/hero-section'
import { TerminalSection } from '@/components/home/terminal-section'

export default function Home() {
  return (
    <div className="flex flex-col w-full pt-4">
      <HeroSection />
      <TerminalSection />
    </div>
  )
}
