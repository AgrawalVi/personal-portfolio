import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Josefin_Sans, Nunito_Sans, Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'

import { TerminalHistoryProvider } from '@/contexts/terminal-history-context'

import { siteMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { PageHeader } from '@/components/layout/page-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { GlobalTerminalLauncher } from '@/components/terminal/global-terminal-launcher'

const nunitoSans = Nunito_Sans({ variable: '--font-sans', subsets: ['latin'] })

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

const josefinSans = Josefin_Sans({
  variable: '--font-josefin-sans',
  subsets: ['latin'],
})

const pressStart2P = Press_Start_2P({
  variable: '--font-pixel',
  weight: '400',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full antialiased font-sans',
        jetbrainsMono.variable,
        josefinSans.variable,
        nunitoSans.variable,
        pressStart2P.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange forcedTheme="dark">
          <TooltipProvider>
            <TerminalHistoryProvider>
              <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] min-h-dvh">
                <SiteHeader />
                <main className="pt-4 w-full min-w-0 px-3 sm:px-4 max-w-3xl mx-auto">
                  <PageHeader />
                  <div className="px-2 min-w-0">{children}</div>
                </main>
                <SiteFooter />
              </div>
              <GlobalTerminalLauncher />
            </TerminalHistoryProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
