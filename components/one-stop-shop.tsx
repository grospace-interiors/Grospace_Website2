'use client'

import Image from 'next/image'
import Link from 'next/link'

export function OneStopShop() {
  const categories = [
    {
      title: 'Modular Kitchens',
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
    <section className="w-full overflow-hidden bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 text-center lg:px-8">
        <h2 className="mb-4 text-3xl font-serif font-light leading-tight tracking-tight text-[#222222] sm:mb-6 sm:text-4xl lg:text-5xl">
          Everything your <span className="text-[#ee6669]">Home Needs.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-sm font-light leading-relaxed text-zinc-500 sm:mb-12 sm:text-lg">
          From modular kitchens to complete luxury home transformations — we handle everything from design to final handover.
        </p>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.title} 
              href={category.href}
              className="group relative h-[320px] min-w-[84%] snap-center cursor-pointer overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-xl md:min-w-0 sm:h-[400px]"
            >
              <Image 
                src={category.image} 
                alt={category.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-x-0 bottom-0 p-4 text-center sm:p-6">
                <div className="translate-y-0 rounded-lg p-5 py-6 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 sm:translate-y-4 sm:p-5 sm:py-6 bg-[#ee6669]/60">
                  <h3 className="text-xl font-bold mb-2 text-white">{category.title}</h3>
                  <p className="line-clamp-2 text-sm opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100 text-white/90">
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
