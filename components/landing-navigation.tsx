'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileQuickNav } from './mobile-quick-nav'

export function LandingNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const PHONE_NUMBER = '+918319032087'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isTop = currentScrollY < 50
      
      setIsScrolled(!isTop)
      setIsScrollingDown(currentScrollY > lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled 
          ? "bg-white shadow-[0_8px_32px_rgba(45,27,78,0.05)] border-b border-zinc-100" 
          : "bg-transparent"
      )}
    >
      <div className={cn(
        "transition-all duration-500",
        isScrolled ? "py-2 lg:py-4" : "py-4 lg:py-6"
      )}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 lg:gap-3 group"
          >
            <div className="relative h-8 w-8 lg:h-10 lg:w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#ee6669] flex items-center justify-center bg-white shadow-sm transition-transform group-hover:scale-105">
               <Image 
                 src="/images/logo.png" 
                 alt="Mark" 
                 fill 
                 sizes="(max-width: 768px) 32px, 40px"
                 className="object-cover"
                 priority
               />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className={cn(
                "text-lg lg:text-xl font-bold uppercase tracking-tighter transition-colors",
                isScrolled ? "text-[#222222]" : "text-white"
              )}>
                Grospace
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] text-[#ee6669]">
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
              className="bg-[#ee6669] hover:bg-[#222222] text-white px-8 py-3 h-auto text-[10px] font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-xl shadow-[#ee6669]/20 group"
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
      </div>
      
      {/* Mobile Quick Nav - Only visible when header is white (scrolled) AND scrolling down */}
      <AnimatePresence>
        {isScrolled && isScrollingDown && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-zinc-50"
          >
            <MobileQuickNav />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
