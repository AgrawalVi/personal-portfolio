import type { Metadata } from "next"
import { Josefin_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const josefinSans = Josefin_Sans({ subsets: ["latin"], weight: ["400"] })

export const metadata: Metadata = {
  title: "Vishrut Agrawal",
  description: "Vishrut Agrawal's Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
