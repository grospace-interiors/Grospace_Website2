'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const serviceCategories = [
  {
    title: 'Modular Interiors',
    slug: 'modular-interiors',
    image: '/images/modular-interiors-hero.jpg',
    description: 'Precision-engineered kitchens, wardrobes, and storage solutions manufactured with state-of-the-art technology.',
    count: '01'
  },
  {
    title: 'Full Home Interiors',
    slug: 'full-home-interiors',
    image: '/images/full home interior.jpg',
    description: 'Transform your entire living space with a cohesive design language that reflects your personality and lifestyle.',
    count: '02'
  },
  {
    title: 'Luxury Interiors',
    slug: 'luxury-interiors',
    image: '/images/luxary interion.jpg',
    description: 'Exquisite, bespoke designs for an elite lifestyle, featuring rare materials and unparalleled craftsmanship.',
    count: '03'
  }
]

const specializedServices = [
  {
    title: 'Modular Kitchen',
    slug: 'modular-kitchen',
    image: '/images/modular kitchen.jpg',
    description: 'Ergonomic layouts & smart storage.'
  },
  {
    title: 'Wardrobes',
    slug: 'wardrobes',
    image: '/images/wardrobe.jpg',
    description: 'Custom closets & sliding systems.'
  },
  {
    title: 'False Ceiling',
    slug: 'false-ceiling',
    image: '/images/false ceiling.jpg',
    description: 'Designer lighting & layered aesthetics.'
  },
  {
    title: 'Space Planning',
    slug: 'space-planning',
    image: '/images/kitchen.jpg',
    description: 'Strategic layouts & optimization.'
  }
]

export function ServicesExplore() {
  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#ee6669] text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-7xl font-serif font-light text-zinc-900 leading-tight"
            >
              Designing Spaces That <span className="text-[#ee6669]">Inspire.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 font-light text-lg max-w-sm mb-4"
          >
            Explore our specialized interior solutions, from factory-perfect modular units to bespoke luxury residences.
          </motion.p>
        </div>

        {/* Main Categories */}
        <div className="space-y-12 mb-32">
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
                className="group relative flex flex-col lg:flex-row items-center gap-12 p-8 lg:p-12 rounded-[3rem] bg-zinc-50 hover:bg-[#2d1b4e] transition-all duration-700 overflow-hidden"
              >
                {/* Number Background */}
                <span className="absolute right-12 top-12 text-[10rem] font-serif leading-none text-zinc-100 group-hover:text-white/5 transition-colors duration-700 pointer-events-none select-none">
                  {service.count}
                </span>

                <div className="relative w-full lg:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                <div className="relative z-10 flex-1 space-y-6">
                  <h3 className="text-3xl lg:text-5xl font-serif font-light text-zinc-900 group-hover:text-white transition-colors duration-700">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 font-light text-lg group-hover:text-purple-100/60 transition-colors duration-700 max-w-xl">
                    {service.description}
                  </p>
                  <div className="pt-4">
                    <div className="inline-flex items-center gap-4 text-[#ee6669] group-hover:text-white font-bold text-xs uppercase tracking-[0.3em] transition-colors duration-700">
                      Explore Service <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Specialized Sub-Services Section */}
        <div className="pt-24 border-t border-zinc-100">
          <div className="mb-16">
             <span className="text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Specialized Solutions</span>
             <h3 className="text-3xl lg:text-5xl font-serif font-light text-zinc-900">Core Modular <span className="text-[#ee6669]">&</span> Technical Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="group block space-y-6"
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
