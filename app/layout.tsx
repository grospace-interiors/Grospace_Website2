import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { LeadModal } from '@/components/lead-modal'
import { EstimateModal } from '@/components/estimate-modal'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
import FacebookPixel from '@/components/facebook-pixel'
import GoogleTagManager, { GTMNoScript } from '@/components/google-tag-manager'
import { Suspense } from 'react'
import './globals.css'

const geistSans = Geist({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'Interior Designers in Bhopal | Grospace Interiors',
  description: 'Premium interior design and custom furniture studio in Bhopal. Expert modular kitchens, wardrobes, and full home interiors with transparent pricing and 10-year design excellence.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Interior Designers in Bhopal | Grospace Interiors',
    description: 'Premium interior design and custom furniture studio in Bhopal. Expert modular kitchens, wardrobes, and full home interiors with transparent pricing and 10-year design excellence.',
    url: 'https://grospaceinteriors.com',
    siteName: 'Grospace Interiors',
    images: [
      {
        url: 'https://grospaceinteriors.com/images/landing-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Grospace Interiors Bhopal',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Designers in Bhopal | Grospace Interiors',
    description: 'Premium interior design and custom furniture studio in Bhopal. Expert modular kitchens, wardrobes, and full home interiors with transparent pricing and 10-year design excellence.',
    images: ['https://grospaceinteriors.com/images/landing-hero.webp'],
  },
  alternates: {
    canonical: 'https://grospaceinteriors.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <GoogleTagManager />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Bhopal" />
        <meta name="geo.position" content="23.2167;77.4352" />
        <meta name="ICBM" content="23.2167, 77.4352" />
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
      <body className={`${geistSans.className} antialiased`}>
        <GTMNoScript />
        <Suspense fallback={null}>
          <FacebookPixel />
          {children}
          <LeadModal />
        </Suspense>
        <WhatsAppFab />
        <MobileCtaBar />
        <EstimateModal />
        <Analytics />
      </body>
    </html>
  )
}
