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

const PURPLE = '#2d1b4e'
const PINK = '#ee6669'

const homePackages = [
  {
    id: '1bhk',
    name: '1BHK Interiors',
    tagline: 'Compact Smart Living',
    price: '₹2.15 Lakhs',
    description: 'Designed for compact homes with practical and space-efficient interiors.',
    features: ['Modular Kitchen', 'Smart Storage', 'Functional Wardrobes', 'Minimal Modern Layout'],
    cta: 'Get Estimate',
    image: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800'
  },
  {
    id: '2bhk',
    name: '2BHK Interiors',
    tagline: 'Complete 2BHK Interiors',
    price: '₹3.10 Lakhs',
    description: 'Balanced interiors designed for comfort, functionality, and modern living.',
    features: ['Modular Kitchen', '2 Wardrobes', 'TV Unit', 'False Ceiling Options'],
    cta: 'Book Site Visit',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800'
  },
  {
    id: '3bhk',
    name: '3BHK Interiors',
    tagline: 'Premium Family Interiors',
    price: '₹4.23 Lakhs',
    description: 'Spacious and premium interior solutions with enhanced functionality and aesthetics.',
    features: ['Full Modular Solutions', 'Multiple Wardrobes', 'Living Area Enhancement', 'Smart Space Planning'],
    cta: 'Talk to Designer',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800'
  },
  {
    id: '4bhk',
    name: '4BHK+ Interiors',
    tagline: 'Signature Luxury Interiors',
    price: '₹6.5 Lakhs',
    description: 'Customized interior experiences crafted for large homes and luxury spaces.',
    features: ['Bespoke Interior Concepts', 'Premium Finishes', 'Designer Ceiling Concepts', 'Personalized Planning'],
    cta: 'Schedule Consultation',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'
  }
]

