'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function MagazineSection() {
  const articles = [
    {
      title: '50+ Bedroom Colours: Single Shades and Bedroom Colour Combinations',
      author: 'Harsha Shankar',
      date: 'April 14, 2026',
      image: 'https://images.unsplash.com/photo-1616594831707-3c7d0d425f1c?q=80&w=800',
    },
    {
      title: '15+ Marble Pooja Room Designs That Can Add a WOW Factor to Your Home',
      author: 'Grospace Editorial Team',
      date: 'April 10, 2026',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    },
    {
      title: 'PVC Kitchen Cabinets 2026: Moisture-Resistant, Termite-Proof & Modular',
      author: 'Grospace Editorial Team',
      date: 'March 06, 2026',
      image: 'https://images.unsplash.com/photo-1556911220-e15595b69581?q=80&w=800',
    },
  ]

  return (
    <section className="w-full bg-[#fdfdfd] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#333]">
              Stay updated with trending home interior designs!
            </h2>
            <p className="text-zinc-600">Find everything from design fixes to expert tips on Grospace magazine</p>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 text-[#ee6669] font-bold uppercase text-sm group">
            See more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-64 overflow-hidden rounded-xl mb-6 shadow-sm">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#333] leading-tight group-hover:text-[#ee6669] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span>{article.author}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex md:hidden justify-center">
           <Link href="#" className="flex items-center gap-2 text-[#ee6669] font-bold uppercase text-sm">
            See more <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
