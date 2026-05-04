import type { Metadata } from 'next'
import {
  JetBrains_Mono,
  Josefin_Sans,
  Nunito_Sans,
  Press_Start_2P,
} from 'next/font/google'

import './globals.css'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          forcedTheme="dark"
        >
          <TooltipProvider>
            <div className="grid grid-rows-[auto_1fr_auto] h-screen">
              <SiteHeader />
              <main className="pt-4 w-full px-4 max-w-3xl mx-auto">
                <PageHeader />
                <div className="px-2">{children}</div>
              </main>
              <SiteFooter />
            </div>
            <GlobalTerminalLauncher />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
