import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Chat from '@/components/Chat/Chat'
import Providers from '@/components/Providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chatbot Showcase',
  description: 'Chatbot using Next.js, TailwindCSS and OpenAI API',
}

// Root layout: same level as page.tsx, but it is a higher order component for pages.
// The component exported in page.tsx is rendered as children.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  )
}
