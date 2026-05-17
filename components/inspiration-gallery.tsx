'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function InspirationGallery() {
  const ideas = [
    {
      title: 'Living Room',
      image: '/images/living%20room.jpg',
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      title: 'Kids Room',
      image: '/images/kids%20room.jpg',
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      title: 'Mandir Design',
      image: '/images/mandir.jpg',
      span: 'lg:col-span-1 lg:row-span-2',
    },
    {
      title: 'Master Bedroom',
      image: '/images/bedroom.jpg',
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      title: 'Modular Kitchen',
      image: '/images/modular%20kitchen.jpg',
      span: 'lg:col-span-2 lg:row-span-1',
    },
    {
      title: 'False Ceiling',
      image: '/images/false%20ceiling.jpg',
      span: 'lg:col-span-2 lg:row-span-1',
    },
  ]

  return (
    <section className="w-full bg-[#fdfdfd] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] tracking-tight leading-tight">
              Inspiration for <br/>
              <span className="text-[#ee6669]">Modern Living.</span>
            </h2>
            <div className="w-24 h-1 bg-[#ee6669]" />
          </div>
          <Link href="/projects" className="flex items-center gap-3 px-8 py-4 bg-white border border-zinc-100 rounded-full text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#ee6669] hover:border-[#ee6669]/20 transition-all group shadow-sm">
            View All Concepts <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-6 h-auto lg:h-[800px]">
          {ideas.map((idea, index) => (
            <div 
              key={idea.title} 
              onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal-engagement'))}
              className={`relative overflow-hidden rounded-[2.5rem] shadow-md cursor-pointer group isolate border border-zinc-100/50 ${idea.span || ''}`}
            >
              <Image 
                src={idea.image} 
                alt={idea.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              <div className="absolute bottom-10 left-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white text-lg lg:text-2xl font-serif font-light tracking-wide block mb-2">
                  {idea.title}
                </span>
                <div className="flex items-center gap-2 text-white/60 text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  Explore Designs <ChevronRight className="w-3 h-3" />
                </div>
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
