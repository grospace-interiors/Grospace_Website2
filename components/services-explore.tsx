'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const serviceCategories = [
  {
    title: 'Modular Interiors',
    slug: 'modular-interiors',
    image: '/images/modular-interiors-hero.webp',
    description: 'Precision-engineered kitchens, wardrobes, and storage solutions manufactured with state-of-the-art technology.',
    count: '01'
  },
  {
    title: 'Full Home Interiors',
    slug: 'full-home-interiors',
    image: '/images/full home interior.webp',
    description: 'Transform your entire living space with a cohesive design language that reflects your personality and lifestyle.',
    count: '02'
  },
  {
    title: 'Luxury Interiors',
    slug: 'luxury-interiors',
    image: '/images/luxary interion.webp',
    description: 'Exquisite, bespoke designs for an elite lifestyle, featuring rare materials and unparalleled craftsmanship.',
    count: '03'
  }
]

const specializedServices = [
  {
    title: 'Modular Kitchen',
    slug: 'modular-kitchen',
    image: '/images/modular kitchen.webp',
    description: 'Ergonomic layouts & smart storage.'
  },
  {
    title: 'Wardrobes',
    slug: 'wardrobes',
    image: '/images/wardrobe.webp',
    description: 'Custom closets & sliding systems.'
  },
  {
    title: 'False Ceiling',
    slug: 'false-ceiling',
    image: '/images/false ceiling.webp',
    description: 'Designer lighting & layered aesthetics.'
  },
  {
    title: 'Space Planning',
    slug: 'space-planning',
    image: '/images/kitchen.webp',
    description: 'Strategic layouts & optimization.'
  }
]

export function ServicesExplore() {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-24 lg:flex-row lg:items-end lg:gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#ee6669] sm:text-xs sm:tracking-[0.4em] lg:mb-6"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif font-light leading-tight text-zinc-900 sm:text-4xl lg:text-7xl"
            >
              Designing Spaces That <span className="text-[#ee6669]">Inspire.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 max-w-sm text-sm font-light text-zinc-500 sm:text-lg"
          >
            Explore our specialized interior solutions, from factory-perfect modular units to bespoke luxury residences.
          </motion.p>
        </div>

        {/* Main Categories */}
        <div className="mb-20 space-y-6 lg:mb-32 lg:space-y-8">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/services/${service.slug}`}
                className="group relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-zinc-50 p-5 transition-all duration-700 hover:bg-[#222222] sm:p-8 lg:flex-row lg:gap-12 lg:rounded-[3rem] lg:p-12"
              >
                {/* Number Background */}
                <span className="pointer-events-none absolute right-6 top-6 select-none font-serif text-7xl leading-none text-zinc-100 transition-colors duration-700 group-hover:text-white/5 sm:right-12 sm:top-12 sm:text-[10rem]">
                  {service.count}
                </span>

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl lg:w-[450px] lg:rounded-[2rem]">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                <div className="relative z-10 flex-1 space-y-4 lg:space-y-6">
                  <h3 className="text-2xl font-serif font-light text-zinc-900 transition-colors duration-700 group-hover:text-white sm:text-3xl lg:text-5xl">
                    {service.title}
                  </h3>
                  <p className="max-w-xl text-sm font-light text-zinc-500 transition-colors duration-700 group-hover:text-purple-100/60 sm:text-lg">
                    {service.description}
                  </p>
                  <div className="pt-4">
                    <div className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ee6669] transition-colors duration-700 group-hover:text-white sm:gap-4 sm:text-xs sm:tracking-[0.3em]">
                      Explore Service <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Specialized Sub-Services Section */}
        <div className="border-t border-zinc-100 pt-16 lg:pt-24">
          <div className="mb-10 lg:mb-12">
             <span className="mb-4 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#ee6669] sm:text-[10px] sm:tracking-[0.4em]">Specialized Solutions</span>
             <h3 className="text-3xl font-serif font-light text-zinc-900 lg:text-5xl">Core Modular <span className="text-[#ee6669]">&</span> Technical Services</h3>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href="/lp/landing-page"
                  className="group block min-w-[82%] snap-center space-y-4 md:min-w-0 lg:space-y-6"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg lg:rounded-[2rem]">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-serif font-light text-zinc-900 group-hover:text-[#ee6669] transition-colors">{service.title}</h4>
                    <p className="text-zinc-500 text-sm font-light">{service.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
