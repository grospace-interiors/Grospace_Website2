import { Navigation } from '@/components/navigation'
import { PriceEstimator } from '@/components/price-estimator'
import { Footer } from '@/components/footer'
import { ServiceProcess } from '@/components/service-process'
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
        
        {/* How it Works Section - Sage Green Contrast */}
        <section className="relative overflow-hidden bg-[#E5EEE4] py-16 lg:py-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ee6669]/10 to-transparent" />
          <div className="mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-12">
            <div className="mx-auto mb-12 max-w-3xl space-y-5 lg:mb-24 lg:space-y-8">
              <h2 className="text-3xl font-serif font-light leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-7xl">How our estimation <br /><span className="text-[#ee6669]">Works for you.</span></h2>
              <p className="text-sm font-light leading-relaxed text-[#222222]/60 sm:text-xl">To provide a quote that is as realistic as your dream home, we follow a simple 5-step process tailored to your specific requirements.</p>
            </div>
            <ServiceProcess 
              title="Estimation Process"
              steps={[
                {
                  title: "Select Your Space",
                  description: "Choose between a Full Home Interior, Modular Kitchen, or a custom Wardrobe solution."
                },
                {
                  title: "Customize Requirements",
                  description: "Select your BHK type, layout preferences, and preferred materials from our premium library."
                },
                {
                  title: "Share Project Details",
                  description: "Provide your contact information so our design experts can analyze your specific configuration."
                },
                {
                  title: "Expert Review",
                  description: "Our specialists analyze your inputs to calculate a realistic estimate based on current market rates."
                },
                {
                  title: "Receive Your Quote",
                  description: "We will get back to you with a detailed price breakdown directly via Email or WhatsApp."
                }
              ]}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F6F4E8] to-transparent" />
        </section>

        {/* Honest Pricing & Family-First Quality Section */}
        <section className="relative overflow-hidden bg-[#F6F4E8] py-20 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-24 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.2em]">Our Commitment to Bhopal Families</span>
                  <h2 className="text-3xl font-serif font-light leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
                    Beautiful homes, built with <br />
                    <span className="text-[#ee6669]">honesty and comfort.</span>
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-zinc-500 sm:text-lg max-w-xl">
                    We believe premium interiors shouldn’t come with premium stress. We focus on transparent budgeting, durable child-friendly materials, and elegant designs that elevate your everyday family life.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#222222]/5 flex items-center justify-center shadow-sm">
                      <ShieldCheck className="w-5 h-5 text-[#ee6669]" />
                    </div>
                    <h4 className="font-bold text-[#222222] text-xs uppercase tracking-wider">Zero Hidden Charges</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      No surprise fees mid-project. Our quotes are fully itemized, giving you total control and clarity over your investment.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#222222]/5 flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#ee6669]" />
                    </div>
                    <h4 className="font-bold text-[#222222] text-xs uppercase tracking-wider">Built for Real Life</h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      We select certified, anti-termite, scratch-resistant, and eco-friendly materials that survive kids, pets, and busy mornings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl relative">
                  <Image 
                    src="/images/living room.webp" 
                    alt="Warm Family Interior" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white border border-zinc-100 p-6 rounded-2xl shadow-xl max-w-[220px] space-y-2">
                  <p className="text-[#ee6669] font-serif italic text-2xl">Accessible Luxury</p>
                  <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest leading-normal">Premium designs customized to your budget.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustStrip />
        <ServiceCTA />
      </main>
      <Footer />
    </>
  )
}
