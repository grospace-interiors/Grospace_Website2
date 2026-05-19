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
    <section id="collections" className="w-full bg-[#fafafa] py-24 md:py-36 text-[#2d1b4e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#ee6669] font-bold mb-6 block">
              Curated Solutions
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[#2d1b4e] leading-[1.1] mb-8">
              Interior Collections for <br />
              <span className="italic">Modern Living</span>
            </h2>
            <p className="text-lg text-zinc-500 font-light max-w-xl leading-relaxed">
              Thoughtfully designed setups that blend architectural precision with lived-in comfort. Each collection is a complete narrative for your home.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
             <Button variant="link" className="text-[#2d1b4e] group p-0 h-auto hover:no-underline">
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold mr-4">View All Solutions</span>
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-[#2d1b4e] group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
             </Button>
          </motion.div>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {displayPackages.map((pkg: any, index: number) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              {/* Image Showcase */}
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
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
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-80 mb-1">Starting From</p>
                  <p className="text-2xl font-serif">₹{(pkg.price / 100000).toFixed(1)}L</p>
                </div>
              </div>

              {/* Content Detail */}
              <div className="p-8 flex flex-col flex-grow pt-0">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-light mb-3 text-[#2d1b4e]">  
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
                    className="w-full xl:flex-1 bg-[#2d1b4e] text-white hover:bg-[#ee6669] h-14 rounded-full transition-all duration-500 text-[10px] uppercase tracking-[0.15em] font-bold shadow-lg shadow-[#2d1b4e]/10"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal', { detail: { package: pkg.name, type: 'estimate' } }))}
                    className="w-full xl:flex-1 h-14 rounded-full border-zinc-200 hover:border-[#ee6669] hover:text-[#ee6669] transition-all duration-500 text-[10px] uppercase tracking-[0.15em] font-bold"
                  >
                    Estimate Budget
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
          className="mt-20 text-center text-[10px] tracking-[0.1em] text-zinc-400 uppercase font-medium"
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

