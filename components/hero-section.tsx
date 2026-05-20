'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const slides = [
  {
    src: '/hero-2.jpg',
    title: 'Premium Finish for Modern Homes',
    subtitle: "Bhopal's Trusted Choice"
  },
  {
    src: '/hero-3.jpg',
    title: 'Designs that Fit Your Budget',
    subtitle: 'Transparent Pricing, No Hidden Costs'
  },
  {
    src: '/hero-4.jpg',
    title: 'Transform Your Space Today',
    subtitle: '50+ Homes Delivered on Time'
  }
]

export function HeroSection() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section id="home" className="relative h-[calc(100svh-112px)] min-h-[560px] w-full overflow-hidden bg-zinc-950 sm:h-[76vh] lg:h-[90vh]">
      <Carousel 
        setApi={setApi} 
        opts={{ loop: true }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full pl-0 basis-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows using standard components */}
        <CarouselNext className="hidden lg:flex absolute right-8 top-[calc(50%-28px)] z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#ee6669] text-white translate-x-0 transition-all" />
        <CarouselPrevious className="hidden lg:flex absolute right-8 top-[calc(50%+28px)] z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#ee6669] text-white translate-x-0 transition-all" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-center pointer-events-none">
          <div className="mx-auto max-w-[1400px] space-y-6 px-4 text-center sm:space-y-8 lg:px-8">
            <div className="space-y-3 sm:space-y-6">
              <h1 className="text-3xl font-serif font-light leading-[1.1] tracking-tight text-white drop-shadow-2xl transition-all duration-500 sm:text-5xl lg:text-8xl">
                Design Homes That Feel <br/>
                <span className="text-[#ee6669] italic font-serif">Premium, Practical & Personal</span>
              </h1>
              <p className="mx-auto max-w-3xl text-xs font-light leading-relaxed text-white/80 drop-shadow-lg sm:text-lg lg:text-xl">
                Complete interior solutions for modern homes in Bhopal — modular kitchens, wardrobes, furniture and full home interiors with transparent pricing.
              </p>
            </div>
            
            <div className="pointer-events-auto flex flex-col justify-center gap-2.5 px-4 sm:flex-row sm:gap-6 sm:px-0">
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
                className="h-12 rounded-full border-none bg-[#ee6669] px-8 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-xl transition-all hover:scale-105 hover:bg-white hover:text-[#ee6669] sm:h-auto sm:px-12 sm:py-8 sm:text-xs sm:tracking-[0.2em]"
              >
                Book Free Site Visit
              </Button>
              <Button 
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/30 bg-transparent px-8 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all hover:border-white sm:h-auto sm:px-12 sm:py-8 sm:text-xs sm:tracking-[0.2em]"
              >
                <Link href="/packages">View Packages</Link>
              </Button>
            </div>

            <div className="pt-2">
               <p className="text-[10px] text-white/60 font-medium mb-4 sm:hidden">
                 Free consultation in Bhopal | No obligation
               </p>
               <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white/45 sm:gap-4 sm:text-[10px] sm:tracking-[0.4em]">
                 <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#ee6669]" /> 10+ Years Experience</span>
                 <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#ee6669]" /> Custom Solutions</span>
                 <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#ee6669]" /> On-Time Delivery</span>
               </p>
            </div>

            {/* Dot Indicators */}
            <div className="pointer-events-auto mt-8 flex justify-center gap-3 sm:mt-12">
              {slides.map((_, index) => (
                <button 
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    api?.scrollTo(index)
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-300 cursor-pointer",
                    current === index ? "bg-[#ee6669] w-10" : "bg-white/40 hover:bg-white/70"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>
      </Carousel>

    </section>
  )
}
