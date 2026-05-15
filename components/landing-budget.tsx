'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function LandingBudget() {
  const budgets = [
    {
      title: '2BHK Home',
      price: '3.57L',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    },
    {
      title: '3BHK Home',
      price: '4.23L',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
    },
    {
      title: '4BHK / Villa',
      price: '4.81L',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="w-full bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4 text-left">
            <h2 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 leading-tight">Homes for <span className="text-[#ee6669]">every budget.</span></h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              Premium quality shouldn't always mean premium prices. Our designers work with you to create stunning spaces within your comfort zone.
            </p>
          </div>
          <Button 
            onClick={() => document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#ee6669] hover:bg-zinc-900 text-white px-10 py-8 text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-all group"
          >
            Get Custom Quote <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {budgets.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group relative h-[600px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Top Badge */}
              <div className="absolute top-8 left-8 bg-[#ee6669] text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                Starting From {item.price}*
              </div>

              {/* Bottom Label */}
              <div className="absolute inset-x-0 bottom-0 p-10 space-y-2">
                <h3 className="text-3xl font-serif font-light text-white group-hover:text-[#ee6669] transition-colors">{item.title}</h3>
                <p className="text-zinc-300 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Full home modular interiors with premium finish.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] text-center">
          *Prices include only modular interiors. Taxes & customization extra.
        </p>
      </div>
    </section>
  )
}
