import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react'

const packages = [
  {
    name: 'Essential',
    tagline: 'Practical & Functional',
    price: '₹1.49L*',
    description: 'Perfect for first-time homeowners or rental properties. Focused on core needs with durable materials.',
    features: [
      'Laminate Finish (1.0mm)',
      'Basic Hardware (Soft-close)',
      'Standard MDF/HDMR Carcass',
      '45 Days Delivery',
      '5-Year Warranty'
    ],
    color: 'zinc',
    icon: Zap,
    href: '/packages/essential'
  },
  {
    name: 'Comfort',
    tagline: 'Most Popular Choice',
    price: '₹2.89L*',
    description: 'A balanced blend of aesthetics and storage. Upgraded finishes and premium hardware for modern living.',
    features: [
      'Acrylic/High-Gloss Finish',
      'Premium Hardware (Hettich/Ebco)',
      'BWR Plywood Carcass',
      '45 Days Delivery',
      '10-Year Warranty'
    ],
    color: 'red',
    icon: ShieldCheck,
    isPopular: true,
    href: '/packages/comfort'
  },
  {
    name: 'Premium',
    tagline: 'Luxury & Bespoke',
    price: '₹5.50L*',
    description: 'High-end materials and designer finishes. Customized to every detail for a signature home experience.',
    features: [
      'PU Paint / Glass Finish',
      'Luxury Hardware (Blum)',
      'Premium BWP Plywood Carcass',
      '60 Days Delivery',
      'Lifetime Warranty*'
    ],
    color: 'zinc',
    icon: Star,
    href: '/packages/premium'
  }
]

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[#fdfdfd]">
        {/* Hero Section */}
        <section className="bg-white py-24 lg:py-40 text-zinc-900 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-3 bg-[#ee6669]/10 px-6 py-2 rounded-full text-[#ee6669] text-[11px] font-bold uppercase tracking-[0.3em]">
              Transparent Pricing
            </div>
            <h1 className="text-5xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight">
              Interior Packages for <br/>
              <span className="text-[#ee6669] italic">Every Budget</span>
            </h1>
            <p className="text-xl text-zinc-600 font-light max-w-2xl mx-auto leading-relaxed">
               Choose from our curated furnishing plans designed for modern homes in Bhopal. 
               No hidden costs, just beautiful homes.
            </p>
          </div>
        </section>

        {/* Comparison Grid */}
        <section className="py-24 lg:py-32 -mt-20 relative z-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {packages.map((pkg) => (
                <div 
                  key={pkg.name}
                  className={`relative flex flex-col bg-white rounded-[3rem] p-10 lg:p-12 shadow-2xl transition-all duration-500 hover:scale-[1.02] border ${pkg.isPopular ? 'border-[#ee6669] ring-4 ring-[#ee6669]/5' : 'border-zinc-100'}`}
                >
                  {pkg.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ee6669] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-8 flex-grow">
                    <div className="space-y-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pkg.color === 'red' ? 'bg-[#ee6669] text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                         <pkg.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif font-light text-zinc-900">{pkg.name}</h3>
                        <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-widest mt-1">{pkg.tagline}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <p className="text-4xl font-serif text-zinc-900 tracking-tighter">
                         <span className="text-sm font-sans font-bold text-zinc-400 uppercase tracking-widest mr-2">Starting</span>
                         {pkg.price}
                       </p>
                       <p className="text-xs text-zinc-500 font-light leading-relaxed">{pkg.description}</p>
                    </div>

                    <div className="space-y-5 pt-8 border-t border-zinc-50">
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Included Features</p>
                       <ul className="space-y-4">
                          {pkg.features.map(feature => (
                            <li key={feature} className="flex items-start gap-3">
                               <div className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${pkg.color === 'red' ? 'bg-[#ee6669]/10 text-[#ee6669]' : 'bg-zinc-100 text-zinc-400'}`}>
                                  <Check className="w-2.5 h-2.5" strokeWidth={4} />
                               </div>
                               <span className="text-sm text-zinc-700 font-medium">{feature}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>

                  <div className="pt-10">
                    <Button 
                      asChild
                      className={`w-full h-16 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all group ${pkg.color === 'red' ? 'bg-[#ee6669] hover:bg-[#dd5558] text-white' : 'bg-zinc-900 hover:bg-[#ee6669] text-white'}`}
                    >
                      <Link href={pkg.href}>
                         Explore {pkg.name} <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-4xl font-serif font-light text-zinc-900">Why choose our fixed packages?</h2>
            <div className="grid md:grid-cols-3 gap-12">
               <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-5 h-5 text-[#ee6669]" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-widest">No Hidden Costs</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">What you see is what you pay. Full transparency from day one.</p>
               </div>
               <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-5 h-5 text-[#ee6669]" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-widest">Quality Materials</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Standardized premium brands used in every single project.</p>
               </div>
               <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-5 h-5 text-[#ee6669]" />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-widest">On-Time Delivery</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Fixed timelines with penalty clauses for any delays.</p>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
