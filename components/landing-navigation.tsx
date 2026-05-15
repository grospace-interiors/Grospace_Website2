'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function LandingNavigation() {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('open-lead-modal'))
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-[#332233] py-4 shadow-lg"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#ee6669] flex items-center justify-center transition-transform group-hover:rotate-12">
               <div className="w-6 h-6 rounded-full border border-[#ee6669]" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white uppercase group-hover:text-[#ee6669] transition-colors">
              Grospace
            </span>
          </Link>

        {/* Action Button */}
        <Button asChild className="bg-[#ee6669] hover:bg-white hover:text-[#332233] text-white px-8 py-2.5 h-auto text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-lg shadow-black/20">
          <Link href="/lp/landing-page">Get Free Quote</Link>
        </Button>
      </div>
    </motion.nav>
  )
}
