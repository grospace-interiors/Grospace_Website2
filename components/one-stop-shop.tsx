'use client'

import Image from 'next/image'
import Link from 'next/link'

export function OneStopShop() {
  const categories = [
    {
      title: 'Modular Interiors',
      description: 'Functional kitchen and wardrobe solutions.',
      image: 'https://images.unsplash.com/photo-1556912177-c54035601844?q=80&w=800',
      href: '/services/modular-interiors'
    },
    {
      title: 'Full Home Interiors',
      description: 'End-to-end interior solutions for your home.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
      href: '/services/full-home-interiors'
    },
    {
      title: 'Luxury Interiors',
      description: 'Tailored interiors that define your lifestyle.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
      href: '/services/luxury-interiors'
    },
    {
      title: 'Renovations',
      description: 'Expert solutions to remodel your space.',
      image: 'https://images.unsplash.com/photo-1581850518616-cee8107f7fa2?q=80&w=800',
      href: '/services/renovations'
    },
  ]

  return (
    <section className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#333] mb-4">
          One-stop shop for all things interiors
        </h2>
        <p className="text-zinc-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office. With a wide range of furniture & decor, we have your back from start to finish.
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
