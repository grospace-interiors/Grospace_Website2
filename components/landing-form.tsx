'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2, User, Phone, Mail, MapPin, Building2, Layout, Wallet, Clock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function LandingForm() {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    propertyType: '',
    bhkSize: '',
    services: '',
    budget: '',
    timeline: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [leadId, setLeadId] = useState<string | null>(null)

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.location,
          source: 'landing_page_partial',
          status: 'partial' // Mark as partial for follow-up
        }),
      })
      
      const result = await response.json()
      if (result.data?.[0]?.id) {
        setLeadId(result.data[0].id)
      }
    } catch (error) {
      console.error('Error saving partial lead:', error)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId, // Pass the existing ID to update instead of duplicate
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.location,
          typeOfSpace: formData.bhkSize,
          source: 'landing_page',
          budget: formData.budget,
          status: 'new', // Update status to new/complete
          details: {
            propertyType: formData.propertyType,
            services: formData.services,
            budgetRange: formData.budget,
            timeline: formData.timeline
          }
        }),
      })

      if (response.ok) {
        setStatus('success')
      }
    } catch (error) {
      console.error('Error submitting final lead:', error)
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-2xl sm:p-12 sm:rounded-[2.5rem]"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-serif font-light text-zinc-900 leading-tight">Request Received!</h3>
          <p className="text-zinc-500 font-light">Our design expert will call you within 24 hours to schedule your free site visit.</p>
        </div>      </motion.div>
    )
  }

  return (
    <div className="relative rounded-3xl border border-zinc-100 bg-white p-5 shadow-2xl sm:p-8 lg:rounded-[2.5rem] lg:p-12">
      <div className="space-y-6 sm:space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          <div className={cn("h-1 flex-grow rounded-full transition-all duration-700", step >= 1 ? "bg-[#ee6669]" : "bg-zinc-100")} />
          <div className={cn("h-1 flex-grow rounded-full transition-all duration-700", step >= 2 ? "bg-[#ee6669]" : "bg-zinc-100")} />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-2">Step {step}/2</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleStep1Submit} 
              className="space-y-5 sm:space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-light leading-tight tracking-tight text-zinc-900 sm:text-3xl">Let's start your <span className="text-[#ee6669]">design journey</span></h3>
                <p className="text-zinc-500 text-sm font-light">Enter your details to get a personalized estimate.</p>
              </div>

              <div className="grid gap-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <Input 
                    name="name" 
                    placeholder="Full Name" 
                    required 
                    className="pl-12 h-14 rounded-xl border-zinc-100 bg-zinc-50/50 focus:border-[#ee6669] focus:ring-0 transition-all"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <Input 
                    name="phone" 
                    type="tel" 
                    placeholder="Mobile Number" 
                    required 
                    className="pl-12 h-14 rounded-xl border-zinc-100 bg-zinc-50/50 focus:border-[#ee6669] focus:ring-0 transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className="pl-12 h-14 rounded-xl border-zinc-100 bg-zinc-50/50 focus:border-[#ee6669] focus:ring-0 transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <Input 
                    name="location" 
                    placeholder="Project Location (City)" 
                    required 
                    className="pl-12 h-14 rounded-xl border-zinc-100 bg-zinc-50/50 focus:border-[#ee6669] focus:ring-0 transition-all"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button type="submit" className="h-14 w-full rounded-xl bg-[#ee6669] text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-xl shadow-[#ee6669]/20 transition-all hover:bg-[#dd5558] sm:h-16 sm:text-[11px] sm:tracking-[0.2em]">
                Continue Planning <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleFinalSubmit} 
              className="space-y-5 sm:space-y-6"
            >
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-serif font-light leading-tight tracking-tight text-zinc-900 sm:text-3xl">Tell us about <span className="text-[#ee6669]">your needs</span></h3>
                <p className="text-zinc-500 text-sm font-light">This helps us prepare a better estimate for you.</p>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                    <select 
                      name="propertyType" 
                      required 
                      className="w-full pl-12 h-14 rounded-xl bg-zinc-50/50 border border-zinc-100 text-sm appearance-none outline-none focus:border-[#ee6669] transition-all"
                      value={formData.propertyType}
                      onChange={handleChange}
                    >
                      <option value="">Property Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">House</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                    <select 
                      name="bhkSize" 
                      required 
                      className="w-full pl-12 h-14 rounded-xl bg-zinc-50/50 border border-zinc-100 text-sm appearance-none outline-none focus:border-[#ee6669] transition-all"
                      value={formData.bhkSize}
                      onChange={handleChange}
                    >
                      <option value="">BHK Size</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4+ BHK">4+ BHK</option>
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <select 
                    name="services" 
                    required 
                    className="w-full pl-12 h-14 rounded-xl bg-zinc-50/50 border border-zinc-100 text-sm appearance-none outline-none focus:border-[#ee6669] transition-all"
                    value={formData.services}
                    onChange={handleChange}
                  >
                    <option value="">Services Required</option>
                    <option value="Full Home Interior">Full Home Interior</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Wardrobes & Storage">Wardrobes</option>
                    <option value="Living Room/TV Unit">Living Room</option>
                    <option value="False Ceiling & Lighting">Lighting & Ceiling</option>
                  </select>
                </div>

                <div className="relative group">
                  <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <select 
                    name="budget" 
                    required 
                    className="w-full pl-12 h-14 rounded-xl bg-zinc-50/50 border border-zinc-100 text-sm appearance-none outline-none focus:border-[#ee6669] transition-all"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Budget Range</option>
                    <option value="Below 5L">Below 5 Lacs</option>
                    <option value="5L - 10L">5L - 10 Lacs</option>
                    <option value="10L - 20L">10L - 20 Lacs</option>
                    <option value="Above 20L">Above 20 Lacs</option>
                  </select>
                </div>

                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#ee6669] transition-colors" />
                  <select 
                    name="timeline" 
                    required 
                    className="w-full pl-12 h-14 rounded-xl bg-zinc-50/50 border border-zinc-100 text-sm appearance-none outline-none focus:border-[#ee6669] transition-all"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Timeline</option>
                    <option value="Ready to move">Ready to move</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="After 6 months">After 6 months</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 rounded-xl px-5 text-xs font-bold uppercase tracking-[0.14em] text-zinc-400 hover:bg-zinc-100 sm:h-16 sm:px-6 sm:tracking-widest">
                  Back
                </Button>
                <Button type="submit" disabled={status === 'loading'} className="h-14 flex-grow rounded-xl bg-[#ee6669] text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-xl shadow-[#ee6669]/20 transition-all hover:bg-[#dd5558] sm:h-16 sm:text-[11px] sm:tracking-[0.2em]">
                  {status === 'loading' ? 'Submitting...' : 'Get Free Quote'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
