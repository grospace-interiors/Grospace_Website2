'use client'

import { Card } from '@/components/ui/card'
import { ChevronRight, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote:
      'Grospace transformed our home into a space that feels both luxurious and lived-in. Their attention to material quality is unmatched.',
    client: 'Anjali Sharma',
    city: 'Gulmohar, Bhopal',
    project: '3BHK Interior'
  },
  {
    id: 2,
    quote:
      'Working with their team on our redesign was seamless. They understood our vision immediately and delivered beyond expectations.',
    client: 'Rajesh Gupta',
    city: 'Arera Colony, Bhopal',
    project: 'Villa Redesign'
  },
  {
    id: 3,
    quote:
      'The custom furniture pieces are exceptional. Every detail feels thoughtfully executed. Highly recommend for anyone serious about quality.',
    client: 'Priya Nair',
    city: 'Bawadiya Kalan, Bhopal',
    project: 'Modular Kitchen'
  },
]

export function TestimonialsSection() {
  return (
    <section className="w-full bg-zinc-50 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] leading-tight">
              Stories from our <span className="text-[#ee6669]">happy families.</span>
            </h2>
            <p className="text-zinc-500 text-lg font-light">See how we've helped homeowners across Bhopal build their dream spaces.</p>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-3 text-[#ee6669] font-bold uppercase text-[10px] tracking-[0.2em] group">
            View All Stories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card
                className="bg-white border-zinc-100 p-10 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] relative group"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-50 opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-1">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className="w-3 h-3 fill-[#ee6669] text-[#ee6669]" />
                     ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="text-lg text-zinc-800 font-light leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="pt-8 border-t border-zinc-50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${testimonial.client}`} alt={testimonial.client} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#2d1b4e] leading-none">{testimonial.client}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
                        {testimonial.city} • {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex md:hidden justify-center">
           <Link href="#" className="flex items-center gap-2 text-[#ee6669] font-bold uppercase text-xs tracking-widest">
            View All Stories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
