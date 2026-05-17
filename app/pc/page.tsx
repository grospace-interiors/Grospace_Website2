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
      <main className="flex-grow pt-20">
        <PriceEstimator initialCategory="none" />
        
        {/* Why Transparent Pricing Matters Section */}
        <section className="py-32 bg-zinc-50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8 mb-24">
              <h2 className="text-5xl lg:text-7xl font-serif font-light text-[#2d1b4e] leading-tight tracking-tight">How our pricing <br /><span className="text-[#ee6669]">Empowers you.</span></h2>
              <p className="text-xl text-zinc-500 font-light leading-relaxed">No hidden fees, no last-minute "surprises." We believe that luxury interiors should come with absolute financial clarity from day one.</p>
            </div>
            <ServiceProcess />
          </div>
        </section>

        <section className="py-32 bg-white">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                   <div className="space-y-6">
                      <h2 className="text-5xl lg:text-7xl font-serif font-light text-[#2d1b4e] leading-tight tracking-tight">The Grospace <br /><span className="text-[#ee6669]">Material Guarantee.</span></h2>
                      <p className="text-xl text-zinc-500 font-light leading-relaxed">We source only from certified premium partners to ensure your home isn't just beautiful, but built to last a lifetime.</p>
                   </div>
                   <div className="grid grid-cols-2 gap-8 pt-8">
                      <div className="space-y-3">
                         <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                            <ShieldCheck className="w-6 h-6 text-[#ee6669]" />
                         </div>
                         <h4 className="font-bold text-[#2d1b4e] uppercase tracking-widest text-xs">Anti-Termite</h4>
                         <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Lifetime Protection</p>
                      </div>
                      <div className="space-y-3">
                         <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                            <CheckCircle2 className="w-6 h-6 text-[#ee6669]" />
                         </div>
                         <h4 className="font-bold text-[#2d1b4e] uppercase tracking-widest text-xs">Eco-Friendly</h4>
                         <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">E1 Grade Material</p>
                      </div>
                   </div>
                </div>
                <div className="relative">
                   <div className="aspect-square bg-zinc-50 rounded-[4rem] border border-zinc-100 overflow-hidden shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800" alt="Quality Materials" fill className="object-cover" />
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#ee6669] rounded-[3rem] p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl rotate-6 group hover:rotate-0 transition-transform duration-700">
                      <p className="text-4xl font-serif font-light leading-none">10</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-tight mt-2">Years Warranty</p>
                   </div>
                </div>
              </div>
           </div>
        </section>

        <ServiceMaterials />
        <TrustStrip />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
