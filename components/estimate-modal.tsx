'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Phone, Mail, X, ArrowRight, Sparkles, Calculator, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function EstimateModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', package: '', whatsapp_opt_in: true })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const triggerModal = useCallback((e: any) => {
    if (e?.detail?.package) {
      setFormData({ name: '', phone: '', email: '', package: e.detail.package, whatsapp_opt_in: true })
    }
    setIsOpen(true)
    setStatus('idle')
  }, [])

  useEffect(() => {
    window.addEventListener('open-estimate-modal', triggerModal as any)
    return () => {
      window.removeEventListener('open-estimate-modal', triggerModal as any)
    }
  }, [triggerModal])

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
          email: formData.email,
          source: 'estimate_request',
          whatsapp_opt_in: formData.whatsapp_opt_in,
          details: {
            package_name: formData.package,
            request_type: 'detailed_estimate',
            whatsapp_opt_in: formData.whatsapp_opt_in
          }
        }),
      })

      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          setIsOpen(false)
          setStatus('idle')
        }, 3000)
      } else {
        setStatus('idle')
      }
    } catch (error) {
      console.error('Error submitting estimate request:', error)
      setStatus('idle')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-[850px] p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle>Request Detailed Estimate</DialogTitle>
          <DialogDescription>Get a personalized cost breakdown for your chosen plan.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left Panel: Visual & Info */}
          <div className="md:w-5/12 relative bg-[#2d1b4e] p-8 lg:p-12 text-white flex flex-col justify-between">
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Calculator className="w-6 h-6 text-[#ee6669]" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-serif font-light leading-tight">Detailed <span className="text-[#ee6669] italic">Estimate</span></h3>
                <p className="text-white/60 text-xs font-light leading-relaxed">
                  We'll prepare a comprehensive cost breakdown for {formData.package || 'your project'}.
                </p>
              </div>
              
              <div className="space-y-4 pt-6">
                 <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                       <ShieldCheck className="w-3 h-3 text-[#ee6669]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-medium text-white/80">Itemized Pricing</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                       <Zap className="w-3 h-3 text-[#ee6669]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-medium text-white/80">Material Options</span>
                 </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
               <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#ee6669] mb-1">Selected Plan</p>
               <p className="text-lg font-serif italic text-white/90">{formData.package || 'Custom Solution'}</p>
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
               <div className="absolute -bottom-20 -right-20 w-64 h-64 border-[40px] border-white/20 rounded-full" />
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="flex-grow p-8 lg:p-12 relative flex flex-col justify-center bg-white">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif text-zinc-900">Request Sent!</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">
                      Our experts are calculating your estimate for <span className="font-bold text-[#2d1b4e]">{formData.package}</span>. We'll reach out shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee6669]/10 text-[#ee6669] text-[9px] font-bold uppercase tracking-widest border border-[#ee6669]/20">
                       <Zap className="w-3 h-3" /> {formData.package || 'Custom Plan'}
                    </div>
                    <h2 className="text-3xl font-serif text-[#2d1b4e] leading-tight">Your Details</h2>
                    <p className="text-zinc-400 text-sm font-light">Fill the form to receive your detailed quotation.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                        <Input 
                          required
                          placeholder="Full Name"
                          className="h-14 pl-12 bg-zinc-50 border-none focus:ring-1 focus:ring-[#ee6669]/20 rounded-2xl transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                        <Input 
                          required
                          type="email"
                          placeholder="Email Address"
                          className="h-14 pl-12 bg-zinc-50 border-none focus:ring-1 focus:ring-[#ee6669]/20 rounded-2xl transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                          className="h-14 pl-24 bg-zinc-50 border-none focus:ring-1 focus:ring-[#ee6669]/20 rounded-2xl transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-2">
                       <input 
                        type="checkbox" 
                        id="estimate_whatsapp_opt" 
                        checked={formData.whatsapp_opt_in}
                        onChange={(e) => setFormData({...formData, whatsapp_opt_in: e.target.checked})}
                        className="w-4 h-4 accent-[#ee6669]" 
                       />
                       <label htmlFor="estimate_whatsapp_opt" className="text-[10px] text-zinc-400 font-medium cursor-pointer">
                          I agree to receive updates & estimate on WhatsApp. By continuing, you agree to our T&C.
                       </label>
                    </div>

                    <div className="pt-2">
                       <Button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full h-16 bg-[#2d1b4e] hover:bg-[#ee6669] text-white font-bold uppercase tracking-[0.25em] text-[10px] rounded-2xl shadow-xl transition-all group"
                       >
                         {status === 'loading' ? 'Processing...' : 'Request Detailed Estimate'} 
                         <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                       </Button>
                    </div>

                    <p className="text-[9px] text-center text-zinc-400 font-medium uppercase tracking-widest">
                       Secure & Encrypted Submission
                    </p>
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
