'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileQuickNav } from './mobile-quick-nav'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const mainNavItems = [

    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: 'Calculator', href: '/pc' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/#contact' },
  ]

  const serviceItems = [
    { label: 'Full Home Interiors', href: '/services/full-home-interiors' },
    { label: 'Modular Interiors', href: '/services/modular-interiors' },
    { label: 'Luxury Interiors', href: '/services/luxury-interiors' },
  ]

  const specializedItems = [
    { label: 'Modular Kitchen', href: '/lp/landing-page' },
    { label: 'Wardrobes', href: '/lp/landing-page' },
    { label: 'False Ceiling', href: '/lp/landing-page' },
    { label: 'Space Planning', href: '/lp/landing-page' },
  ]

  const handleContactClick = (e: React.MouseEvent) => {
    // If we're on the home page, just scroll. If not, the Link will handle the navigation.
    if (window.location.pathname === '/') {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  }

  return (
    <nav className={`sticky top-0 w-full max-w-full overflow-visible bg-white font-sans shadow-sm transition-all duration-300 ${isOpen ? 'z-[1000]' : 'z-50'}`}>
      {/* Main Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 relative">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3 group z-10">
            <div className="relative h-8 w-8 lg:h-10 lg:w-10 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-transparent transition-transform group-hover:scale-105">
               <Image 
                 src="/images/logo.png" 
                 alt="Mark" 
                 fill 
                 className="object-cover"
                 priority
               />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-lg lg:text-xl font-bold uppercase tracking-tighter text-[#222222]">
                Grospace
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] text-[#ee6669]">
                Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            <Link 
              href="/"
              className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 hover:text-[#ee6669] transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link 
                href="/services"
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-700 hover:text-[#ee6669] transition-colors py-8"
              >
                Services <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-zinc-100 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-2 p-4 z-[100]"
                  >
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-[#ee6669] uppercase tracking-widest mb-4 block">Main Categories</span>
                      {serviceItems.map((item) => (
                        <Link 
                          key={item.label}
                          href={item.href}
                          className="block p-4 rounded-xl hover:bg-zinc-50 transition-colors group"
                        >
                          <span className="text-sm font-medium text-zinc-900 group-hover:text-[#222222] block">{item.label}</span>
                          <span className="text-[10px] text-zinc-400 font-light">End-to-end design & execution</span>
                        </Link>
                      ))}
                    </div>
                    <div className="p-4 bg-zinc-50/50 rounded-2xl space-y-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 block">Specialized Solutions</span>
                      {specializedItems.map((item) => (
                        <Link 
                          key={item.label}
                          href={item.href}
                          className="block p-3 rounded-lg hover:bg-white transition-colors group"
                        >
                          <span className="text-[13px] font-medium text-zinc-600 group-hover:text-[#ee6669]">{item.label}</span>
                        </Link>
                      ))}
                      <div className="pt-4 mt-4 border-t border-zinc-100">
                        <Link href="/services" className="text-[10px] font-bold text-[#222222] uppercase tracking-widest hover:text-[#ee6669] transition-colors">
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainNavItems.slice(1).map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={item.label === 'Contact' ? handleContactClick : undefined}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 hover:text-[#ee6669] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA - Right */}
          <div className="flex items-center gap-4 z-10">
            <Button 
                asChild
                className="hidden lg:flex bg-[#ee6669] hover:bg-[#222222] text-white rounded-full px-8 py-2 h-12 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#ee6669]/20 transition-all active:scale-95"
              >
                <Link href="/lp/landing-page">
                  Get Free Quote
                </Link>
              </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="shrink-0 p-2 text-zinc-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Quick Nav */}
        <MobileQuickNav />
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[120] min-h-screen bg-white lg:hidden pointer-events-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-12">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-transparent shadow-sm">
                      <Image 
                        src="/images/logo.png" 
                        alt="Mark" 
                        fill 
                        className="object-cover"
                        priority
                      />
                  </div>
                  <div className="flex flex-col -space-y-1">
                    <span className="text-xl font-bold uppercase tracking-tighter text-[#222222]">
                      Grospace
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#ee6669]">
                      Interiors
                    </span>
                  </div>
                </Link>
                <button type="button" onClick={() => setIsOpen(false)} className="p-2"><X className="w-8 h-8 text-zinc-900" /></button>
              </div>

              <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
                <Link href="/" onClick={() => setIsOpen(false)} className="block text-3xl font-serif font-light text-zinc-900">Home</Link>
                
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-[#ee6669] uppercase tracking-widest block">Our Services</span>
                  <div className="grid grid-cols-1 gap-4 pl-4 border-l border-zinc-100">
                    {[...serviceItems, ...specializedItems].map((item) => (
                      <Link 
                        key={item.label} 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg text-zinc-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {mainNavItems.slice(1).map((item) => (
                  <Link 
                    key={item.label} 
                    href={item.href}
                    onClick={(e) => {
                      if (item.label === 'Contact') handleContactClick(e);
                      else setIsOpen(false);
                    }}
                    className="block text-3xl font-serif font-light text-zinc-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                <Button 
                  asChild
                  className="w-full bg-[#ee6669] hover:bg-[#222222] text-white h-16 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-[#ee6669]/20"
                >
                  <Link href="/lp/landing-page" onClick={() => setIsOpen(false)}>
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
