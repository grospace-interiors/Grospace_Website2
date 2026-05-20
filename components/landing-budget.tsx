'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LandingBudgetCollection } from '@/lib/types'

async function getCollections() {
  try {
    const { data, error } = await supabase
      .from('landing_budget_collections')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching collections:', error)
      return []
    }
    return data as LandingBudgetCollection[]
  } catch (err) {
    console.error('Unexpected error fetching collections:', err)
    return []
  }
}

export function LandingBudget() {
  const [collections, setCollections] = useState<LandingBudgetCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getCollections()
      setCollections(data)
      setLoading(false)
    }
    load()
  }, [])

  const displayBudgets = collections.length > 0 ? collections : [
    {
      id: '1',
      title: '1BHK Interiors',
      subtitle: 'Compact Smart Living',
      price_text: '₹2.15L',
      description: 'Designed for compact homes with practical and space-efficient interiors.',
      features: ['Modular Kitchen', 'Smart Wardrobe Solutions', 'Functional Storage', 'Minimal Modern Design'],
      footer_text: 'Ideal for first-time homeowners and compact apartments.',
      image_url: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
    },
    {
      id: '2',
      title: '2BHK Interiors',
      subtitle: 'Complete 2BHK Interiors',
      price_text: '₹3.10L',
      description: 'Balanced interiors designed for comfort, functionality, and modern living.',
      features: ['Modular Kitchen', '2 Wardrobes', 'TV Unit & Storage', 'False Ceiling Options'],
      footer_text: 'Perfect for modern families and growing homes.',
      image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    },
    {
      id: '3',
      title: '3BHK Interiors',
      subtitle: 'Premium Family Interiors',
      price_text: '₹4.23L',
      description: 'Spacious and premium interior solutions with enhanced functionality and aesthetics.',
      features: ['Complete Modular Solutions', 'Multiple Wardrobes', 'Living Room Enhancements', 'Smart Space Planning'],
      footer_text: 'Designed for elegant and spacious family living.',
      image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    },
    {
      id: '4',
      title: '4BHK & Luxury',
      subtitle: 'Signature Luxury Interiors',
      price_text: '₹6.5L',
      description: 'Customized interior experiences crafted for large homes and luxury spaces.',
      features: ['Bespoke Interior Concepts', 'Premium Material Finishes', 'Designer Ceiling Concepts', 'Personalized Space Planning'],
      footer_text: 'Tailored for villas, luxury apartments, and premium residences.',
      image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    },
    {
      id: '5',
      title: 'Modular Kitchens',
      subtitle: 'Smart Modular Kitchens',
      price_text: '₹1.25L',
      description: 'Modern kitchens designed for functionality, storage, and seamless daily use.',
      features: ['Space-Efficient Layouts', 'Premium Finishes', 'Smart Storage Systems', 'Easy Maintenance Solutions'],
      footer_text: 'Modern kitchens designed for functionality and storage.',
      image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800',
    },
    {
      id: '6',
      title: 'Wardrobe Designs',
      subtitle: 'Modern Wardrobe Solutions',
      price_text: '₹65,000',
      description: 'Elegant wardrobe designs focused on organization and modern aesthetics.',
      features: ['Sliding & Hinged Options', 'Smart Internal Storage', 'Space-Saving Concepts', 'Contemporary Finishes'],
      footer_text: 'Elegant wardrobe designs focused on organization.',
      image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800',
    },
    {
      id: '7',
      title: 'False Ceiling Designs',
      subtitle: 'Modern Ceiling Concepts',
      price_text: '₹85/sq.ft',
      description: 'Enhance ambiance and lighting with elegant ceiling solutions.',
      features: ['Ambient Lighting Integration', 'Clean Modern Patterns', 'Custom Ceiling Layouts', 'Premium Finishing Touches'],
      footer_text: 'Enhance ambiance and lighting with elegant solutions.',
      image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
    },
  ] as any[]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  if (loading) {
    return (
      <section className="w-full bg-[#E5EEE4] py-16 md:py-24 flex items-center justify-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-bold animate-pulse">Loading Collections...</div>
      </section>
    )
  }

  return (
    <section className="w-full bg-[#E5EEE4] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header Area */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-24 md:flex-row md:items-end md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-4 md:space-y-6"
          >
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#ee6669] sm:text-[10px] sm:tracking-[0.4em]">Tailored Investment</span>
            <h2 className="text-3xl md:text-7xl font-serif font-light text-zinc-900 leading-[1.1]">
              Homes for <br/><span className="text-[#ee6669] italic">every lifestyle.</span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-zinc-500 sm:text-lg">
              Premium interior solutions curated for Bhopal homes. Transparent pricing meet exceptional design precision.
            </p>
          </motion.div>
          
          <Button 
            onClick={() => document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-12 w-full rounded-full bg-[#222222] px-8 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-xl shadow-zinc-200 transition-all duration-500 hover:bg-[#ee6669] sm:h-16 sm:w-auto sm:px-12 sm:text-[10px] sm:tracking-[0.25em]"
          >
            Request Full Price List <ArrowRight className="w-4 h-4 ml-3" />
          </Button>
        </div>

        {/* Grid Area */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4"
        >
          {displayBudgets.map((item, idx) => (
            <motion.div 
              key={item.id || idx} 
              variants={itemVariants}
              className="group relative flex min-w-[84%] snap-center flex-col overflow-hidden rounded-[2rem] border border-zinc-100 bg-white transition-all duration-700 hover:border-[#ee6669]/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] md:min-w-0"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={item.image_url} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Price Overlay */}
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[8px] uppercase tracking-[0.2em] font-medium opacity-70 mb-1">Starting From</p>
                  <p className="text-xl font-serif">{item.price_text}</p>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-serif font-light text-zinc-900 mb-1 group-hover:text-[#ee6669] transition-colors">{item.title}</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.subtitle}</p>
                </div>

                <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {item.features?.map((feature: string, fidx: number) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#ee6669]/40" />
                      <span className="text-[11px] text-zinc-600 font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Tagline */}
                <div className="mt-auto pt-6 border-t border-zinc-50">
                  <p className="text-[9px] text-[#ee6669] font-medium italic opacity-80">
                    {item.footer_text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Custom Requirement Card */}
          <motion.div 
            variants={itemVariants}
            className="group relative flex min-w-[84%] snap-center flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] bg-[#222222] p-8 text-center md:min-w-0 md:p-10"
          >
             <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <ArrowRight className="w-6 h-6 text-[#ee6669]" />
             </div>
             <h3 className="text-2xl font-serif font-light text-white leading-tight">Have Custom <br/>Requirements?</h3>
             <p className="text-zinc-400 text-xs font-light leading-relaxed">
               Our designers can build a bespoke plan tailored perfectly to your unique floor plan and material preferences.
             </p>
             <Button className="w-full bg-[#ee6669] hover:bg-white hover:text-[#222222] h-14 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all">
                Discuss Your Project
             </Button>
          </motion.div>
        </motion.div>

        {/* Note */}
        <div className="mt-20 flex flex-col items-center gap-4">
           <div className="h-px w-24 bg-zinc-200" />
           <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em]">
             *Indicative pricing. Taxes, material upgrades and custom additions extra.
           </p>
        </div>
      </div>
    </section>
  )
}
