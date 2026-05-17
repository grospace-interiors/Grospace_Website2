'use client'

import { supabase } from '@/lib/supabase'
import { Package } from '@/lib/types'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

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

  // Fallback data if DB is empty or not yet set up
  const displayPackages = packages.length > 0 ? packages : [
    {
      id: '1',
      name: 'Essential Bundle of 4',
      description: 'Perfect for a 1BHK or specific room renovation. Includes core modular elements.',
      price: 149000,
      image_url: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
      items: ['Modular Kitchen (L-Shape)', 'Master Bedroom Wardrobe', 'TV Unit', 'Basic False Ceiling'],
    },
    {
      id: '2',
      name: 'Premium Bundle of 6',
      description: 'Our most popular choice for 2BHK homes. Comprehensive design and execution.',
      price: 289000,
      image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
      items: ['Modular Kitchen (U-Shape)', 'Master Bedroom Wardrobe', 'Kids Room Wardrobe', 'Living Room TV Unit', 'Premium False Ceiling', 'Shoe Rack & Foyer Unit'],
    }
  ]

  if (loading) {
    return <section className="w-full bg-white py-24 md:py-32 text-[#2d1b4e]"><div className="text-center">Loading...</div></section>
  }

  return (
    <section id="shop" className="w-full bg-white py-24 md:py-32 text-[#2d1b4e]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#ee6669] font-medium mb-4">
              Curated Solutions
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#2d1b4e] text-balance">
              Interior Bundles
            </h2>
            <p className="text-lg text-zinc-600 mt-6 max-w-2xl leading-relaxed">
              Premium-finish interior packages designed for modern families in Bhopal. Fixed pricing, no hidden costs.
            </p>
            <div className="mt-6 w-16 h-0.5 bg-[#ee6669]" />
          </div>
          
          <div className="shrink-0">
             <Button variant="outline" className="border-zinc-200 hover:border-[#ee6669] hover:bg-[#ee6669] text-[#2d1b4e] hover:text-white rounded-full px-8 h-14 uppercase tracking-widest text-[10px] font-bold transition-all">
                View All Bundles
             </Button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {displayPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white border border-zinc-100 hover:border-[#ee6669]/20 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col rounded-xl"
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                  src={pkg.image_url}
                  alt={pkg.name || "Interior Bundle"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />

                {/* Price Tag */}
                <div className="absolute bottom-6 left-6 bg-[#ee6669] px-4 py-2 text-white shadow-lg">
                  <p className="text-xs uppercase tracking-widest font-bold">Starting at</p>
                  <p className="text-xl font-serif">₹{(pkg.price / 100000).toFixed(2)}L*</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-serif font-light mb-4 group-hover:text-[#ee6669] transition-colors">  
                  {pkg.name}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                  {pkg.description}
                </p>

                {/* Items List */}
                <div className="space-y-4 mb-10 flex-grow">
                  {pkg.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ee6669]/40" />
                      <span className="text-sm text-zinc-600 font-light">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                  className="w-full bg-transparent border border-zinc-200 hover:border-[#ee6669] hover:bg-[#ee6669] hover:text-white text-[#2d1b4e] py-6 rounded-lg transition-all duration-300 group/btn"
                >
                  <span className="uppercase tracking-widest text-xs font-bold mr-2">Shop This Bundle</span>       
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-12 text-center text-xs text-zinc-400 italic">
          *Prices are indicative and subject to change based on specific materials and site conditions. GST extra as applicable.
        </p>
      </div>
    </section>
  )
}
