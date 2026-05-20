'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogOverlay
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Phone, X, ArrowRight, Sparkles, Layout, ShieldCheck, HeartHandshake, BadgeCheck } from 'lucide-react'
import { useSearchParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function LeadModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', bhkType: '', whatsapp_opt_in: true, package: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const triggerModal = useCallback((e?: any) => {
    const hasShown = localStorage.getItem('leadModalShown')
    const hasSubmitted = localStorage.getItem('leadFormSubmitted')
    
    // If opened manually via event, allow it even if shown before
    if (!e && (hasShown || hasSubmitted)) return
    
    if (e?.detail?.package) {
      setFormData(prev => ({ ...prev, package: e.detail.package }))
    }

    setIsOpen(true)
    localStorage.setItem('leadModalShown', 'true')
  }, [])

  useEffect(() => {
    // 1. Track Page Views
    const pageViews = Number(sessionStorage.getItem('pageViews') || '0') + 1
    sessionStorage.setItem('pageViews', pageViews.toString())
    
    // 2. Trigger after 30 seconds on the first page OR 3 pages
    const showDelay = pageViews >= 3 ? 5000 : 30000
    const timer = setTimeout(triggerModal, showDelay)

    // 3. Exit Intent Trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerModal()
      }
    }

    // 4. Listen for engagement events (Portfolio/Calculator)
    const handleEngagement = () => {
      setTimeout(triggerModal, 3000)
    }

    window.addEventListener('mouseout', handleMouseLeave)
    window.addEventListener('open-lead-modal-engagement', handleEngagement)
    window.addEventListener('open-lead-modal', triggerModal as any)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mouseout', handleMouseLeave)
      window.removeEventListener('open-lead-modal-engagement', handleEngagement)
      window.removeEventListener('open-lead-modal', triggerModal as any)
    }
  }, [triggerModal, pathname])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          typeOfSpace: formData.bhkType,
          source: formData.package ? 'shop_section' : 'engagement_popup',
          whatsapp_opt_in: formData.whatsapp_opt_in,
          details: {
            package_interest: formData.package || null,
            preferences: {
              whatsapp_opt_in: formData.whatsapp_opt_in,
              bhk_type: formData.bhkType
            }
          }
        }),
      })

      if (response.ok) {
        setStatus('success')
        localStorage.setItem('leadFormSubmitted', 'true')
        setTimeout(() => setIsOpen(false), 4000)
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
      setStatus('idle')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-[900px] p-0 overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border-none shadow-2xl bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-auto max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:max-w-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Book Free Site Visit</DialogTitle>
          <DialogDescription>Fill out the form to book your free site visit in Bhopal.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row min-h-[400px] lg:h-[600px]">
          
          {/* Left Side: Premium Image (Desktop Only) */}
          <div className="hidden lg:block lg:w-5/12 relative">
            <Image 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
              alt="Luxury Interior Design"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-10 left-10 right-10 text-white space-y-2">
               <div className="w-12 h-1 bg-[#ee6669] mb-4" />
               <p className="text-2xl font-serif font-light leading-tight">Creating spaces that reflect <span className="text-[#ee6669] italic">your excellence.</span></p>
            </div>
          </div>

          {/* Right Side: Content & Form */}
          <div className="flex-grow p-8 lg:p-14 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-12"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-10 h-10 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-4xl font-serif font-light text-zinc-900">Appointment Booked!</h3>
                    <p className="text-zinc-500 font-light max-w-xs mx-auto">Our design expert will call you shortly to confirm your free site visit.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-[#ee6669]/10 px-4 py-1.5 rounded-full text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.2em]">
                      {formData.package ? `Interest in ${formData.package}` : 'Exclusive Invitation'}
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-serif font-light text-zinc-900 leading-[1.1] tracking-tight">
                      Book Your <span className="text-[#ee6669]">Free Site Visit.</span>
                    </h2>
                    <p className="text-zinc-500 text-sm lg:text-base font-light leading-relaxed max-w-md">
                      Our design experts will help you plan layouts, materials and interior solutions tailored to your home.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                        <Input 
                          required
                          placeholder="Full Name"
                          className="h-14 pl-12 bg-zinc-50/50 border-zinc-100 focus:border-[#ee6669] focus:ring-0 rounded-2xl transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-zinc-100">
                          <Phone className="w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669]" />
                          <span className="text-[10px] font-bold text-zinc-400">+91</span>
                        </div>
                        <Input 
                          required
                          type="tel"
                          maxLength={10}
                          placeholder="98765 43210"
                          className="h-14 pl-24 bg-zinc-50/50 border-zinc-100 focus:border-[#ee6669] focus:ring-0 rounded-2xl transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="relative group">
                        <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                        <select
                          className="w-full h-14 pl-12 pr-4 bg-zinc-50/50 border border-zinc-100 focus:border-[#ee6669] text-sm text-zinc-600 rounded-2xl outline-none appearance-none transition-all"
                          value={formData.bhkType}
                          onChange={(e) => setFormData({...formData, bhkType: e.target.value})}
                        >
                          <option value="">BHK Type (Optional)</option>
                          <option value="1BHK">1 BHK Home</option>
                          <option value="2BHK">2 BHK Home</option>
                          <option value="3BHK">3 BHK Home</option>
                          <option value="Villa">Villa / Duplex</option>
                          <option value="Exploring">Just Exploring</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-2">
                       <input 
                        type="checkbox" 
                        id="whatsapp_opt" 
                        checked={formData.whatsapp_opt_in}
                        onChange={(e) => setFormData({...formData, whatsapp_opt_in: e.target.checked})}
                        className="w-4 h-4 accent-[#ee6669]" 
                       />
                       <label htmlFor="whatsapp_opt" className="text-[10px] text-zinc-400 font-medium cursor-pointer">I agree to receive updates on WhatsApp</label>
                    </div>

                    <Button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full h-16 bg-[#ee6669] hover:bg-zinc-900 text-white font-bold uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-[#ee6669]/10 transition-all active:scale-[0.98] group"
                    >
                      {status === 'loading' ? 'Scheduling...' : 'Book Free Site Visit'} 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 border-t border-zinc-100">
                       <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          <BadgeCheck className="w-3 h-3 text-green-500" /> Personalized Guidance
                       </div>
                       <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          <ShieldCheck className="w-3 h-3 text-[#ee6669]" /> Transparent Pricing
                       </div>
                       <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          <HeartHandshake className="w-3 h-3 text-blue-500" /> No Unnecessary Spam
                       </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
