'use client'

import { supabase } from '@/lib/supabase'
import { Package } from '@/lib/types'
import Image from 'next/image'
import { ArrowRight, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

async function getPackages() {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error) {
      console.error('Error fetching packages:', error)
      return []
    }
    return data as Package[]
  } catch (err) {
    console.error('Unexpected error fetching packages:', err)
    return []
  }
}

export function ShopSection() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getPackages()
      setPackages(data)
      setLoading(false)
    }
    load()
  }, [])

  const displayPackages = packages.length > 0 ? packages : [
    {
      id: '1',
      name: 'The Essential Collection',
      description: 'A thoughtful curation of fundamental interior elements designed for efficiency and modern aesthetics.',
      price: 250000,
      image_url: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
      items: ['Modular Kitchen', '1 Wardrobe', 'Basic Storage', 'Living Unit'],
    },
    {
      id: '2',
      name: 'The Smart Living Suite',
      description: 'Elevated space planning meeting sophisticated finishes for a balanced contemporary lifestyle.',
      price: 350000,
      image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
      items: ['Modular Kitchen', '2 Wardrobes', 'TV Unit', 'Study Nook'],
      badge: 'CURATED FAVORITE',
    },
    {
      id: '3',
      name: 'The Signature Series',
      description: 'Our most comprehensive interior solution, featuring artisanal details and complete home transformation.',
      price: 500000,
      image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
      items: ['Full Home Interior', 'Premium Kitchen', 'Master Wardrobe', 'False Ceiling'],
    }
  ]

  if (loading) {
    return <section className="w-full bg-white py-24 md:py-32 text-[#2d1b4e]"><div className="text-center font-light tracking-widest uppercase text-xs opacity-50">Discovering Collections...</div></section>
  }

  return (
    <section id="collections" className="relative w-full overflow-hidden bg-[#fafafa] py-16 text-[#2d1b4e] md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-12">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end md:gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="mb-4 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#ee6669] sm:mb-6 sm:text-[10px] sm:tracking-[0.3em]">
              Curated Solutions
            </span>
            <h2 className="mb-5 text-3xl font-serif font-light leading-[1.1] text-[#2d1b4e] sm:text-4xl md:mb-8 md:text-5xl">
              Interior Collections for <br />
              <span className="italic">Modern Living</span>
            </h2>
            <p className="max-w-xl text-sm font-light leading-relaxed text-zinc-500 sm:text-lg">
              Thoughtfully designed setups that blend architectural precision with lived-in comfort. Each collection is a complete narrative for your home.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <Button variant="link" className="group h-auto p-0 text-[#2d1b4e] hover:no-underline">
                <span className="mr-3 text-[9px] font-bold uppercase tracking-[0.14em] sm:mr-4 sm:text-[10px] sm:tracking-[0.2em]">View All Solutions</span>
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-[#2d1b4e] group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
             </Button>
          </motion.div>
        </div>

        {/* Collections Grid */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-8">
          {displayPackages.map((pkg: any, index: number) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex min-w-[86%] snap-center flex-col md:min-w-0"
            >
              {/* Image Showcase */}
              <div className="relative mb-5 aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-700 group-hover:shadow-2xl sm:mb-8">
                <Image
                  src={pkg.image_url}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                
                {pkg.badge && (
                  <div className="absolute top-6 left-6 z-20">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#2d1b4e] border-none px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.15em] shadow-sm">
                      {pkg.badge}
                    </Badge>
                  </div>
                )}

                {/* Refined Price Tag - Bottom Left */}
                <div className="absolute bottom-5 left-5 z-10 text-white sm:bottom-8 sm:left-8">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-80 mb-1">Starting From</p>
                  <p className="text-2xl font-serif">₹{(pkg.price / 100000).toFixed(1)}L</p>
                </div>
              </div>

              {/* Content Detail */}
              <div className="flex flex-grow flex-col p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="mb-4">
                  <h3 className="mb-3 text-xl font-serif font-light text-[#2d1b4e] sm:text-2xl">  
                    {pkg.name}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light line-clamp-2">
                    {pkg.description}
                  </p>
                </div>

                {/* Space Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {(pkg.features as any)?.items ? (pkg.features as any).items.map((item: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="border-zinc-200 text-zinc-500 font-light text-[10px] px-3 py-1 rounded-full bg-white/50">
                      {item}
                    </Badge>
                  )) : pkg.items?.map((item: any, idx: any) => (
                    <Badge key={idx} variant="outline" className="border-zinc-200 text-zinc-500 font-light text-[10px] px-3 py-1 rounded-full bg-white/50">
                      {item}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col xl:flex-row items-center gap-3 mt-auto">
                  <Button 
                    variant="default"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal', { detail: { package: pkg.name } }))}
                    className="h-12 w-full rounded-full bg-[#2d1b4e] text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#2d1b4e]/10 transition-all duration-500 hover:bg-[#ee6669] sm:h-14 sm:text-[10px] sm:tracking-[0.15em] xl:flex-1"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-estimate-modal', { detail: { package: pkg.name } }))}
                    className="h-auto min-h-12 w-full py-2 rounded-full border-zinc-200 text-[9px] font-bold uppercase tracking-tight transition-all duration-500 hover:border-[#ee6669] hover:text-[#ee6669] sm:min-h-14 sm:text-[10px] sm:tracking-normal xl:flex-1 whitespace-normal leading-tight px-4"
                  >
                    Calculate Your Estimate
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 text-center text-[10px] tracking-[0.1em] text-zinc-400 uppercase font-medium"
        >
          *Indicative pricing based on standard floor plans. Final quote subject to site measurements.
        </motion.p>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee6669]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2d1b4e]/5 rounded-full blur-[140px] -z-10 -translate-x-1/2 translate-y-1/2" />
    </section>
  )
}

