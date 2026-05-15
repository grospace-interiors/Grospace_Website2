'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function InspirationGallery() {
  const ideas = [
    {
      title: 'Living Room',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      title: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1616594831707-3c7d0d425f1c?q=80&w=800',
    },
    {
      title: 'False Ceiling',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800',
    },
    {
      title: 'Modular Kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15595b69581?q=80&w=800',
      span: 'lg:col-span-2',
    },
  ]

  return (
    <section className="w-full bg-[#fdfdfd] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#333]">
              Inspiration for home interior designs
            </h2>
            <p className="text-zinc-600">Give your home a new look with these interior design ideas curated for you</p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-2 text-[#ee6669] font-bold uppercase text-sm group">
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-auto lg:h-[700px]">
          {ideas.map((idea) => (
            <div 
              key={idea.title} 
              onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal-engagement'))}
              className={`relative overflow-hidden rounded-xl shadow-sm cursor-pointer group ${idea.span || ''}`}
            >
              <Image 
                src={idea.image} 
                alt={idea.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded text-xs font-medium uppercase tracking-wider">
                  {idea.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex md:hidden justify-center">
           <Link href="/projects" className="flex items-center gap-2 text-[#ee6669] font-bold uppercase text-sm">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
