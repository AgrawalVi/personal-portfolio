import Link from 'next/link'
import { Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { GitHubDark, GitHubLight } from '../ui/icons/github'
import { LinkedIn } from '../ui/icons/linkedin'

export function HeroSection() {
  return (
    <section className="w-full px-6 pb-10">
      <p className="text-muted-foreground leading-relaxed">
        Hey, I&apos;m a software engineer who enjoys taking early ideas and building
        them out into complete products. I prioritize getting the details right,
        whether that&apos;s in cloud infrastructure, tweaking how a button looks, or
        the business logic that ties it all together.
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-xl mt-3">
        Check out the terminal, entertainment awaits!
      </p>
      <div className="flex items-center gap-2 mt-4 justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="https://github.com/AgrawalVi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubDark className="size-4 mr-1 hidden dark:block" />
            <GitHubLight className="size-4 mr-1 block dark:hidden" />
            GitHub
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="https://linkedin.com/in/vishrut-agrawal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className="size-4 mr-1" />
            LinkedIn
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="mailto:zvishrut@gmail.com">
            <Mail className="size-4 mr-1" />
            Email
          </Link>
        </Button>
      </div>
    </section>
  )
}
