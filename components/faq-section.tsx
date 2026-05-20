'use client'

import { Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const WHATSAPP_NUMBER = '918319032087'
  const PHONE_NUMBER = '+919926987123'
  const prefilledMessage = "Hi, I'm interested in home interior design services."
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`

  const faqs = [
    {
      question: "What is your typical design process?",
      answer: "We follow a 4-step process: Consultation, Design & Estimation, Production, and Installation. Typically, we deliver your dream home within 45-60 days."
    },
    {
      question: "Do you offer a warranty on your work?",
      answer: "Yes, we are the first in India to offer a lifetime warranty on modular interiors. We stand by our material quality and craftsmanship."
    },
    {
      question: "How do you ensure transparent pricing?",
      answer: "We provide detailed, itemized estimates before starting. No hidden costs, no surprise charges. What we quote is what you pay."
    },
    {
      question: "Can I customize the packages?",
      answer: "Absolutely! Every home is unique. Our designers work with you to customize everything from layouts to finishes according to your lifestyle."
    }
  ]

  return (
    <section className="w-full bg-[#F6F4E8] py-16 md:py-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <span className="absolute -top-12 -left-20 text-[400px] font-serif font-bold text-[#222222]">Q&A</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Clean Accordion */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-10">
              <div className="space-y-2">
                <span className="text-[#ee6669] text-[9px] font-bold uppercase tracking-[0.5em] block">Support Hub</span>
                <h2 className="text-3xl md:text-5xl font-serif font-light text-[#222222] tracking-tight">
                  Commonly <span className="text-[#ee6669] italic">Asked.</span>
                </h2>
              </div>
              <p className="text-zinc-400 text-sm font-light max-w-[280px] leading-relaxed">
                Quick answers to help you start your dream home journey.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="divide-y divide-zinc-100"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-none group">
                    <AccordionTrigger className="hover:no-underline font-serif text-xl lg:text-2xl text-[#222222] text-left py-7 group-hover:text-[#ee6669] transition-colors">
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-bold text-zinc-300 group-hover:text-[#ee6669]/40 transition-colors tracking-tighter">0{idx + 1}</span>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-500 font-light text-lg leading-relaxed pb-8 pl-12 max-w-2xl">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          {/* Right Column: Sleek Floating Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#222222] rounded-[3rem] p-10 border border-white/5 shadow-[0_48px_80px_-20px_rgba(45,27,78,0.3)] relative overflow-hidden group"
            >
              {/* Premium Glow Effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#ee6669]/10 rounded-full blur-[60px] -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-[60px] -ml-16 -mb-16" />
              
              <div className="relative z-10 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center rotate-3 shadow-2xl group-hover:rotate-0 transition-transform duration-500">
                      <MessageCircle className="w-7 h-7 text-[#ee6669]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-light text-white">Still curious?</h3>
                      <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.4em]">Expert Chat</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Connect with our senior design experts directly and get all your doubts cleared over a quick chat.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    asChild
                    className="h-14 w-full rounded-2xl bg-[#ee6669] hover:bg-white hover:text-[#222222] text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl shadow-black/20 group/btn"
                  >
                    <a href={`tel:${PHONE_NUMBER}`} className="flex items-center justify-center gap-3">
                      <Phone className="w-4 h-4" />
                      CALL NOW <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>

                  <Button 
                    asChild
                    variant="outline"
                    className="h-14 w-full rounded-2xl border-white/10 bg-white/5 hover:bg-white hover:text-[#222222] text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
                  >
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      CHAT ON WHATSAPP
                    </a>
                  </Button>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-[#222222] bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                             {String.fromCharCode(64 + i)}
                           </div>
                         ))}
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                           Experts Online
                         </p>
                      </div>
                   </div>
                   <p className="text-[10px] text-zinc-500 font-medium italic leading-relaxed text-center">
                     "We respond faster than your next coffee brew."
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
