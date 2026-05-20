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
    <section className="w-full overflow-hidden bg-[#fdfdfd] py-16 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-6xl font-serif font-light text-[#2d1b4e] tracking-tight leading-tight">
              Inspiration for <br/>
              <span className="text-[#ee6669]">Modern Living.</span>
            </h2>
            <div className="w-24 h-1 bg-[#ee6669]" />
          </div>
          <Link href="/projects" className="hidden items-center gap-3 rounded-full border border-zinc-100 bg-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 shadow-sm transition-all hover:border-[#ee6669]/20 hover:text-[#ee6669] md:flex">
            View All Concepts <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:h-auto md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:h-[800px] lg:grid-cols-4 lg:grid-rows-3 lg:gap-6">
          {ideas.map((idea, index) => (
            <div 
              key={idea.title} 
              onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal-engagement'))}
              className={`group relative isolate min-h-[260px] min-w-[84%] snap-center cursor-pointer overflow-hidden rounded-3xl border border-zinc-100/50 shadow-md md:min-w-0 sm:rounded-[2.5rem] ${idea.span || ''}`}
            >
              <Image 
                src={idea.image} 
                alt={idea.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              <div className="absolute bottom-6 left-6 translate-y-0 transition-transform duration-500 group-hover:translate-y-0 sm:bottom-10 sm:left-10 sm:translate-y-4">
                <span className="text-white text-lg lg:text-2xl font-serif font-light tracking-wide block mb-2">
                  {idea.title}
                </span>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/70 opacity-100 transition-opacity delay-100 sm:tracking-[0.2em] sm:opacity-0 sm:group-hover:opacity-100">
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
