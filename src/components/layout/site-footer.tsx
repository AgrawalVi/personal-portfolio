import Link from 'next/link'

import { GitHubDark, GitHubLight } from '../ui/icons/github'
import { LinkedIn } from '../ui/icons/linkedin'

export function SiteFooter() {
  return (
    <footer className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-(family-name:--font-jetbrains-mono)">
          © 2026 Vishrut Agrawal
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/AgrawalVi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <GitHubDark className="h-4 w-4 hidden dark:block" />
            <GitHubLight className="h-4 w-4 block dark:hidden" />
          </Link>
          <Link
            href="https://linkedin.com/in/vishrut-agrawal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedIn className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
