import type { Metadata } from 'next'
import { Josefin_Sans, Nunito } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { MenuDock } from '@/components/general/nav-dock'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefinSans.className} ${nunito.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative">
            <MenuDock />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
