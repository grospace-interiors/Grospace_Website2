import { Navigation } from '@/components/navigation'
import { PriceEstimator } from '@/components/price-estimator'
import { Footer } from '@/components/footer'
import { ServiceProcess } from '@/components/service-process'
import { ServiceMaterials } from '@/components/service-materials'
import { ServiceCTA } from '@/components/service-cta'
import { TrustStrip } from '@/components/trust-strip'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function PriceCalculatorMain() {
  return (
    <>
      <Navigation />
      <main className="flex-grow overflow-x-clip pt-20 bg-[#F6F4E8]">
        {/* Hero & Estimator - Cream Linen Base */}
        <PriceEstimator initialCategory="none" />
        
        {/* Why Transparent Pricing Matters Section - Sage Green Contrast */}
        <section className="relative overflow-hidden bg-[#E5EEE4] py-16 lg:py-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ee6669]/10 to-transparent" />
          <div className="mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-12">
            <div className="mx-auto mb-12 max-w-3xl space-y-5 lg:mb-24 lg:space-y-8">
              <h2 className="text-3xl font-serif font-light leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-7xl">How our pricing <br /><span className="text-[#ee6669]">Empowers you.</span></h2>
              <p className="text-sm font-light leading-relaxed text-[#222222]/60 sm:text-xl">No hidden fees, no last-minute "surprises." We believe that luxury interiors should come with absolute financial clarity from day one.</p>
            </div>
            <ServiceProcess />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F6F4E8] to-transparent" />
        </section>

        {/* Material Guarantee - Back to Cream Linen */}
        <section className="overflow-hidden bg-[#F6F4E8] py-16 lg:py-24">
           <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
                <div className="space-y-8 lg:space-y-8">
                   <div className="space-y-4 lg:space-y-6">
                      <h2 className="text-3xl font-serif font-light leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-7xl">The Grospace <br /><span className="text-[#ee6669]">Material Guarantee.</span></h2>
                      <p className="text-sm font-light leading-relaxed text-zinc-500 sm:text-xl">We source only from certified premium partners to ensure your home isn't just beautiful, but built to last a lifetime.</p>
                   </div>
                   <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-8">
                      <div className="min-w-[70%] snap-center space-y-3 rounded-2xl border border-[#222222]/5 bg-white p-6 shadow-sm sm:min-w-0 transition-transform hover:scale-105 duration-500">
                         <div className="w-12 h-12 rounded-2xl bg-[#E5EEE4] flex items-center justify-center border border-[#222222]/5">
                            <ShieldCheck className="w-6 h-6 text-[#ee6669]" />
                         </div>
                         <h4 className="font-bold text-[#222222] uppercase tracking-widest text-xs">Anti-Termite</h4>
                         <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Lifetime Protection</p>
                      </div>
                      <div className="min-w-[70%] snap-center space-y-3 rounded-2xl border border-[#222222]/5 bg-white p-6 shadow-sm sm:min-w-0 transition-transform hover:scale-105 duration-500">
                         <div className="w-12 h-12 rounded-2xl bg-[#E5EEE4] flex items-center justify-center border border-[#222222]/5">
                            <CheckCircle2 className="w-6 h-6 text-[#ee6669]" />
                         </div>
                         <h4 className="font-bold text-[#222222] uppercase tracking-widest text-xs">Eco-Friendly</h4>
                         <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">E1 Grade Material</p>
                      </div>
                   </div>
                </div>
                <div className="relative">
                   <div className="aspect-square overflow-hidden rounded-[2rem] lg:rounded-[4rem] border-8 border-white shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800" alt="Quality Materials" fill className="object-cover" />
                   </div>
                   <div className="absolute -bottom-6 -right-2 flex h-32 w-32 rotate-6 flex-col items-center justify-center rounded-3xl bg-[#ee6669] p-6 text-center text-white shadow-2xl transition-transform duration-700 hover:rotate-0 sm:-bottom-10 sm:-right-10 sm:h-48 sm:w-48 sm:rounded-[3rem] sm:p-10">
                      <p className="text-4xl font-serif font-light leading-none">10</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-tight mt-2">Years Experience</p>
                   </div>
                </div>
              </div>
           </div>
        </section>

        <ServiceMaterials className="bg-[#E5EEE4]" />
        <TrustStrip />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
