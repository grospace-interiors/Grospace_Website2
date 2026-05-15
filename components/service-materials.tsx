'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const materials = [
  {
    name: "HDHMR",
    properties: ["High Density", "Water Resistant", "Termite Proof"],
    description: "Ideal for modular kitchens and bathrooms, offering superior durability in high-moisture environments."
  },
  {
    name: "BWP Plywood",
    properties: ["Boiling Water Proof", "Marine Grade", "Lifelong Warranty"],
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

export function ServiceMaterials() {
  return (
    <section className="py-24 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] mb-6"
          >
            Premium <span className="text-[#ee6669]">Materials</span> & Hardware
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-2xl mx-auto font-light"
          >
            We partner with world-class hardware brands and use industrial-grade materials to ensure your interiors last a lifetime.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {materials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:border-[#ee6669]/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <h3 className="text-2xl font-serif font-light text-[#2d1b4e] mb-4">{material.name}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {material.properties.map((prop, idx) => (
                  <span key={idx} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white border border-zinc-100 rounded-full text-zinc-400 group-hover:text-[#ee6669] group-hover:border-[#ee6669]/20 transition-colors">
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

        <div className="pt-12 border-t border-zinc-100">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-12">Global Hardware Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-32 grayscale opacity-30">
             {brands.map(brand => (
               <span key={brand} className="text-3xl lg:text-5xl font-serif font-light tracking-tighter text-[#2d1b4e]">{brand}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}
