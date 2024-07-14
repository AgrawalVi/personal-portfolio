import type { Metadata } from 'next'
import { Josefin_Sans, Nunito } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { MenuDock } from '@/components/general/nav-dock'
import Footer from '@/components/general/footer'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin-sans',
})
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Vishrut Agrawal',
  description: "Vishrut Agrawal's Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-pt-[2rem]" suppressHydrationWarning>
      <body className={`${josefinSans.className} ${nunito.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative">
            <MenuDock />
            <div className="min-h-dvh grid grid-rows-[1fr_auto]">
              <main className="pb-20">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
