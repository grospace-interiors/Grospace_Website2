'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Layout, 
  ShieldCheck, 
  Zap, 
  Star, 
  Clock, 
  UserCheck, 
  MessageSquare,
  ChevronRight
} from 'lucide-react'
import { ShopSection } from '@/components/shop-section'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LandingBudgetCollection } from '@/lib/types'

const CHARCOAL = '#222222'
const PINK = '#ee6669'

const reasons = [
  {
    title: 'Smart Space Planning',
    text: 'Functional interiors designed around real living and movement patterns.',
    icon: Layout
  },
  {
    title: 'Budget-Friendly Premium',
    text: 'Modern aesthetics achieved without unnecessary overspending or hidden costs.',
    icon: ShieldCheck
  },
  {
    title: 'End-to-End Execution',
    text: 'From initial space planning to final material installation and cleanup.',
    icon: Clock
  },
  {
    title: 'Personalized Attention',
    text: 'Every project is handled with artisanal care and obsession with detail.',
    icon: UserCheck
  }
]

export default function PackagesPage() {
  const [homePackages, setHomePackages] = useState<any[]>([])
  const [specializedSolutions, setSpecializedSolutions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('landing_budget_collections')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) throw error

        if (data) {
          // Map data to the expected UI structure
          const home = data.filter(item => item.display_order >= 1 && item.display_order <= 4).map(item => ({
            id: item.id,
            name: item.title,
            tagline: item.subtitle,
            price: item.price_text,
            description: item.description,
            features: Array.isArray(item.features) ? item.features : [],
            cta: item.title.includes('1BHK') ? 'Calculate Your Estimate' : 'Book Free Site Visit',
            isPopular: item.title.includes('2BHK'),
            image: item.image_url
          }))

          const specialized = data.filter(item => item.display_order >= 5).map(item => ({
            title: item.title,
            price: item.price_text,
            description: item.description,
            image: item.image_url
          }))

          setHomePackages(home)
          setSpecializedSolutions(specialized)
        }
      } catch (error) {
        console.error('Error loading collections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-[#ee6669] font-serif italic text-2xl animate-pulse">Loading Studio Collections...</div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main className="bg-white text-[#222222] overflow-hidden">
        
        {/* 1. HERO SECTION */}
        <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[#222222] py-16 lg:min-h-[580px] lg:py-20">
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600"
            alt="Premium Interior Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222222]/40 via-transparent to-[#222222]" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-6 text-center space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.4em] lg:tracking-[0.5em] text-[#ee6669] font-bold mb-4 lg:mb-6 block">
                Exclusive Studio Collections
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.2] lg:leading-[1.1] tracking-tight mb-6 text-white px-2">
                Interior Packages Designed <br className="hidden xs:block sm:block" />
                <span className="text-[#ee6669] italic">Around Your Home</span>
              </h1>
              <p className="text-sm lg:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed px-2">
                Smart, modern, and space-efficient interior solutions for 1BHK to luxury homes in Bhopal.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-6 px-4"
            >
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                className="w-full sm:w-auto bg-[#ee6669] hover:bg-[#222222] text-white h-12 lg:h-14 px-10 lg:px-12 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 shadow-xl shadow-[#ee6669]/20"
              >
                Book Free Site Visit
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('home-packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto border-zinc-200 text-[#222222] hover:border-[#ee6669] hover:text-[#ee6669] h-12 lg:h-14 px-10 lg:px-12 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500"
              >
                View Packages
              </Button>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ee6669]/30 to-transparent" />
        </section>

        {/* 2. HOME TYPE PACKAGE SECTION */}
        <section id="home-packages" className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
            <div className="text-center mb-12 lg:mb-12 space-y-3 lg:space-y-4">
              <h2 className="text-3xl lg:text-5xl font-serif font-light text-[#222222] leading-tight">Choose Your Home Interior Package</h2>
              <p className="text-zinc-500 text-sm lg:text-lg font-light tracking-wide italic">Tailored solutions based on your home size, lifestyle, and budget.</p>
            </div>

            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-8">
              {homePackages.map((pkg, idx) => (
                <motion.div 
                  key={pkg.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group relative flex min-w-[84%] snap-center flex-col bg-[#E5EEE4] rounded-[1.5rem] lg:rounded-[2.5rem] p-6 lg:p-10 transition-all duration-500 border md:min-w-0 ${pkg.isPopular ? 'border-[#ee6669]/30 ring-1 ring-[#ee6669]/10' : 'border-zinc-100 hover:border-[#ee6669]/20'} hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ee6669] text-white px-5 py-1.5 rounded-full text-[8px] lg:text-[9px] font-bold uppercase tracking-widest shadow-xl">
                      🔥 Most Popular
                    </div>
                  )}

                  <div className="mb-6 lg:mb-10 relative aspect-[4/3] overflow-hidden rounded-[1rem] lg:rounded-2xl">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/20 to-transparent" />
                  </div>

                  <div className="flex-grow space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-lg lg:text-2xl font-serif font-light mb-1 text-[#222222]">{pkg.name}</h3>
                      <p className="text-[9px] lg:text-[10px] font-bold text-[#ee6669] uppercase tracking-widest">{pkg.tagline}</p>
                    </div>

                    <div className="space-y-1.5 lg:space-y-2">
                       <p className="text-xl lg:text-3xl font-serif text-[#222222] tracking-tighter">
                         <span className="text-[9px] lg:text-[10px] font-sans font-bold text-zinc-400 uppercase tracking-widest mr-2">Starting</span>
                         {pkg.price}
                       </p>
                       <p className="text-[10px] lg:text-xs text-zinc-500 font-light leading-relaxed">{pkg.description}</p>
                    </div>

                    <ul className="space-y-3 lg:space-y-4 pt-4 lg:pt-6 border-t border-zinc-100">
                      {pkg.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 lg:gap-3">
                          <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#ee6669]" />
                          <span className="text-[10px] lg:text-[11px] text-zinc-600 font-light">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 lg:pt-10 space-y-3">
                    <Button 
                      onClick={() => {
                        if (pkg.cta === 'Calculate Your Estimate') {
                          window.dispatchEvent(new CustomEvent('open-estimate-modal', { detail: { package: pkg.name } }));
                        } else {
                          window.dispatchEvent(new CustomEvent('open-lead-modal', { detail: { package: pkg.name } }));
                        }
                      }}
                      className={`w-full h-auto min-h-11 lg:min-h-14 py-2 rounded-full font-bold uppercase tracking-tight text-[8px] lg:text-[10px] transition-all duration-500 whitespace-normal leading-tight px-4 ${pkg.isPopular ? 'bg-[#ee6669] hover:bg-[#222222] text-white' : 'bg-white border border-zinc-200 hover:border-[#ee6669] hover:text-[#ee6669] text-[#222222]'}`}
                    >
                      {pkg.cta} <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 ml-2 shrink-0" />
                    </Button>
                    <button
                      onClick={() => window.open(`https://wa.me/918319032087?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package.`)}`, '_blank')}
                      className="w-full py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-[#25D366] flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" /> Quick Enquiry
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SPECIALIZED SOLUTIONS SECTION */}
        <section className="py-16 lg:py-24 bg-[#E5EEE4] border-y border-zinc-100">
           <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
              <div className="mb-12 lg:mb-12 space-y-3 lg:space-y-4">
                <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.4em] lg:tracking-[0.5em] text-[#ee6669] font-bold block mb-4">Focused Craftsmanship</span>
                <h2 className="text-3xl lg:text-5xl font-serif font-light text-[#222222]">Specialized Interior Solutions</h2>
              </div>

              <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar lg:mx-0 lg:block lg:space-y-16 lg:overflow-visible lg:px-0 lg:pb-0">
                {specializedSolutions.map((sol, idx) => (
                  <motion.div 
                    key={sol.title}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex min-w-[86%] snap-center flex-col items-center gap-6 rounded-3xl bg-white p-4 shadow-sm lg:min-w-0 lg:flex-row lg:gap-14 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className="w-full lg:w-1/2 relative aspect-[16/10] lg:aspect-[16/9] rounded-[1rem] lg:rounded-[3rem] overflow-hidden shadow-2xl bg-zinc-100">
                      <Image src={sol.image} alt={sol.title} fill className="object-cover" />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
                       <div className="space-y-3 lg:space-y-4">
                          <h3 className="text-2xl lg:text-5xl font-serif font-light text-[#222222]">{sol.title}</h3>
                          <p className="text-[#ee6669] text-lg lg:text-2xl font-serif italic">Starting at {sol.price}</p>
                          <p className="text-zinc-500 text-sm lg:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {sol.description}
                          </p>
                       </div>
                       <Button 
                         variant="link"
                         onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal', { detail: { package: sol.title } }))}
                         className="text-[#222222] group p-0 h-auto hover:no-underline"
                       >
                          <span className="uppercase tracking-[0.25em] lg:tracking-[0.3em] text-[9px] lg:text-[10px] font-bold mr-4 lg:mr-6">Request Detailed Brochure</span>
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-[#ee6669] group-hover:border-[#ee6669] group-hover:text-white transition-all duration-500">
                             <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                          </div>
                       </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Shop Section */}
        <ShopSection />

        {/* 4. WHY GROSPACE SECTION */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-12">
            <h2 className="text-3xl lg:text-5xl font-serif font-light text-center mb-16 lg:mb-14 text-[#222222] leading-tight">Why Homeowners Choose Grospace</h2>
            
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-12">
               {reasons.map((reason, idx) => (
                 <motion.div 
                   key={reason.title}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="min-w-[78%] snap-center space-y-6 rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-sm sm:min-w-0 sm:border-0 sm:bg-transparent sm:p-0 sm:px-4 sm:shadow-none lg:space-y-8"
                 >
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] lg:rounded-3xl bg-[#E5EEE4] border border-zinc-100 flex items-center justify-center mx-auto group hover:border-[#ee6669] transition-colors duration-500 shadow-sm">
                       <reason.icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#ee6669]" />
                    </div>
                    <div className="space-y-2 lg:space-y-4">
                      <h4 className="font-serif text-lg lg:text-xl font-light text-[#222222]">{reason.title}</h4>
                      <p className="text-xs lg:text-sm text-zinc-500 font-light leading-relaxed">{reason.text}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* 5. REAL PROJECT PREVIEW */}
        <section className="py-16 lg:py-24 bg-[#F6F4E8]">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-12 text-center">
            <div className="max-w-3xl mx-auto mb-16 lg:mb-14 space-y-6 lg:space-y-8">
              <h2 className="text-3xl lg:text-5xl font-serif font-light text-[#222222] leading-tight">From Concept to Reality</h2>
              <p className="text-zinc-500 text-sm lg:text-lg font-light leading-relaxed px-2">
                Experience the Grospace transformation. Our projects reflect the perfect harmony between architectural vision and functional design.
              </p>
            </div>

            <div className="-mx-5 mb-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:mb-14 lg:gap-8">
               <div className="group relative aspect-[4/5] min-w-[82%] snap-center overflow-hidden rounded-[1.5rem] bg-zinc-100 md:min-w-0 lg:rounded-[2rem]">
                  <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" alt="Project" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#222222]/40 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.4em] lg:tracking-[0.5em] border border-white/40 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-white backdrop-blur-sm lg:backdrop-blur-none">Contemporary Living</span>
                  </div>
               </div>
               <div className="group relative aspect-[4/5] min-w-[82%] snap-center overflow-hidden rounded-[1.5rem] bg-zinc-100 md:min-w-0 md:translate-y-12 lg:rounded-[2rem]">
                  <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800" alt="Project" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#222222]/40 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.4em] lg:tracking-[0.5em] border border-white/40 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-white backdrop-blur-sm lg:backdrop-blur-none">Modern Modular</span>
                  </div>
               </div>
               <div className="group relative aspect-[4/5] min-w-[82%] snap-center overflow-hidden rounded-[1.5rem] bg-zinc-100 md:min-w-0 lg:rounded-[2rem]">
                  <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" alt="Project" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#222222]/40 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.4em] lg:tracking-[0.5em] border border-white/40 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-white backdrop-blur-sm lg:backdrop-blur-none">Artisanal Details</span>
                  </div>
               </div>
            </div>

            <Button 
              asChild
              variant="outline"
              className="w-full sm:w-auto border-zinc-200 text-[#222222] hover:border-[#ee6669] hover:text-[#ee6669] h-14 lg:h-16 px-12 lg:px-16 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 mt-12 md:mt-0"
            >
              <Link href="/projects">View Full Portfolio <ChevronRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </section>

        {/* 6. FINAL CTA SECTION */}
        <section className="relative py-16 lg:py-24 overflow-hidden bg-[#222222]">
           <div className="absolute inset-0 bg-gradient-to-r from-[#ee6669]/20 to-transparent opacity-30" />
           
           <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-12 text-center space-y-10 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-tight">Ready to price your <br /><span className="text-[#ee6669] italic">home interiors?</span></h2>
                <p className="text-white/60 text-sm lg:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Get a personalized site visit and estimated budget for your home interiors.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 px-4">
                 <Button 
                   onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                   className="w-full sm:w-auto bg-[#ee6669] hover:bg-white hover:text-[#222222] text-white h-12 lg:h-14 px-10 lg:px-12 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] lg:tracking-[0.22em] transition-all duration-500 shadow-2xl shadow-[#ee6669]/20"
                 >
                   Book Free Site Visit
                 </Button>
                 <Button 
                   className="w-full sm:w-auto border border-white/20 bg-white/5 text-white hover:bg-[#25D366] hover:border-[#25D366] hover:text-white h-12 lg:h-14 px-10 lg:px-12 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] lg:tracking-[0.22em] transition-all duration-500 group"
                   onClick={() => window.open('https://wa.me/918319032087', '_blank')}
                 >
                   <MessageSquare className="w-5 h-5 mr-3 group-hover:animate-bounce" /> Chat on WhatsApp
                 </Button>
              </div>
           </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

