'use client'

import Image from 'next/image'
import Link from 'next/link'

export function OneStopShop() {
  const categories = [
    {
      title: 'Modular Interiors',
      description: 'Functional kitchen and wardrobe solutions.',
      image: '/images/modular-interiors-hero.jpg',
      href: '/services/modular-interiors'
    },
    {
      title: 'Full Home Interiors',
      description: 'End-to-end interior solutions for your home.',
      image: '/images/full%20home%20interior.jpg',
      href: '/services/full-home-interiors'
    },
    {
      title: 'Luxury Interiors',
      description: 'Tailored interiors that define your lifestyle.',
      image: '/images/luxary%20interion.jpg',
      href: '/services/luxury-interiors'
    },
    {
      title: 'Renovations',
      description: 'Expert solutions to remodel your space.',
      image: '/images/renovation.jpg',
      href: '/services/renovations'
    },
  ]

  return (
    <section className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] mb-6 tracking-tight leading-tight">
          Everything your <span className="text-[#ee6669]">Home Needs.</span>
        </h2>
        <p className="text-zinc-500 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
          From modular kitchens to complete luxury home transformations — we handle everything from design to final handover.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link 
              key={category.title} 
              href={category.href}
              className="group relative h-[450px] overflow-hidden rounded-xl shadow-sm cursor-pointer hover:shadow-xl transition-all"
            >
              <Image 
                src={category.image} 
                alt={category.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 py-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                  <h3 className="text-xl font-bold text-[#333] mb-2">{category.title}</h3>
                  <p className="text-sm text-zinc-500 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
