import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LIABL — Think faster. Decide better.',
  description: 'Adaptive, activity-aware liability waivers for operators who take safety seriously.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="bg-surface font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
