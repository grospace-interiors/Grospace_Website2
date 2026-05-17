'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LandingNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const PHONE_NUMBER = '+919926987123'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 py-6",
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(45,27,78,0.05)] py-4 border-b border-zinc-100" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-[#ee6669] flex items-center justify-center transition-transform group-hover:rotate-12">
             <div className="w-6 h-6 rounded-full border border-[#ee6669]" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className={cn(
              "text-2xl font-bold tracking-tighter uppercase transition-colors",
              isScrolled ? "text-[#2d1b4e]" : "text-white"
            )}>
              Grospace
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#ee6669]">
              Interiors
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <a 
            href={`tel:${PHONE_NUMBER}`} 
            className={cn(
              "hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#ee6669]",
              isScrolled ? "text-zinc-500" : "text-white/80"
            )}
          >
            <Phone className="w-4 h-4 text-[#ee6669]" />
            {PHONE_NUMBER}
          </a>

          <Button 
            asChild 
            className="bg-[#ee6669] hover:bg-[#2d1b4e] text-white px-8 py-3 h-auto text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-xl shadow-[#ee6669]/20 group"
          >
            <Link href="#get-quote" onClick={(e) => {
              e.preventDefault();
              document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Get Free Quote <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
