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
    <section className="w-full bg-white py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 leading-tight">
            Commonly <span className="text-[#ee6669]">Asked.</span>
          </h2>
          <p className="text-zinc-500 text-lg font-light">Everything you need to know about starting your project with Grospace.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-zinc-100 rounded-2xl px-6 bg-zinc-50/30 overflow-hidden">
                <AccordionTrigger className="hover:no-underline font-serif text-lg text-zinc-800 text-left py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 font-light text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#332233] rounded-[3rem] p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ee6669]/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-5xl font-serif font-light tracking-tight">Still have <span className="text-[#ee6669] italic">Questions?</span></h3>
              <p className="text-zinc-400 font-light text-lg max-w-2xl mx-auto">
                Connect with our design experts directly and get all your doubts cleared over a quick chat.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button 
                asChild
                className="h-20 px-12 rounded-full bg-[#ee6669] hover:bg-white hover:text-[#332233] text-white font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl shadow-black/20"
              >
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                className="h-20 px-12 rounded-full border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-[0.2em] text-[11px] transition-all"
              >
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  Send WhatsApp
                </a>
              </Button>
            </div>
            
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] pt-4">
              We respond faster than your next coffee brew.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
