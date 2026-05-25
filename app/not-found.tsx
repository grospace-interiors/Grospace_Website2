'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Home, ArrowRight, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-[80vh] flex items-center justify-center bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#222222]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ee6669]/10 border border-[#ee6669]/20 shadow-sm rotate-6">
               <Sparkles className="h-10 w-10 text-[#ee6669]" />
            </div>
            <h1 className="text-8xl md:text-[150px] font-serif font-light text-[#222222] leading-none tracking-tighter">
              404
            </h1>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#222222]">
              Lost in <span className="text-[#ee6669] italic">Space?</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
              The page you are looking for has moved to another dimension. Let's get you back to designing your dream home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              asChild
              className="bg-[#222222] hover:bg-[#ee6669] text-white px-10 h-16 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl group"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-3" /> Back to Home
              </Link>
            </Button>
            <Button 
              variant="outline"
              asChild
              className="border-zinc-200 text-[#222222] hover:border-[#ee6669] hover:text-[#ee6669] px-10 h-16 rounded-full font-bold uppercase tracking-widest transition-all"
            >
              <Link href="/projects">
                Explore Portfolio <ArrowRight className="w-4 h-4 ml-3" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
