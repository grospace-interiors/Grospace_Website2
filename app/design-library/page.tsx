'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Filter, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PURPLE = '#2d1b4e'
const PINK = '#ee6669'

const categories = [
  'All Designs',
  'Living Room',
  'Kitchen',
  'Bedroom',
  'Wardrobe',
  'False Ceiling',
  'TV Unit',
  '1BHK',
  '2BHK',
  'Luxury'
]

const galleryItems = [
  {
    id: 1,
    title: 'Modern Minimalist Living',
    description: 'Clean lines and warm oak textures for a spacious 2BHK living area.',
    category: 'Living Room',
    image: '/images/living%20room.jpg',
    tag: '2BHK'
  },
  {
    id: 2,
    title: 'Chef\'s Paradise Kitchen',
    description: 'High-gloss acrylic finish with smart pull-out storage solutions.',
    category: 'Kitchen',
    image: '/images/modular%20kitchen.jpg',
    tag: 'Luxury'
  },
  {
    id: 3,
    title: 'Serene Master Suite',
    description: 'Ambient lighting and upholstered headboard for ultimate relaxation.',
    category: 'Bedroom',
    image: '/images/bedroom.jpg',
    tag: 'Luxury'
  },
  {
    id: 4,
    title: 'Floating Gypsum Ceiling',
    description: 'Layered false ceiling with hidden COB strips for a dramatic effect.',
    category: 'False Ceiling',
    image: '/images/false%20ceiling.jpg',
    tag: 'Modern'
  },
  {
    id: 5,
    title: 'Smart Space 1BHK',
    description: 'Multipurpose furniture designed for compact smart living.',
    category: '1BHK',
    image: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
    tag: 'Compact'
  },
  {
    id: 6,
    title: 'Seamless Wardrobe',
    description: 'Floor-to-ceiling sliding wardrobe with tinted glass inserts.',
    category: 'Wardrobe',
    image: '/images/wardrobe.jpg',
    tag: 'Smart Storage'
  },
  {
    id: 7,
    title: 'Bespoke TV Console',
    description: 'Fluted paneling background with integrated wire management.',
    category: 'TV Unit',
    image: 'https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?q=80&w=800',
    tag: '2BHK'
  },
  {
    id: 8,
    title: 'Kids Creative Zone',
    description: 'Vibrant colors meet functional study spaces for the little ones.',
    category: 'Bedroom',
    image: '/images/kids%20room.jpg',
    tag: 'Kids Room'
  },
  {
    id: 9,
    title: 'Luxury Penthouse Lounge',
    description: 'Double-height ceiling with premium marble wall cladding.',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    tag: 'Signature'
  },
  {
    id: 10,
    title: 'Divine Mandir Corner',
    description: 'Traditional aesthetics blended with modern CNC cut patterns.',
    category: 'Living Room',
    image: '/images/mandir.jpg',
    tag: 'Traditional'
  }
]

export default function DesignLibraryPage() {
  const [activeCategory, setActiveCategory] = useState('All Designs')

  const filteredItems = activeCategory === 'All Designs' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory || item.tag === activeCategory)

  return (
    <>
      <Navigation />
      <main className="bg-white min-h-screen">
        
        {/* HERO SECTION */}
        <section className="relative py-24 lg:py-40 bg-[#fafafa] overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#ee6669]/10 px-4 py-1.5 rounded-full text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.3em]">
                <Sparkles className="w-3 h-3" /> The Design Library
              </div>
              <h1 className="text-5xl lg:text-8xl font-serif font-light text-[#2d1b4e] leading-[1.1] tracking-tight">
                Interior Design Inspiration <br />
                <span className="text-[#ee6669] italic">for Modern Homes</span>
              </h1>
              <p className="text-lg lg:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                Explore smart, elegant, and space-efficient interior ideas curated for every room in your home.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CATEGORY FILTERS */}
        <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-zinc-100 py-6">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
               <div className="flex items-center gap-2 pr-4 border-r border-zinc-100 shrink-0">
                  <Filter className="w-4 h-4 text-zinc-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Filter By</span>
               </div>
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={cn(
                     "whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                     activeCategory === cat 
                       ? "bg-[#2d1b4e] text-white shadow-lg shadow-[#2d1b4e]/20" 
                       : "bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-[#2d1b4e]"
                   )}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>
        </section>

        {/* IMAGE GRID */}
        <section className="py-20 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 bg-zinc-100 group-hover:shadow-2xl transition-all duration-700">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-6 right-6">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold text-[#2d1b4e] uppercase tracking-widest shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="px-4 space-y-2">
                       <h3 className="text-xl font-serif font-light text-[#2d1b4e] group-hover:text-[#ee6669] transition-colors">{item.title}</h3>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    {/* CTA BLOCK (Interspersed) */}
                    {index === 5 && (
                      <div className="col-span-full my-12">
                         <motion.div 
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           className="bg-[#2d1b4e] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden"
                         >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ee6669]/10 to-transparent opacity-30" />
                            <div className="relative z-10 space-y-8">
                               <div className="space-y-4">
                                  <h2 className="text-3xl lg:text-5xl font-serif font-light text-white italic">Inspired by these designs?</h2>
                                  <p className="text-white/60 text-lg font-light max-w-xl mx-auto">
                                    Let’s create a personalized version for your home that fits your unique lifestyle and budget.
                                  </p>
                               </div>
                               <Button 
                                 onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                                 className="bg-[#ee6669] hover:bg-white hover:text-[#2d1b4e] text-white h-16 px-12 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500"
                               >
                                 Book Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                               </Button>
                            </div>
                         </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* FINAL CALL TO ACTION */}
            <div className="mt-32 text-center space-y-12">
               <div className="w-px h-24 bg-zinc-200 mx-auto" />
               <div className="space-y-4">
                  <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Haven't found what you're <br /><span className="text-[#ee6669] italic">looking for?</span></h2>
                  <p className="text-zinc-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                    Our designers can help you visualize any concept. We specialize in bringing your Pinterest moodboards to life with practical engineering.
                  </p>
               </div>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                    className="bg-[#ee6669] hover:bg-[#2d1b4e] text-white h-16 px-12 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 shadow-xl shadow-[#ee6669]/20"
                  >
                    Schedule Design Session
                  </Button>
                  <Link href="/projects">
                    <Button 
                      variant="outline"
                      className="border-zinc-200 text-[#2d1b4e] hover:border-[#ee6669] hover:text-[#ee6669] h-16 px-12 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500"
                    >
                      Browse Portfolio
                    </Button>
                  </Link>
               </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
