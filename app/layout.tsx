import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { LeadModal } from '@/components/lead-modal'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
import { Suspense } from 'react'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'Interior Designers in Bhopal | Grospace Interiors',
  description: 'Premium interior design and custom furniture studio in Bhopal. Expert modular kitchens, wardrobes, and full home interiors with transparent pricing and lifetime warranty.',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InteriorDesign",
              "name": "Grospace Interiors",
              "image": "https://grospaceinteriors.com/logo.png",
              "@id": "https://grospaceinteriors.com",
              "url": "https://grospaceinteriors.com",
              "telephone": "+918319032087",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Arera Colony",
                "addressLocality": "Bhopal",
                "addressRegion": "MP",
                "postalCode": "462016",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.2167,
                "longitude": 77.4352
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "10:00",
                "closes": "20:00"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          {children}
          <WhatsAppFab />
          <MobileCtaBar />
          <LeadModal />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
