'use client'

import { supabase } from '@/lib/supabase'
import { Package } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calculator, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getPackages()
      setPackages(data)
      setLoading(false)
    }
    load()
  }, [])

  const handleViewDetails = (pkg: any) => {
    setSelectedPackage(pkg)
    setIsDialogOpen(true)
  }

  const displayPackages = packages.length > 0 ? packages : [
    {
      id: '1',
      name: 'Essential Bundle of 4',
      description: 'A thoughtful curation of fundamental interior elements designed for efficiency and modern aesthetics.',
      price: 149000,
      image_url: '/images/shop/esential.webp',
      items: ['Modular Kitchen', 'Master Wardrobe', 'TV Unit', 'Basic False Ceiling'],
    },
    {
      id: '2',
      name: 'Premium Bundle of 6',
      description: 'Elevated space planning meeting sophisticated finishes for a balanced contemporary lifestyle.',
      price: 289000,
      image_url: '/images/shop/smart.webp',
      items: ['Modular Kitchen', '2 Wardrobes', 'TV Unit', 'Study Nook', 'Premium False Ceiling', 'Shoe Rack'],
      badge: 'CURATED FAVORITE',
    },
    {
      id: '3',
      name: 'Signature Series',
      description: 'Our most comprehensive interior solution, featuring artisanal details and complete home transformation.',
      price: 500000,
      image_url: '/images/shop/signature.webp',
      items: ['Full Home Interior', 'Premium Kitchen', 'Master Wardrobe', 'False Ceiling'],
    }
  ]

  if (loading) {
    return <section className="w-full bg-white py-24 md:py-24 text-[#222222]"><div className="text-center font-light tracking-widest uppercase text-xs opacity-50">Discovering Collections...</div></section>
  }

  return (
    <section id="collections" className="relative w-full overflow-hidden bg-[#E5EEE4] py-16 text-[#222222] md:py-24">
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
            <h2 className="mb-5 text-3xl font-serif font-light leading-[1.1] text-[#222222] sm:text-4xl md:mb-8 md:text-5xl">
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
             <Button asChild variant="link" className="group h-auto p-0 text-[#222222] hover:no-underline">
              <Link href="/packages">
                <span className="mr-3 text-[9px] font-bold uppercase tracking-[0.14em] sm:mr-4 sm:text-[10px] sm:tracking-[0.2em]">View All Solutions</span>
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-[#222222] group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                
                {pkg.badge && (
                  <div className="absolute top-6 left-6 z-20">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#222222] border-none px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[0.15em] shadow-sm">
                      {pkg.badge}
                    </Badge>
                  </div>
                )}

                {/* Refined Price Tag - Bottom Left */}
                <div className="absolute bottom-4 left-4 z-10 text-white sm:bottom-6 sm:left-6 bg-[#ee6669] px-3 py-1.5 rounded-lg shadow-md">
                  <p className="text-[7px] lg:text-[8px] uppercase tracking-[0.15em] font-bold opacity-90 mb-0">Starting From</p>
                  <p className="text-base lg:text-xl font-serif font-medium leading-none">₹{(pkg.price / 100000).toFixed(1)}L</p>
                </div>
              </div>

              {/* Content Detail */}
              <div className="flex flex-grow flex-col p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="mb-4">
                  <h3 className="mb-3 text-xl font-serif font-light text-[#222222] sm:text-2xl">  
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
                    onClick={() => handleViewDetails(pkg)}
                    variant="default"
                    className="h-12 w-full rounded-full bg-[#222222] text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#222222]/10 transition-all duration-500 hover:bg-[#ee6669] sm:h-14 sm:text-[10px] sm:tracking-[0.15em] xl:flex-1"
                  >
                    View Details
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="h-auto min-h-12 w-full py-2 rounded-full border-zinc-200 text-[9px] font-bold uppercase tracking-tight transition-all duration-500 hover:border-[#ee6669] hover:text-[#ee6669] sm:min-h-14 sm:text-[10px] sm:tracking-normal xl:flex-1 whitespace-normal leading-tight px-4"
                  >
                    <Link href="/pc">Calculate Your Estimate</Link>
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

      {/* Dialog for showing package details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[1000px] h-[90vh] sm:h-[85vh] flex flex-col p-0 overflow-hidden !grid-cols-none !grid-rows-none rounded-[3.5rem] border-none shadow-2xl">
          <div className="p-8 lg:p-12 border-b bg-white z-10 flex-shrink-0 flex justify-between items-end">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em]">Interior Package</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                 <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em]">Curated Solutions</span>
              </div>
              <DialogTitle className="text-3xl lg:text-5xl font-serif font-light text-[#222222]">{selectedPackage?.name}</DialogTitle>
            </div>
            <div className="hidden lg:flex flex-col items-end space-y-2 text-right">
                <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-widest">Starting From</p>
                <p className="text-3xl font-serif text-[#222222]">₹{(selectedPackage?.price / 100000).toFixed(1)}L</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y bg-white p-8 lg:p-12" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="grid lg:grid-cols-12 gap-16">
               <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-6">
                     <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.4em]">Overview</p>
                     <p className="text-lg text-zinc-500 font-light leading-relaxed">{selectedPackage?.description}</p>
                  </div>

                  <div className="space-y-8 p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                     <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 pb-4">What's Included</p>
                     <div className="space-y-4">
                        {(selectedPackage?.features?.items || selectedPackage?.items || []).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                             <div className="mt-1 flex-shrink-0">
                               <Check className="w-4 h-4 text-[#ee6669]" />
                             </div>
                             <span className="text-sm font-medium text-[#222222]">{item}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="pt-8 space-y-4">
                     <Button 
                       onClick={() => {
                         setIsDialogOpen(false)
                         window.dispatchEvent(new CustomEvent('open-lead-modal', { 
                           detail: { package: selectedPackage?.name } 
                         }))
                       }}
                       className="h-14 w-full rounded-2xl bg-[#ee6669] text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-[#ee6669]/20 transition-all hover:bg-[#222222]"
                     >
                        ENQUIRE ABOUT THIS PACKAGE
                     </Button>
                     <Button variant="outline" asChild className="h-14 w-full rounded-2xl border-zinc-200 text-[10px] font-bold uppercase tracking-[0.16em] text-[#222222] hover:bg-zinc-50">
                        <Link href="/pc">CALCULATE CUSTOM ESTIMATE</Link>
                     </Button>
                  </div>
               </div>

               <div className="lg:col-span-7">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] shadow-xl">
                    <Image
                      src={selectedPackage?.image_url}
                      alt={selectedPackage?.name || 'Package image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Warranty</p>
                      <p className="text-sm font-bold text-[#222222]">10 Year Warranty</p>
                    </div>
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Timeline</p>
                      <p className="text-sm font-bold text-[#222222]">45-60 Days Delivery</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee6669]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#222222]/5 rounded-full blur-[140px] -z-10 -translate-x-1/2 translate-y-1/2" />
    </section>
  )
}

