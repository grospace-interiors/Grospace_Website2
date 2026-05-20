'use client'

import { useEffect, useRef, useState } from 'react'
import { Coffee, PencilRuler, ClipboardCheck, Hammer, Truck } from 'lucide-react'

export function ProcessSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: Coffee,
      title: 'Consultation',
      description: 'Discuss your vision and budget over a cup of coffee at our studio or your site.',
    },
    {
      icon: PencilRuler,
      title: '3D Design',
      description: 'Visualize your future home with our photorealistic 3D renders and material selection.',
    },
    {
      icon: ClipboardCheck,
      title: 'Confirmation',
      description: 'Finalize designs, materials, and timelines. We provide a transparent, fixed quote.',
    },
    {
      icon: Hammer,
      title: 'Execution',
      description: 'Our expert team brings the design to life with 146 quality checks along the way.',
    },
    {
      icon: Truck,
      title: 'Move-in',
      description: 'The big day! We hand over your dream home, ready to live in and fully cleaned.',
    },
  ]

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!media.matches || reducedMotion.matches) return

    const timer = window.setInterval(() => {
      setActiveStep((current) => {
        const next = (current + 1) % steps.length
        const carousel = carouselRef.current
        const item = carousel?.children[next] as HTMLElement | undefined

        if (carousel && item) {
          carousel.scrollTo({
            left: item.offsetLeft - carousel.offsetLeft - 16,
            behavior: 'smooth',
          })
        }

        return next
      })
    }, 2800)

    return () => window.clearInterval(timer)
  }, [steps.length])

  return (
    <section id="process" className="w-full overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:text-xs sm:tracking-[0.2em]">
            The Journey
          </p>
          <h2 className="text-3xl font-serif font-light text-zinc-900 md:text-4xl">
            How It Works
          </h2>
          <div className="mt-4 w-24 h-0.5 bg-primary mx-auto" />
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-zinc-100" />
          
          <div
            ref={carouselRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-16 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5"
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="group relative flex min-w-[72%] snap-center flex-col items-center rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-sm md:min-w-0 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                  {/* Icon Circle */}
                  <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-500 group-hover:border-primary group-hover:bg-primary/5 sm:mb-8 sm:h-20 sm:w-20">
                    <Icon className="w-8 h-8 text-zinc-400 group-hover:text-primary transition-colors duration-500" />
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold">
                      0{index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-light text-zinc-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed font-light px-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex justify-center gap-2 md:hidden">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Show process step ${index + 1}`}
                onClick={() => {
                  setActiveStep(index)
                  const carousel = carouselRef.current
                  const item = carousel?.children[index] as HTMLElement | undefined

                  if (carousel && item) {
                    carousel.scrollTo({
                      left: item.offsetLeft - carousel.offsetLeft - 16,
                      behavior: 'smooth',
                    })
                  }
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeStep === index ? 'w-7 bg-primary' : 'w-1.5 bg-zinc-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-sm mb-4 italic">Ready to start your journey with us?</p>
          <a href="#contact" className="inline-flex max-w-full items-center justify-center bg-primary px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:bg-zinc-900 hover:text-white sm:px-10 sm:text-sm sm:tracking-widest">
            Book Free Site Visit
          </a>
        </div>
      </div>
    </section>
  )
}
