'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, BadgeCheck, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="w-full overflow-hidden bg-white px-4 py-16 text-zinc-900 sm:px-6 md:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 grid items-center gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div className="order-2 space-y-6 lg:order-1 lg:space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-light text-zinc-900 text-balance md:text-5xl">
                Design rooted in material, detail, and execution.
              </h2>
              <div className="w-16 h-0.5 bg-primary" />
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-lg lg:space-y-6">
              <p>
                Founded by Nandlal Kushwaha, <span className="text-zinc-900 font-medium">Grospace Interiors</span> represents our commitment to transforming ordinary houses into smart, modern, and well-designed living spaces that grow with your family.
              </p>
              <p>
                Based in Bhopal, we specialize in creating functional and space-efficient interiors that look premium without overspending. Whether it's a new 2BHK or 3BHK home, our goal is to help you grow your living experience through thoughtful design.
              </p>
              <p>
                From modular kitchens to full home execution, we provide practical solutions that focus on quality materials and meticulous on-site delivery.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 h-72 overflow-hidden rounded-3xl sm:h-96 lg:order-2 lg:h-[500px] lg:rounded-[3rem]">
            <Image
              src="/about-kalpvriksh.jpg"
              alt="Grospace interior design detail and materials"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA & Trust Badges Section */}
        <div className="space-y-8 rounded-3xl bg-zinc-50 p-6 text-center md:p-16 lg:space-y-12 lg:rounded-[4rem]">
           <div className="space-y-4">
              <h3 className="text-2xl md:text-4xl font-serif font-light text-[#2d1b4e]">Ready to price your home interiors?</h3>
              <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-zinc-500 sm:text-base">
                Connect with our Bhopal-based design team for a personalized site visit and transparent quotation.
              </p>
           </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                className="w-full sm:w-auto h-14 px-10 rounded-full bg-[#ee6669] hover:bg-[#2d1b4e] text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-[#ee6669]/20 transition-all"
              >
                Book Free Site Visit
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://wa.me/918319032087', '_blank')}
                className="w-full sm:w-auto h-14 px-10 rounded-full border-zinc-200 text-[#2d1b4e] hover:border-[#ee6669] hover:text-[#ee6669] font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
              >
                Talk to a Designer
              </Button>
           </div>

           <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto border-t border-zinc-200 px-6 pt-8 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:pt-12">
              <div className="min-w-[45%] snap-center space-y-3 md:min-w-0">
                 <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mx-auto shadow-sm">
                    <BadgeCheck className="w-6 h-6 text-green-500" />
                 </div>
                 <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">10+ Years Exp.</p>
              </div>
              <div className="min-w-[45%] snap-center space-y-3 md:min-w-0">
                 <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mx-auto shadow-sm">
                    <MapPin className="w-6 h-6 text-[#ee6669]" />
                 </div>
                 <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Local Bhopal Team</p>
              </div>
              <div className="min-w-[45%] snap-center space-y-3 md:min-w-0">
                 <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mx-auto shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                 </div>
                 <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Lifetime Warranty</p>
              </div>
              <div className="min-w-[45%] snap-center space-y-3 md:min-w-0">
                 <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mx-auto shadow-sm">
                    <HeartHandshake className="w-6 h-6 text-[#ee6669]" />
                 </div>
                 <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Fixed Pricing</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}
