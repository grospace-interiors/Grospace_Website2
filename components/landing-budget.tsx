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

  const fallbackBudgets = [
    {
      id: '1',
      title: '2BHK Interiors',
      subtitle: 'Starting from',
      price_text: '₹4.5 Lakh',
      description: 'Complete interiors planned for modern 2BHK homes.',
      features: ['Modular Kitchen', 'Wardrobes', 'TV Unit', 'Smart Storage'],
      footer_text: 'Ideal for compact family homes.',
      image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    },
    {
      id: '2',
      title: '3BHK Interiors',
      subtitle: 'Starting from',
      price_text: '₹6.5 Lakh',
      description: 'Full-home interiors for larger family spaces.',
      features: ['Modular Kitchen', 'Multiple Wardrobes', 'Living Room Unit', 'False Ceiling'],
      footer_text: 'Designed for spacious family living.',
      image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    },
    {
      id: '3',
      title: 'Modular Kitchens',
      subtitle: 'Starting from',
      price_text: '₹1.2 Lakh',
      description: 'Smart modular kitchens for daily comfort and storage.',
      features: ['Efficient Layouts', 'Premium Finishes', 'Smart Storage', 'Easy Maintenance'],
      footer_text: 'Built for practical cooking spaces.',
      image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800',
    },
    {
      id: '4',
      title: 'Wardrobes',
      subtitle: 'Starting from',
      price_text: '₹50,000',
      description: 'Space-saving wardrobes with practical internal storage.',
      features: ['Sliding Options', 'Hinged Options', 'Internal Storage', 'Modern Finishes'],
      footer_text: 'Designed for organized bedrooms.',
      image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800',
    },
  ] as any[]

  const preferredTitles = ['2BHK Interiors', '3BHK Interiors', 'Modular Kitchens', 'Wardrobe Designs', 'Wardrobes']
  const displayBudgets = (collections.length > 0 ? collections : fallbackBudgets)
    .filter((item) => preferredTitles.includes(item.title))
    .map((item) => {
      if (item.title === 'Wardrobe Designs') {
        return { 
          ...item, 
          title: 'Wardrobes'
        }
      }
      return item
    })
    .slice(0, 4)

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
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#ee6669] font-bold animate-pulse">Loading Collections...</div>
      </section>
    )
  }

  return (
    <section id="budget-plans" className="w-full bg-[#E5EEE4] py-16 md:py-24 overflow-hidden border-y border-zinc-100">
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
            <h2 className="text-3xl md:text-7xl font-serif font-light text-[#222222] leading-[1.1]">
              Homes for <br/><span className="italic">every lifestyle.</span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-zinc-500 sm:text-lg">
              Premium interior solutions curated for Bhopal homes. Transparent pricing meet exceptional design precision.
            </p>
          </motion.div>

          <Button
            onClick={() => document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' })}
            className="h-12 w-full rounded-full bg-[#ee6669] px-8 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-xl shadow-[#ee6669]/20 transition-all duration-500 hover:bg-[#222222] sm:h-16 sm:w-auto sm:px-12 sm:text-[10px] sm:tracking-[0.25em]"
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
