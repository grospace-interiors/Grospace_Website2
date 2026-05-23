'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Material {
  name: string
  properties: string[]
  description: string
}

interface ServiceMaterialsProps {
  materials?: Material[]
  className?: string
}

const defaultMaterials = [
  {
    name: "HDHMR",
    properties: ["High Density", "Water Resistant", "Termite Proof"],
    description: "Ideal for modular kitchens and bathrooms, offering superior durability in high-moisture environments."
  },
  {
    name: "BWP Plywood",
    properties: ["Boiling Water Proof", "Marine Grade", "Lifelong Quality"],
    description: "Premium core material for areas exposed to constant water and humidity, ensuring zero swelling."
  },
  {
    name: "Acrylic Finish",
    properties: ["Ultra High Gloss", "Scratch Resistant", "Easy Maintenance"],
    description: "Gives a mirror-like reflective finish to your cabinets, perfect for a modern, sleek aesthetic."
  },
  {
    name: "PU Finish",
    properties: ["Seamless Coating", "Infinite Colors", "Velvet Touch"],
    description: "A premium spray-painted finish that offers a perfectly smooth, joint-less surface and rich depth."
  }
]

const brands = ["Hettich", "Hafele", "Blum", "Ebco"]

export function ServiceMaterials({ materials = defaultMaterials, className }: ServiceMaterialsProps) {
  return (
    <section className={`overflow-hidden py-16 lg:py-28 ${className || 'bg-white'}`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-12 text-center lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-serif font-light text-[#222222] sm:text-4xl lg:mb-6 lg:text-6xl"
          >
            The <span className="text-[#ee6669]">Grospace</span> Material Standard
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-sm font-light text-zinc-500 sm:text-base"
          >
            We partner with world-class hardware brands and use industrial-grade materials to ensure your interiors last a lifetime.
          </motion.p>
        </div>

        <div className="-mx-4 mb-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:mb-24 lg:grid-cols-4">
          {materials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group min-w-[82%] snap-center rounded-3xl border border-[#222222]/5 bg-white p-6 transition-all duration-500 hover:border-[#ee6669]/20 hover:shadow-2xl md:min-w-0 sm:p-8 sm:rounded-[2.5rem]"
            >
              <h3 className="text-2xl font-serif font-light text-[#222222] mb-4">{material.name}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {material.properties.map((prop, idx) => (
                  <span key={idx} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-zinc-400 group-hover:text-[#ee6669] group-hover:border-[#ee6669]/20 transition-colors">
                    {prop}
                  </span>
                ))}
              </div>
              <p className="text-zinc-500 font-light text-sm leading-relaxed">
                {material.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="pt-12 border-t border-[#222222]/10">
          <p className="mb-8 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 sm:mb-12 sm:text-[10px] sm:tracking-[0.4em]">Global Hardware Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale sm:gap-16 lg:gap-32">
             {brands.map(brand => (
               <span key={brand} className="font-serif text-2xl font-light tracking-tighter text-[#222222] sm:text-3xl lg:text-5xl">{brand}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}
