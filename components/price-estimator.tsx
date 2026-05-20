'use client'

import React, { useState, useMemo } from 'react'
import { 
  Home, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Zap, 
  Award, 
  Calculator,
  ArrowRight,
  MapPin,
  Sparkles,
  Layout,
  Maximize2,
  Layers,
  Palette,
  Check,
  Clock,
  Briefcase,
  User,
  Phone,
  Mail,
  Building,
  ArrowUpRight,
  ShieldCheck,
  Gem,
  PenTool
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'none' | 'home' | 'kitchen' | 'wardrobe'

export function PriceEstimator({ initialCategory = 'none' }: { initialCategory?: Category }) {
  const router = useRouter()
  const [category, setCategory] = useState<Category>(initialCategory)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<any>({
    // Shared
    name: '',
    phone: '',
    email: '',
    city: 'Bhopal',
    whatsappPreferred: false,
    
    // Home Interior
    bhk: '',
    spaces: [] as string[],
    style: '',
    material: '',
    budget: 50, 

    // Kitchen
    layout: '',
    kitchenSize: 50, 
    kitchenFinish: '',
    kitchenAccessories: [] as string[],
    countertop: '',

    // Wardrobe
    wardrobeType: '',
    wardrobeWidth: 6, 
    wardrobeHeight: 7, 
    wardrobeFinish: '',
    wardrobeAccessories: [] as string[],
  })

  const reset = () => {
    if (initialCategory === 'none') {
      setCategory('none')
    }
    setStep(1)
    setSubmitted(false)
  }

  // Selection Summary Logic (No live price showing)
  const selectionSummary = useMemo(() => {
    let timeline = '45-60 Days'
    let features: string[] = []

    if (category === 'home') {
      timeline = '60-75 Days'
      features = [formData.bhk, ...formData.spaces, formData.style, formData.material].filter(Boolean)
    } 
    else if (category === 'kitchen') {
      timeline = '30-45 Days'
      features = [formData.layout, formData.kitchenFinish, formData.countertop, ...formData.kitchenAccessories].filter(Boolean)
    }
    else if (category === 'wardrobe') {
      timeline = '20-30 Days'
      features = [formData.wardrobeType, formData.wardrobeFinish, ...formData.wardrobeAccessories].filter(Boolean)
    }

    return { timeline, features }
  }, [category, formData])

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const toggleSelection = (field: string, value: string) => {
    setFormData((prev: any) => {
      const current = prev[field] as string[]
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(i => i !== value) }
      }
      return { ...prev, [field]: [...current, value] }
    })
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          source: 'calculator',
          typeOfSpace: category === 'home' ? formData.bhk : category,
          whatsapp_opt_in: formData.whatsappPreferred,
          details: {
            calculator: {
              category,
              package: formData.style || 'Standard',
              bhk: formData.bhk,
              material: formData.material,
              kitchen_layout: formData.layout,
              spaces: formData.spaces,
              addons: [
                ...formData.kitchenAccessories,
                ...formData.wardrobeAccessories
              ]
            },
            preferences: {
              whatsapp_preferred: formData.whatsappPreferred,
              style_preference: formData.style
            },
            pricing: {
              budget_range: formData.budget > 50 ? 'Luxury' : 'Standard',
              raw_budget_value: formData.budget
            }
          }
        }),
      })
    } catch (err) {
      console.error(err)
    }
  }

  // --- RENDERING COMPONENTS ---

  const Sidebar = () => (
    <div className="lg:sticky lg:top-32 h-fit bg-white/80 backdrop-blur-2xl rounded-[3rem] p-10 border border-zinc-100 text-zinc-900 overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(45,27,78,0.08)]">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ee6669]/5 rounded-full blur-[80px] -mr-24 -mt-24" />
      
      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-5 pb-8 border-b border-zinc-100">
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
             <Calculator className="w-6 h-6 text-[#ee6669]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] leading-none mb-2">Expert</p>
            <h4 className="text-lg font-serif font-light text-[#2d1b4e]">Consultation</h4>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Personalized Quotation</p>
          <div className="space-y-2">
             <motion.p 
                key={submitted ? 'final' : 'mock'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl lg:text-3xl font-serif font-light text-[#2d1b4e] tracking-tight leading-tight"
             >
                {submitted ? (
                  "Quotation Requested"
                ) : (
                  'Pending Your Selections'
                )}
             </motion.p>
             <p className="text-[10px] text-zinc-400 italic uppercase tracking-[0.2em] font-medium leading-relaxed">
               {submitted ? 'Our experts will call you with the best price' : 'Complete steps for a tailored estimate'}
             </p>
          </div>
        </div>

        <AnimatePresence>
          {selectionSummary.features.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-5 pt-6 border-t border-zinc-100 overflow-hidden"
            >
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                 <CheckCircle2 className="w-3.5 h-3.5 text-[#ee6669]" /> Selection Summary
               </p>
               <div className="flex flex-wrap gap-2.5">
                  {selectionSummary.features.map(f => (
                    <motion.span 
                      key={f} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[9px] bg-zinc-50 px-4 py-2 rounded-full text-zinc-600 border border-zinc-100 font-bold uppercase tracking-widest"
                    >
                      {f}
                    </motion.span>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6 pt-6 border-t border-zinc-100">
           <div className="flex items-center justify-between text-[11px] py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-widest">Est. Delivery</span>
              <span className="font-bold flex items-center gap-2.5 text-[#2d1b4e]"><Clock className="w-4 h-4 text-[#ee6669]" /> {selectionSummary.timeline}</span>
           </div>
           <div className="flex items-center justify-between text-[11px] py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-widest">Quality Seal</span>
              <span className="font-bold flex items-center gap-2.5 text-[#2d1b4e]"><ShieldCheck className="w-4 h-4 text-green-600" /> Lifetime Warranty*</span>
           </div>
        </div>

        <Button 
          className="w-full h-20 bg-[#ee6669] hover:bg-[#2d1b4e] text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-[1.5rem] shadow-xl shadow-[#ee6669]/20 transition-all duration-500 group relative overflow-hidden"
          onClick={() => {
            if (category === 'home') setStep(6)
            else setStep(5)
          }}
        >
          <span className="relative z-10 flex items-center justify-center">
            REQUEST CUSTOM QUOTE <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-[#2d1b4e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </Button>
      </div>
    </div>
  )

  const CategoryCard = ({ type, title, desc, icon: Icon, img }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -15 }}
      transition={{ duration: 0.8 }}
      className="group relative h-[360px] min-w-[86%] snap-center cursor-pointer overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-[0_48px_80px_-20px_rgba(45,27,78,0.15)] md:min-w-0 sm:h-[650px] sm:rounded-[3.5rem]"
      onClick={() => {
        const path = type === 'home' ? '/pc/home-interior' : `/pc/${type}`
        router.push(path)
      }}
    >
      <Image src={img} alt={title} fill className="object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b4e] via-[#2d1b4e]/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-end space-y-5 p-6 text-center sm:space-y-10 sm:p-16">
        <div className="flex h-16 w-16 rotate-6 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-700 group-hover:rotate-0 group-hover:border-[#ee6669] group-hover:bg-[#ee6669] sm:h-24 sm:w-24 sm:rounded-[2rem]">
           <Icon className="h-7 w-7 text-white transition-colors duration-700 sm:h-10 sm:w-10" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-3xl font-serif font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h3>
          <p className="max-w-[280px] text-xs font-light leading-relaxed text-zinc-200 opacity-90 transition-opacity group-hover:opacity-100 sm:text-sm sm:opacity-70">{desc}</p>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            const path = type === 'home' ? '/pc/home-interior' : `/pc/${type}`
            router.push(path)
          }}
          className="rounded-full bg-white px-8 py-6 text-[9px] font-bold uppercase tracking-[0.14em] text-[#2d1b4e] shadow-2xl transition-all hover:bg-[#ee6669] hover:text-white active:scale-95 sm:px-12 sm:py-8 sm:text-[11px] sm:tracking-[0.3em]"
        >
          Start Calculation
        </Button>
      </div>
    </motion.div>
  )

  // --- MAIN VIEW LOGIC ---

  if (category === 'none') {
    return (
      <section id="estimator" className="relative w-full overflow-hidden bg-white pb-16 pt-10 lg:pb-24 lg:pt-16">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2d1b4e]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-4xl space-y-5 text-center sm:mb-20 sm:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#ee6669] shadow-sm sm:gap-3 sm:px-8 sm:py-3 sm:text-[11px] sm:tracking-[0.3em]"
            >
              <Calculator className="w-4 h-4" />
              Bhopal's Premium Interior Estimator
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl font-serif font-light leading-[1.05] tracking-tight text-[#2d1b4e] sm:text-6xl lg:text-[92px]"
            >
              Premium interiors, <br />
              <span className="text-[#ee6669]">honest pricing.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-zinc-500 sm:text-xl lg:text-2xl"
            >
               Instant, transparent cost estimates for your luxury home project in Bhopal.
            </motion.p>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0 md:pb-0">
            <CategoryCard 
              type="home"
              title="Home Interior"
              desc="Comprehensive premium renovation for apartments, villas and independent homes."
              icon={Home}
              img="/images/living%20room.jpg"
            />
            <CategoryCard 
              type="kitchen"
              title="Modular Kitchen"
              desc="High-performance, elegant kitchen designs with world-class smart storage."
              icon={Zap}
              img="/images/kitchen.jpg"
            />
            <CategoryCard 
              type="wardrobe"
              title="Luxury Wardrobes"
              desc="Bespoke sliding and hinged wardrobes with sophisticated internal shelving."
              icon={Award}
              img="/images/wardrobe.jpg"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-10 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400 sm:gap-12 sm:pt-20 sm:text-[10px] sm:tracking-[0.4em]"
          >
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                <ShieldCheck className="w-4 h-4 text-[#ee6669]" />
              </div>
              Transparent Pricing
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                <Gem className="w-4 h-4 text-[#ee6669]" />
              </div>
              Premium Materials
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669]/20 group-hover:bg-white transition-all">
                <PenTool className="w-4 h-4 text-[#ee6669]" />
              </div>
              End-to-End Execution
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-white py-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Top Navigation & Progress */}
        <div className="mb-20 flex flex-col md:flex-row items-center gap-10">
           <button onClick={reset} className="flex items-center gap-2.5 text-zinc-400 hover:text-[#ee6669] font-bold text-[11px] uppercase tracking-[0.2em] transition-all group shrink-0">
             <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669] transition-all">
                <ChevronLeft className="w-4 h-4" />
             </div>
             Go Back
           </button>
           
           <div className="flex-grow w-full space-y-4">
              <div className="flex justify-between items-end">
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
                   Step 0{step} <span className="text-zinc-200 mx-2">/</span> 0{category === 'home' ? 6 : 5}
                 </p>
                 <p className="text-[11px] font-bold text-[#ee6669] uppercase tracking-[0.2em]">
                   {Math.round((step / (category === 'home' ? 6 : 5)) * 100)}% Completed
                 </p>
              </div>
              <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / (category === 'home' ? 6 : 5)) * 100}%` }}
                  className="h-full bg-[#ee6669]" 
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
           </div>

           <div className="hidden md:flex items-center gap-4 shrink-0">
              <div className="h-10 w-px bg-zinc-100" />
              <div className="flex flex-col items-end">
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Project Location</span>
                 <span className="text-xs font-bold text-[#2d1b4e] flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#ee6669]" /> Bhopal, MP</span>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Questions Area */}
          <div className="lg:col-span-8 space-y-16">
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-3xl space-y-16"
                >
                    <div className="w-32 h-32 bg-green-50 rounded-[2.5rem] flex items-center justify-center border border-green-100 shadow-2xl shadow-green-600/5 rotate-3">
                      <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <div className="space-y-8">
                      <h3 className="text-6xl lg:text-[88px] font-serif font-light text-[#2d1b4e] leading-[1.05] tracking-tight">Thank you, <br /><span className="text-[#ee6669]">{formData.name.split(' ')[0]}!</span></h3>
                      <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                        Your personalized cost estimate breakdown has been generated and sent to your email. One of our senior design experts will reach out within <span className="text-[#2d1b4e] font-medium underline decoration-[#ee6669] decoration-2 underline-offset-4">24 hours</span> to discuss your Bhopal home project.
                      </p>
                    </div>
                    <div className="pt-12 border-t border-zinc-100 flex flex-col sm:flex-row gap-8">
                      <Button className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-16 h-24 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all" onClick={() => router.push('/projects')}>
                          VIEW COMPLETED PROJECTS
                      </Button>
                      <Button variant="outline" className="border-zinc-200 px-16 h-24 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-zinc-50 transition-all" onClick={reset}>
                          RESTART ESTIMATOR
                      </Button>
                    </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`${category}-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* --- HOME FLOW --- */}
                  {category === 'home' && (
                    <div className="space-y-16">
                      {step === 1 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">What is the <span className="text-[#ee6669]">BHK Type?</span></h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, bhk: item}); nextStep(); }}
                                className={cn(
                                  "h-56 rounded-[3rem] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-5 group relative overflow-hidden",
                                  formData.bhk === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-[0_24px_48px_-12px_rgba(238,102,105,0.15)]" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                <span className={cn("text-5xl font-serif transition-all duration-700 group-hover:scale-110", formData.bhk === item ? "text-[#ee6669]" : "text-zinc-200 group-hover:text-zinc-300")}>{item.split(' ')[0]}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Bedroom</span>
                                {formData.bhk === item && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Which <span className="text-[#ee6669]">spaces</span> to include?</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                              { id: 'Kitchen', icon: Zap },
                              { id: 'Wardrobe', icon: Award },
                              { id: 'TV Unit', icon: Layout },
                              { id: 'False Ceiling', icon: Layers },
                              { id: 'Mandir', icon: Sparkles },
                              { id: 'Study Unit', icon: Briefcase },
                            ].map(item => (
                              <button 
                                key={item.id} 
                                onClick={() => toggleSelection('spaces', item.id)}
                                className={cn(
                                  "p-12 rounded-[3rem] border-2 transition-all duration-500 flex flex-col items-center gap-8 text-center group relative overflow-hidden",
                                  formData.spaces.includes(item.id) ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-[0_24px_48px_-12px_rgba(238,102,105,0.12)]" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700", formData.spaces.includes(item.id) ? "bg-[#ee6669] text-white rotate-6" : "bg-zinc-50 group-hover:bg-[#ee6669]/10 group-hover:text-[#ee6669]")}>
                                   <item.icon className="w-8 h-8" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{item.id}</span>
                                {formData.spaces.includes(item.id) && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                          <div className="pt-8 flex flex-col md:flex-row items-center gap-10">
                             <Button onClick={nextStep} disabled={formData.spaces.length === 0} className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-16 h-20 rounded-[1.5rem] font-bold uppercase tracking-[0.3em] text-[11px] transition-all shadow-xl group">
                               NEXT SELECTION <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                             </Button>
                             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                                Select one or more spaces
                             </p>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Choose <span className="text-[#ee6669]">Interior Style</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {['Modern', 'Luxury', 'Minimal', 'Contemporary', 'Wooden Elegant'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, style: item}); nextStep(); }}
                                className={cn(
                                  "p-14 rounded-[2.5rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.3em] text-[11px] group relative overflow-hidden",
                                  formData.style === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669]" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                <span className="relative z-10">{item}</span>
                                <div className={cn("absolute bottom-0 left-0 w-full h-1 bg-[#ee6669] transition-transform duration-700 scale-x-0", formData.style === item ? "scale-x-100" : "group-hover:scale-x-50")} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Select <span className="text-[#ee6669]">Materials</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {['Laminate', 'Acrylic', 'PU Finish', 'Veneer'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, material: item}); nextStep(); }}
                                className={cn(
                                  "p-20 rounded-[3rem] border-2 transition-all duration-500 font-bold text-sm uppercase tracking-[0.4em] group relative",
                                  formData.material === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20"
                                )}
                              >
                                {item}
                                <div className={cn("absolute top-1/2 right-12 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ee6669] transition-opacity", formData.material === item ? "opacity-100" : "opacity-0")} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Preferred <span className="text-[#ee6669]">Budget Range</span></h3>
                          <div className="max-w-3xl p-20 bg-white border border-zinc-100 rounded-[4rem] space-y-20 shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)] relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-zinc-50 via-[#ee6669]/20 to-zinc-50" />
                             <Slider 
                              defaultValue={[formData.budget]} 
                              max={100} 
                              step={1} 
                              className="w-full h-2"
                              onValueChange={(val) => setFormData({...formData, budget: val[0]})}
                             />
                             <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-3 p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] block">Economic Range</span>
                                  <span className="text-xl font-serif text-[#2d1b4e]">Essential Interiors</span>
                                </div>
                                <div className="space-y-3 p-8 rounded-[2rem] bg-[#2d1b4e] border border-[#2d1b4e]">
                                  <span className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.3em] block">Signature Range</span>
                                  <span className="text-xl font-serif text-white">Luxury Experience</span>
                                </div>
                             </div>
                          </div>
                          <Button onClick={nextStep} className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-20 h-24 rounded-[2rem] font-bold uppercase tracking-[0.4em] text-[12px] transition-all shadow-2xl group">
                            CONTINUE TO FINAL QUOTE <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- KITCHEN FLOW --- */}
                  {category === 'kitchen' && (
                    <div className="space-y-16">
                      {step === 1 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Kitchen <span className="text-[#ee6669]">Layout</span></h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {['L Shape', 'U Shape', 'Parallel', 'Straight', 'Island Kitchen'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, layout: item}); nextStep(); }}
                                className={cn(
                                  "p-14 rounded-[3rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.3em] text-[11px] text-center group relative overflow-hidden",
                                  formData.layout === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                {item}
                                {formData.layout === item && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Estimated <span className="text-[#ee6669]">Size</span></h3>
                          <div className="max-w-3xl p-24 bg-white border border-zinc-100 rounded-[4rem] space-y-20 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                             <div className="space-y-4">
                                <h4 className="text-[120px] font-serif font-light text-[#ee6669] tracking-tighter leading-none">{formData.kitchenSize}</h4>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.5em]">Total Square Feet</p>
                             </div>
                             <Slider 
                              defaultValue={[formData.kitchenSize]} 
                              min={20}
                              max={300} 
                              step={5} 
                              className="w-full h-2"
                              onValueChange={(val) => setFormData({...formData, kitchenSize: val[0]})}
                             />
                             <p className="text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
                                Slide to adjust your floor area
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
                             </p>
                          </div>
                          <Button onClick={nextStep} className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-20 h-24 rounded-[2.5rem] font-bold uppercase tracking-[0.4em] text-[12px] shadow-2xl group transition-all">
                            SET AREA & PROCEED <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      )}

                      {step === 3 && (
                         <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Material <span className="text-[#ee6669]">Finish</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {['Glossy Acrylic', 'Premium Laminate', 'Matte PU', 'Glass Finish'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, kitchenFinish: item}); nextStep(); }}
                                className={cn(
                                  "p-20 rounded-[3rem] border-2 transition-all duration-500 font-bold text-sm uppercase tracking-[0.4em] group relative",
                                  formData.kitchenFinish === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20"
                                )}
                              >
                                {item}
                                {formData.kitchenFinish === item && <div className="absolute top-1/2 right-12 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Select <span className="text-[#ee6669]">Accessories</span></h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {['Tandem Drawers', 'Tall Unit', 'Corner Unit', 'Pantry', 'Soft Close'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => toggleSelection('kitchenAccessories', item)}
                                className={cn(
                                  "p-12 rounded-[3rem] border-2 transition-all duration-500 flex items-center justify-center text-center group relative overflow-hidden",
                                  formData.kitchenAccessories.includes(item) ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{item}</span>
                                {formData.kitchenAccessories.includes(item) && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                          <div className="pt-8">
                            <Button onClick={nextStep} className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-20 h-24 rounded-[2.5rem] font-bold uppercase tracking-[0.4em] text-[12px] shadow-2xl group transition-all">
                              CONFIRM ACCESSORIES <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-12">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Countertop <span className="text-[#ee6669]">Selection</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {['Quartz', 'Granite', 'Marble'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, countertop: item}); nextStep(); }}
                                className={cn(
                                  "p-16 rounded-[3rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.3em] text-[11px] group relative",
                                  formData.countertop === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20"
                                )}
                              >
                                {item}
                                {formData.countertop === item && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- WARDROBE FLOW --- */}
                  {category === 'wardrobe' && (
                     <div className="space-y-16">
                        {step === 1 && (
                          <div className="space-y-12">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Wardrobe <span className="text-[#ee6669]">Type</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {['Sliding', 'Hinged', 'Walk-in'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => { setFormData({...formData, wardrobeType: item}); nextStep(); }}
                                  className={cn(
                                    "p-18 rounded-[3rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.3em] text-[11px] group relative",
                                    formData.wardrobeType === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20"
                                  )}
                                >
                                  {item}
                                  {formData.wardrobeType === item && <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-16">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Input <span className="text-[#ee6669]">Dimensions</span></h3>
                            <div className="grid md:grid-cols-2 gap-16 max-w-3xl">
                              <div className="space-y-12 p-12 bg-zinc-50 border border-zinc-100 rounded-[3rem]">
                                 <div className="flex justify-between items-end px-4">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Width (FT)</label>
                                    <span className="text-5xl font-serif text-[#ee6669] leading-none">{formData.wardrobeWidth}</span>
                                 </div>
                                 <Slider 
                                    defaultValue={[formData.wardrobeWidth]} 
                                    min={3} max={20} step={0.5} 
                                    className="w-full"
                                    onValueChange={(val) => setFormData({...formData, wardrobeWidth: val[0]})}
                                 />
                              </div>
                              <div className="space-y-12 p-12 bg-zinc-50 border border-zinc-100 rounded-[3rem]">
                                 <div className="flex justify-between items-end px-4">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Height (FT)</label>
                                    <span className="text-5xl font-serif text-[#ee6669] leading-none">{formData.wardrobeHeight}</span>
                                 </div>
                                 <Slider 
                                    defaultValue={[formData.wardrobeHeight]} 
                                    min={5} max={10} step={0.5} 
                                    className="w-full"
                                    onValueChange={(val) => setFormData({...formData, wardrobeHeight: val[0]})}
                                 />
                              </div>
                            </div>
                            <Button onClick={nextStep} className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-20 h-24 rounded-[2.5rem] font-bold uppercase tracking-[0.4em] text-[12px] shadow-2xl transition-all group">
                              SAVE DIMENSIONS <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-12">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Finish <span className="text-[#ee6669]">Type</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {['Matte', 'High Gloss', 'Wood Texture', 'Glass Finish'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => { setFormData({...formData, wardrobeFinish: item}); nextStep(); }}
                                  className={cn(
                                    "p-20 rounded-[3rem] border-2 transition-all duration-500 font-bold text-sm uppercase tracking-[0.4em] group relative",
                                    formData.wardrobeFinish === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20"
                                  )}
                                >
                                  {item}
                                  {formData.wardrobeFinish === item && <div className="absolute top-1/2 right-12 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ee6669]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-12">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e]">Internal <span className="text-[#ee6669]">Accessories</span></h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                              {['Drawers', 'Shoe Rack', 'Jewelry Unit', 'Full Mirror', 'Loft Unit'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => toggleSelection('wardrobeAccessories', item)}
                                  className={cn(
                                    "p-12 rounded-[3rem] border-2 transition-all duration-500 flex items-center justify-center text-center group relative overflow-hidden",
                                    formData.wardrobeAccessories.includes(item) ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                  )}
                                >
                                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{item}</span>
                                  {formData.wardrobeAccessories.includes(item) && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                                </button>
                              ))}
                            </div>
                            <div className="pt-8">
                               <Button onClick={nextStep} className="bg-[#2d1b4e] hover:bg-[#ee6669] text-white px-20 h-24 rounded-[2.5rem] font-bold uppercase tracking-[0.4em] text-[12px] shadow-2xl transition-all group">
                                 REVIEW & GET QUOTE <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                               </Button>
                            </div>
                          </div>
                        )}
                     </div>
                  )}

                  {/* --- SHARED CONTACT FORM (FINAL STEP) --- */}
                  {((category === 'home' && step === 6) || (category !== 'home' && step === 5)) && (
                     <div className="max-w-3xl space-y-16">
                        <div className="space-y-6">
                          <h3 className="text-5xl lg:text-[80px] font-serif font-light text-[#2d1b4e] leading-[1.1] tracking-tight">Your Estimate <br /><span className="text-[#ee6669]">is Ready.</span></h3>
                          <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">Enter your details to receive your personalized estimate breakdown and book a professional site visit for your project in Bhopal.</p>
                        </div>
                        
                        <form onSubmit={handleFinalSubmit} className="space-y-10">
                          <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] ml-2 flex items-center gap-3"><User className="w-4 h-4" /> Full Name</label>
                              <Input 
                                placeholder="Rajesh Kumar" 
                                required
                                className="h-20 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm px-8" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] ml-2 flex items-center gap-3"><Mail className="w-4 h-4" /> Email Address</label>
                              <Input 
                                placeholder="rajesh@example.com" 
                                type="email"
                                required
                                className="h-20 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm px-8" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] ml-2 flex items-center gap-3"><Phone className="w-4 h-4" /> Phone Number</label>
                              <div className="relative">
                                 <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 pr-5 border-r border-zinc-200">
                                   <span className="text-sm">🇮🇳</span>
                                   <span className="text-[11px] font-bold text-zinc-400">+91</span>
                                 </div>
                                 <Input 
                                  placeholder="98765 43210" 
                                  required
                                  maxLength={10}
                                  className="h-20 pl-28 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm" 
                                  value={formData.phone}
                                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] ml-2 flex items-center gap-3"><Building className="w-4 h-4" /> Project Location</label>
                              <Input 
                                placeholder="Arera Colony, Bhopal" 
                                required
                                className="h-20 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm px-8" 
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-5 bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 group cursor-pointer hover:bg-white transition-all">
                            <div className="relative flex items-center">
                              <input 
                                type="checkbox" 
                                id="whatsapp"
                                className="w-6 h-6 rounded-lg border-zinc-200 text-[#ee6669] focus:ring-[#ee6669] cursor-pointer accent-[#ee6669]"
                                checked={formData.whatsappPreferred}
                                onChange={(e) => setFormData({...formData, whatsappPreferred: e.target.checked})}
                              />
                            </div>
                            <label htmlFor="whatsapp" className="text-xs text-zinc-500 font-medium cursor-pointer select-none">I prefer to receive the detailed PDF estimate and updates on WhatsApp</label>
                          </div>

                          <div className="pt-8">
                             <Button type="submit" className="w-full h-24 bg-[#ee6669] hover:bg-[#2d1b4e] text-white font-bold uppercase tracking-[0.4em] text-[12px] rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(238,102,105,0.25)] transition-all active:scale-[0.98] group relative overflow-hidden">
                               <span className="relative z-10 flex items-center justify-center">
                                  GET MY DETAILED QUOTE <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                               </span>
                               <div className="absolute inset-0 bg-[#2d1b4e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                             </Button>
                             <p className="text-[9px] text-zinc-400 text-center mt-10 leading-relaxed uppercase tracking-[0.25em] font-medium opacity-60">
                                By continuing, you agree to our <span className="text-[#2d1b4e] font-bold underline cursor-pointer">Privacy Policy</span>. Your data is encrypted and secure.
                             </p>
                          </div>
                        </form>
                     </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back Navigation */}
            {!submitted && step > 1 && !((category === 'home' && step === 6) || (category !== 'home' && step === 5)) && (
               <button onClick={prevStep} className="mt-12 flex items-center gap-2 text-[11px] font-bold text-zinc-400 hover:text-[#ee6669] uppercase tracking-[0.2em] transition-all group">
                 <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Previous
               </button>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
             <Sidebar />
          </div>

        </div>
      </div>
    </section>
  )
}
