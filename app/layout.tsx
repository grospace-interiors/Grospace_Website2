import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { LeadModal } from '@/components/lead-modal'
import { Suspense } from 'react'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'Grospace Interiors | Interior Design & Custom Furniture Studio',
  description: 'Premium interiors for Indian homes — Grospace Interiors. Thoughtful design with a focus on family comfort and budget.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={null}>
          {children}
          <WhatsAppFab />
          <LeadModal />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
