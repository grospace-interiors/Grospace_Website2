'use client'

import { Card } from '@/components/ui/card'
import { ChevronRight, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Testimonial {
  id: string
  client_name: string
  review: string
  rating: number
  image?: string
  project_type?: string
  city?: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(3)

        if (error) throw error
        setTestimonials(data || [])
      } catch (err) {
        console.error('Error loading testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  // Fallback if DB is empty
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      review: 'Grospace transformed our home into a space that feels both luxurious and lived-in. Their attention to material quality is unmatched.',
      client_name: 'Anjali Sharma',
      city: 'Gulmohar',
      project_type: '3BHK Interior',
      rating: 5
    },
    {
      id: '2',
      review: 'Working with their team on our redesign was seamless. They understood our vision immediately and delivered beyond expectations.',
      client_name: 'Rajesh Gupta',
      city: 'Arera Colony',
      project_type: 'Villa Redesign',
      rating: 5
    },
    {
      id: '3',
      review: 'The custom furniture pieces are exceptional. Every detail feels thoughtfully executed. Highly recommend for anyone serious about quality.',
      client_name: 'Priya Nair',
      city: 'Bawadiya Kalan',
      project_type: 'Modular Kitchen',
      rating: 5
    },
  ]

  if (loading) {
    return (
      <section className="w-full bg-zinc-50 py-24 flex justify-center items-center">
        <div className="w-12 h-12 border-2 border-zinc-100 border-t-[#ee6669] rounded-full animate-spin" />
      </section>
    )
  }

  return (
    <section className="w-full overflow-hidden bg-zinc-50 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col items-start justify-between gap-8 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-serif font-light leading-tight text-[#222222] sm:text-4xl lg:text-5xl">
              Stories from our <span className="text-[#ee6669]">happy families.</span>
            </h2>
            <p className="text-sm font-light text-zinc-500 sm:text-lg">See how we've helped homeowners across Bhopal build their dream spaces.</p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-3 text-[#ee6669] font-bold uppercase text-[10px] tracking-[0.2em] group">
            View All Stories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
          {displayTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="min-w-[86%] snap-center md:min-w-0"
            >
              <Card
                className="group relative rounded-3xl border-zinc-100 bg-white p-6 shadow-xl transition-all duration-500 hover:shadow-2xl sm:rounded-[2rem] sm:p-8"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-50 opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-1">
                     {[...Array(testimonial.rating || 5)].map((_, i) => (
                       <Star key={i} className="w-3 h-3 fill-[#ee6669] text-[#ee6669]" />
                     ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="text-base font-light italic leading-relaxed text-zinc-800 sm:text-lg">
                    "{testimonial.review}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="pt-8 border-t border-zinc-50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden">
                       <img 
                        src={testimonial.image || `https://i.pravatar.cc/100?u=${testimonial.client_name}`} 
                        alt={testimonial.client_name} 
                        className="w-full h-full object-cover" 
                       />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#222222] leading-none">{testimonial.client_name}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-400 sm:text-[10px] sm:tracking-widest">
                        {testimonial.city || 'Bhopal'} • {testimonial.project_type}
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