const specializedSolutions = [
  {
    title: 'Modular Kitchens',
    price: '₹1.25 Lakhs',
    description: 'Modern kitchens built for smart storage and seamless functionality. Precision-engineered for daily high-traffic use.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800'
  },
  {
    title: 'Modern Wardrobes',
    price: '₹65,000',
    description: 'Elegant storage solutions designed for organization and aesthetics. Available in sliding and hinged premium finishes.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800'
  },
  {
    title: 'False Ceilings',
    price: '₹85/sq.ft',
    description: 'Modern ceiling concepts with integrated ambient lighting and premium gypsum finishes for a complete look.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800'
  }
]

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
  return (
    <>
      <Navigation />
      <main className="bg-white text-[#2d1b4e] overflow-hidden">
        
        {/* 1. HERO SECTION */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white">
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600"
            alt="Premium Interior Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#ee6669] font-bold mb-6 block">
                Exclusive Studio Collections
              </span>
              <h1 className="text-5xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight mb-8 text-[#2d1b4e]">
                Interior Packages Designed <br />
                <span className="text-[#ee6669] italic">Around Your Home</span>
              </h1>
              <p className="text-lg lg:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                Smart, modern, and space-efficient interior solutions for 1BHK to luxury homes in Bhopal.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                className="bg-[#ee6669] hover:bg-[#2d1b4e] text-white h-16 px-12 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 shadow-xl shadow-[#ee6669]/20"
              >
                Book Free Site Visit
              </Button>
              <Button 
                variant="outline"
                onClick={() => document.getElementById('home-packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-zinc-200 text-[#2d1b4e] hover:border-[#ee6669] hover:text-[#ee6669] h-16 px-12 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500"
              >
                View Packages
              </Button>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ee6669]/30 to-transparent" />
        </section>

        {/* 2. HOME TYPE PACKAGE SECTION */}
        <section id="home-packages" className="py-32 lg:py-48 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Choose Your Home Interior Package</h2>
              <p className="text-zinc-500 text-lg font-light tracking-wide italic">Tailored solutions based on your home size, lifestyle, and budget.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {homePackages.map((pkg, idx) => (
                <motion.div 
                  key={pkg.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group relative flex flex-col bg-[#fafafa] rounded-[2.5rem] p-10 transition-all duration-500 border ${pkg.isPopular ? 'border-[#ee6669]/30 ring-1 ring-[#ee6669]/10' : 'border-zinc-100 hover:border-[#ee6669]/20'} hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ee6669] text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xl">
                      🔥 Most Popular
                    </div>
                  )}

                  <div className="mb-10 relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/20 to-transparent" />
                  </div>

                  <div className="flex-grow space-y-6">
                    <div>
                      <h3 className="text-2xl font-serif font-light mb-1 text-[#2d1b4e]">{pkg.name}</h3>
                      <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-widest">{pkg.tagline}</p>
                    </div>

                    <div className="space-y-2">
                       <p className="text-3xl font-serif text-[#2d1b4e] tracking-tighter">
                         <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase tracking-widest mr-2">Starting</span>
                         {pkg.price}
                       </p>
                       <p className="text-xs text-zinc-500 font-light leading-relaxed">{pkg.description}</p>
                    </div>

                    <ul className="space-y-4 pt-6 border-t border-zinc-100">
                      {pkg.features.map(f => (
                        <li key={f} className="flex items-center gap-3">
                          <Check className="w-3 h-3 text-[#ee6669]" />
                          <span className="text-[11px] text-zinc-600 font-light">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-10">
                    <Button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal', { detail: { package: pkg.name } }))}
                      className={`w-full h-14 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] transition-all duration-500 ${pkg.isPopular ? 'bg-[#ee6669] hover:bg-[#2d1b4e] text-white' : 'bg-white border border-zinc-200 hover:border-[#ee6669] hover:text-[#ee6669] text-[#2d1b4e]'}`}
                    >
                      {pkg.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SPECIALIZED SOLUTIONS SECTION */}
        <section className="py-32 lg:py-48 bg-[#fafafa] border-y border-zinc-100">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="mb-24 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#ee6669] font-bold block mb-4">Focused Craftsmanship</span>
                <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Specialized Interior Solutions</h2>
              </div>

              <div className="space-y-12">
                {specializedSolutions.map((sol, idx) => (
                  <motion.div 
                    key={sol.title}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className="w-full lg:w-1/2 relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                      <Image src={sol.image} alt={sol.title} fill className="object-cover" />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                       <div className="space-y-4">
                          <h3 className="text-3xl lg:text-5xl font-serif font-light text-[#2d1b4e]">{sol.title}</h3>
                          <p className="text-[#ee6669] text-xl font-serif italic">Starting at {sol.price}</p>
                          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-lg">
                            {sol.description}
                          </p>
                       </div>
                       <Button 
                         variant="link"
                         onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal', { detail: { package: sol.title } }))}
                         className="text-[#2d1b4e] group p-0 hover:no-underline"
                       >
                          <span className="uppercase tracking-[0.3em] text-[10px] font-bold mr-6">Request Detailed Brochure</span>
                          <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-[#ee6669] group-hover:border-[#ee6669] group-hover:text-white transition-all duration-500">
                             <ArrowRight className="w-5 h-5" />
                          </div>
                       </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Shop Section (Replacing Landing Budget) */}
        <ShopSection />

        {/* 4. WHY GROSPACE SECTION */}
        <section className="py-32 lg:py-48 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="text-4xl lg:text-6xl font-serif font-light text-center mb-32 text-[#2d1b4e]">Why Homeowners Choose Grospace</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
               {reasons.map((reason, idx) => (
                 <motion.div 
                   key={reason.title}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="space-y-8 text-center"
                 >
                    <div className="w-20 h-20 rounded-3xl bg-[#fafafa] border border-zinc-100 flex items-center justify-center mx-auto group hover:border-[#ee6669] transition-colors duration-500">
                       <reason.icon className="w-8 h-8 text-[#ee6669]" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-serif text-xl font-light text-[#2d1b4e]">{reason.title}</h4>
                      <p className="text-sm text-zinc-500 font-light leading-relaxed px-4">{reason.text}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* 5. REAL PROJECT PREVIEW */}
        <section className="py-32 lg:py-48 bg-[#fdfdfd]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
            <div className="max-w-3xl mx-auto mb-24 space-y-8">
              <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">From Concept to Reality</h2>
              <p className="text-zinc-500 text-lg font-light leading-relaxed">
                Experience the Grospace transformation. Our projects reflect the perfect harmony between architectural vision and functional design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
               <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" alt="Project" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#2d1b4e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.5em] border border-white/40 px-6 py-3 rounded-full text-white">Contemporary Living</span>
                  </div>
               </div>
               <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group md:translate-y-12">
                  <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800" alt="Project" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#2d1b4e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.5em] border border-white/40 px-6 py-3 rounded-full text-white">Modern Modular</span>
                  </div>
               </div>
               <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group">
                  <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" alt="Project" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#2d1b4e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                     <span className="text-[10px] font-bold uppercase tracking-[0.5em] border border-white/40 px-6 py-3 rounded-full text-white">Artisanal Details</span>
                  </div>
               </div>
            </div>

            <Button 
              asChild
              variant="outline"
              className="border-zinc-200 text-[#2d1b4e] hover:border-[#ee6669] hover:text-[#ee6669] h-16 px-16 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500"
            >
              <Link href="/projects">View Full Portfolio <ChevronRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </section>

        {/* 6. FINAL CTA SECTION */}
        <section className="relative py-32 lg:py-48 overflow-hidden bg-[#2d1b4e]">
           <div className="absolute inset-0 bg-gradient-to-r from-[#ee6669]/20 to-transparent opacity-30" />
           
           <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-8xl font-serif font-light text-white">Let's Design Your <span className="text-[#ee6669] italic">Dream Space</span></h2>
                <p className="text-white/60 text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Get a personalized consultation and estimated budget for your home interiors.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Button 
                   onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                   className="bg-[#ee6669] hover:bg-white hover:text-[#2d1b4e] text-white h-18 px-16 py-8 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 shadow-2xl shadow-[#ee6669]/20"
                 >
                   Book Free Site Visit
                 </Button>
                 <Button 
                   variant="outline"
                   className="border-white/20 text-white hover:border-[#25D366] hover:text-[#25D366] h-18 px-16 py-8 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-500 group"
                   onClick={() => window.open('https://wa.me/919876543210', '_blank')}
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

