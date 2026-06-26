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
import * as fp from '@/lib/fpixel'
import { supabase } from '@/lib/supabase'

type Category = 'none' | 'home' | 'kitchen' | 'wardrobe'

export function PriceEstimator({ initialCategory = 'none' }: { initialCategory?: Category }) {
  const router = useRouter()
  const [category, setCategory] = useState<Category>(initialCategory)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [configs, setConfigs] = useState<any[]>([])
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null)

  const formatPriceRange = (price: number) => {
    const low = Math.round(price * 0.95);
    const high = Math.round(price * 1.10);
    return `₹${low.toLocaleString('en-IN')} - ₹${high.toLocaleString('en-IN')}`;
  };

  const [formData, setFormData] = useState<any>({
    // Shared
    name: '',
    phone: '',
    email: '',
    city: 'Bhopal',
    whatsappPreferred: true,
    
    // Home Interior
    bhk: '',
    spaces: [] as string[],
    style: '',
    material: '',
    budget: 50, 

    // Kitchen
    layout: '',
    platformLength: 120, 
    kitchenSideA: 120,
    kitchenSideB: 60,
    kitchenSideC: 60,
    kitchenFinish: '',
    kitchenHardware: '',
    kitchenAccessories: [] as string[],

    // Wardrobe
    wardrobeType: '',
    wardrobeWidth: 6, 
    wardrobeHeight: 7, 
    wardrobeFinish: '',
    wardrobeAccessories: [] as string[],
  })

  // Fetch Configs
  React.useEffect(() => {
    async function fetchConfigs() {
      let tableName = ''
      if (category === 'kitchen') tableName = 'kitchen_calculator_config'
      else if (category === 'wardrobe') tableName = 'wardrobe_calculator_config'
      else if (category === 'home') tableName = 'home_calculator_config'

      if (tableName) {
        const { data } = await supabase.from(tableName).select('*').eq('is_active', true)
        if (data) setConfigs(data)
      } else {
        setConfigs([])
      }
    }
    fetchConfigs()
  }, [category])

  // Centralized Kitchen SQFT Calculation
  const kitchenMetrics = useMemo(() => {
    if (category !== 'kitchen') return { baseSQFT: 0, wallSQFT: 0, loftSQFT: 0, totalSQFT: 0, totalInches: 0 };
    
    let totalInches = 0
    let overlaps = { base: 0, wall: 0, loft: 0 }

    if (formData.layout === 'Straight' || formData.layout === 'Island Kitchen') {
      totalInches = formData.platformLength
      overlaps = { base: 0, wall: 0, loft: 0 }
    } 
    else if (formData.layout === 'L Shape') {
      totalInches = formData.kitchenSideA + formData.kitchenSideB
      overlaps = { base: 48, wall: 11, loft: 17 }
    }
    else if (formData.layout === 'Parallel') {
      totalInches = formData.kitchenSideA + formData.kitchenSideB
      overlaps = { base: 0, wall: 0, loft: 0 }
    }
    else if (formData.layout === 'U Shape') {
      totalInches = formData.kitchenSideA + formData.kitchenSideB + formData.kitchenSideC
      overlaps = { base: 96, wall: 22, loft: 34 } // Double the L-shape overlap
    }

    // Applying the Formula: ((TotalL - Overlap) * Height) / 144
    const baseSQFT = Math.max(0, (totalInches - overlaps.base) * 33) / 144
    const wallSQFT = Math.max(0, (totalInches - overlaps.wall) * 23) / 144
    const loftSQFT = Math.max(0, (totalInches - overlaps.loft) * 40) / 144
    const totalSQFT = baseSQFT + wallSQFT + loftSQFT

    return { baseSQFT, wallSQFT, loftSQFT, totalSQFT, totalInches }
  }, [category, formData.layout, formData.platformLength, formData.kitchenSideA, formData.kitchenSideB, formData.kitchenSideC])

  // Live Price Calculation
  React.useEffect(() => {
    if (configs.length === 0) return

    let total = 0
    if (category === 'kitchen') {
      const finishConfig = configs.find(c => c.package_name === formData.kitchenFinish && c.item_type === 'finish')
      const hardwareConfig = configs.find(c => c.package_name === formData.kitchenHardware && c.item_type === 'hardware')
      const countertopConfig = configs.find(c => c.package_name === formData.countertop && c.item_type === 'countertop')

      // Rate Calculation: Finish Base + Hardware Extra
      let sqftRate = 850 // Default Mica base
      if (finishConfig) sqftRate = Number(finishConfig.base_price)
      if (hardwareConfig) sqftRate += Number(hardwareConfig.base_price) // Hardware adds to base

      total = kitchenMetrics.totalSQFT * sqftRate

      // Countertop (RFT based)
      if (countertopConfig) {
        total += Number(countertopConfig.base_price) * (kitchenMetrics.totalInches / 12)
      }
      
      // Dynamic Addons
      formData.kitchenAccessories.forEach((addonName: string) => {
        const addonConfig = configs.find(c => c.package_name === addonName && c.item_type === 'addon')
        if (addonConfig) {
          total += Number(addonConfig.base_price)
        }
      })
    }
    else if (category === 'wardrobe') {
      const finishConfig = configs.find(c => c.package_name === formData.wardrobeFinish && c.item_type === 'finish')
      if (finishConfig) {
        total = formData.wardrobeWidth * formData.wardrobeHeight * Number(finishConfig.base_price)
      } else {
        // Fallback
        const baseRate = formData.wardrobeFinish.includes('Gloss') ? 1800 : 1500
        total = formData.wardrobeWidth * formData.wardrobeHeight * baseRate
      }
      
      // Dynamic Wardrobe Accessories from DB
      formData.wardrobeAccessories.forEach((addonName: string) => {
        const addonConfig = configs.find(c => c.package_name === addonName && c.item_type === 'addon')
        if (addonConfig) {
          total += Number(addonConfig.base_price)
        } else {
          total += 3000 // Fallback
        }
      })
    }
    else if (category === 'home') {
      // 1. BHK Base Price
      const bhkConfig = configs.find(c => c.package_name === formData.bhk && c.item_type === 'bhk')
      let totalHome = bhkConfig ? Number(bhkConfig.base_price) : (formData.bhk === '1 BHK' ? 250000 : formData.bhk === '2 BHK' ? 450000 : 650000)

      // 2. Add spaces prices
      formData.spaces.forEach((spaceName: string) => {
        const spaceConfig = configs.find(c => c.package_name === spaceName && c.item_type === 'space')
        if (spaceConfig) {
          totalHome += Number(spaceConfig.base_price)
        }
      })

      // 3. Style multiplier
      const styleConfig = configs.find(c => c.package_name === formData.style && c.item_type === 'style')
      if (styleConfig) {
        totalHome *= Number(styleConfig.base_price)
      }

      // 4. Material multiplier
      const materialConfig = configs.find(c => c.package_name === formData.material && c.item_type === 'material')
      if (materialConfig) {
        totalHome *= Number(materialConfig.base_price)
      }

      total = totalHome
    }

    setPredictedPrice(total > 0 ? total : null)
  }, [formData, configs, category])

  React.useEffect(() => {
    if (category !== 'none') {
      fp.customEvent('PriceCalculatorStarted', { 
        category,
        page_location: window.location.href
      })
    }
  }, [category])

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
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/enquiry', {
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

      if (response.ok) {
        setSubmitted(true)
        fp.customEvent('PriceCalculatorCompleted', {
          category,
          typeOfSpace: category === 'home' ? formData.bhk : category,
          budget_range: formData.budget > 50 ? 'Luxury' : 'Standard'
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- RENDERING COMPONENTS ---

  const Sidebar = () => (
    <div className="lg:sticky lg:top-32 h-fit bg-white/80 backdrop-blur-2xl rounded-[2rem] p-8 border border-zinc-100 text-zinc-900 overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(45,27,78,0.08)]">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ee6669]/5 rounded-full blur-[80px] -mr-24 -mt-24" />
      
      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-5 pb-8 border-b border-zinc-100">
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
             <Calculator className="w-6 h-6 text-[#ee6669]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-none mb-2">Expert</p>
            <h4 className="text-lg font-serif font-light text-[#222222]">Consultation</h4>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Personalized Quotation</p>
          <div className="space-y-2">
             <motion.p 
                key={submitted ? 'final' : 'live'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl lg:text-3xl font-serif font-light text-[#222222] tracking-tight leading-tight"
             >
                {submitted && predictedPrice ? (
                  formatPriceRange(predictedPrice)
                ) : (
                  'Pending Submission'
                )}
             </motion.p>
             <p className="text-[10px] text-zinc-400 italic uppercase tracking-[0.2em] font-medium leading-relaxed">
               {submitted ? 'Estimated Investment' : 'Complete the form to reveal your estimate'}
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
              <span className="font-bold flex items-center gap-2.5 text-[#222222]"><Clock className="w-4 h-4 text-[#ee6669]" /> {selectionSummary.timeline}</span>
           </div>
           <div className="flex items-center justify-between text-[11px] py-1">
              <span className="text-zinc-500 font-bold uppercase tracking-widest">Quality Seal</span>
              <span className="font-bold flex items-center gap-2.5 text-[#222222]"><ShieldCheck className="w-4 h-4 text-green-600" /> Expert Execution</span>
           </div>
        </div>
      </div>
    </div>
  )

  const CategoryCard = ({ type, title, desc, icon: Icon, img }: any) => (

    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.8 
      }}
      whileHover={{ y: -15, scale: 1.02 }}
      className="group relative h-[360px] min-w-[86%] snap-center cursor-pointer overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 hover:shadow-[0_48px_80px_-20px_rgba(45,27,78,0.15)] md:min-w-0 sm:h-[650px] sm:rounded-[3.5rem]"
      onClick={() => {
        const path = type === 'home' ? '/pc/home-interior' : `/pc/${type}`
        router.push(path)
      }}
    >
      <Image 
        src={img} 
        alt={title} 
        fill 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
        priority={type === 'home'} 
        className="object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/60 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-end space-y-5 p-6 text-center sm:space-y-10 sm:p-16">
        {/* Mobile Icon Animation (Pop & Stay Pink) */}
        <motion.div 
          initial={{ rotate: 15, scale: 0.8, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
          whileInView={{ rotate: 0, scale: 1, backgroundColor: "#ee6669", borderColor: "#ee6669" }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
          className="md:hidden flex h-16 w-16 items-center justify-center rounded-2xl border shadow-2xl backdrop-blur-2xl sm:h-24 sm:w-24 sm:rounded-[2rem]"
        >
           <Icon className="h-7 w-7 text-white sm:h-10 sm:w-10" />
        </motion.div>

        {/* Desktop Icon Animation (Hover to Pink) */}
        <div className="hidden md:flex h-16 w-16 rotate-6 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-700 group-hover:rotate-0 group-hover:border-[#ee6669] group-hover:bg-[#ee6669] sm:h-24 sm:w-24 sm:rounded-[2rem]">
           <Icon className="h-7 w-7 text-white transition-colors duration-700 sm:h-10 sm:w-10" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-3xl font-serif font-light leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h3>
          <p className="mx-auto max-w-[280px] text-lg font-light leading-relaxed text-zinc-100 opacity-95 transition-opacity group-hover:opacity-100 sm:max-w-[320px] sm:text-xl sm:opacity-70">{desc}</p>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            const path = type === 'home' ? '/pc/home-interior' : `/pc/${type}`
            router.push(path)
          }}
          className="rounded-full bg-white px-8 py-6 text-[9px] font-bold uppercase tracking-[0.14em] text-[#222222] shadow-2xl transition-all hover:bg-[#ee6669] hover:text-white active:scale-95 sm:px-12 sm:py-8 sm:text-[11px] sm:tracking-[0.2em]"
        >
          Start Calculation
        </Button>
      </div>
    </motion.div>
  )

  // --- MAIN VIEW LOGIC ---

  if (category === 'none') {
    return (
      <section id="estimator" className="relative w-full overflow-hidden bg-white pb-16 pt-8 lg:pb-24 lg:pt-16">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ee6669]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#222222]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <div className="mx-auto mb-10 max-w-4xl space-y-5 text-center sm:mb-12 sm:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#ee6669] shadow-sm sm:gap-3 sm:px-8 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]"
            >
              <Calculator className="w-4 h-4" />
              Bhopal's Premium Interior Estimator
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl font-serif font-light leading-[1.05] tracking-tight text-[#222222] sm:text-5xl lg:text-6xl"
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
              desc="Full home renovation for apartments & villas."
              icon={Home}
              img="/images/living room.webp"
            />
            <CategoryCard 
              type="kitchen"
              title="Modular Kitchen"
              desc="Smart kitchens with world-class storage."
              icon={Zap}
              img="/images/kitchen.webp"
            />
            <CategoryCard 
              type="wardrobe"
              title="Luxury Wardrobes"
              desc="Bespoke designer wardrobes for premium homes."
              icon={Award}
              img="/images/wardrobe.webp"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-8 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400 sm:gap-8 sm:pt-12 sm:text-[10px] sm:tracking-[0.24em]"
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
    <section className="w-full bg-white py-12 min-h-[70vh]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Top Navigation & Progress */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-10">
           <button 
             onClick={() => step > 1 ? prevStep() : reset()} 
             className="flex items-center gap-2.5 text-zinc-400 hover:text-[#ee6669] font-bold text-[11px] uppercase tracking-[0.2em] transition-all group shrink-0"
           >
             <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-[#ee6669] transition-all">
                <ChevronLeft className="w-4 h-4" />
             </div>
             {step > 1 ? 'Go to Previous' : 'Change Category'}
           </button>
           
           <div className="flex-grow w-full space-y-4">
              <div className="flex justify-between items-end">
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                   Step 0{step} <span className="text-zinc-200 mx-2">/</span> 0{category === 'kitchen' ? 6 : 5}
                 </p>
                 <p className="text-[11px] font-bold text-[#ee6669] uppercase tracking-[0.2em]">
                   {Math.round((step / (category === 'kitchen' ? 6 : 5)) * 100)}% Completed
                 </p>
              </div>
              <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / (category === 'kitchen' ? 6 : 5)) * 100}%` }}
                  className="h-full bg-[#ee6669]" 
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
           </div>

           <div className="hidden md:flex items-center gap-4 shrink-0">
              <div className="h-10 w-px bg-zinc-100" />
              <div className="flex flex-col items-end">
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Project Location</span>
                 <span className="text-xs font-bold text-[#222222] flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#ee6669]" /> Bhopal, MP</span>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Questions Area */}
          <div className="lg:col-span-8 space-y-10">
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl space-y-10"
                >
                  <div className="w-32 h-32 bg-green-50 rounded-[2rem] flex items-center justify-center border border-green-100 shadow-2xl shadow-green-600/5 rotate-3">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222] leading-[1.05] tracking-tight">Your Estimate: <br /><span className="text-[#ee6669]">{predictedPrice ? formatPriceRange(predictedPrice) : 'Contacting Experts...'}</span></h3>
                    <p className="text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                      Thank you, {formData.name.split(' ')[0]}! Your personalized cost estimate range has been generated. One of our senior design experts will reach out within <span className="text-[#222222] font-medium underline decoration-[#ee6669] decoration-2 underline-offset-4">24 hours</span> to discuss your Bhopal home project.
                    </p>
                  </div>
                  <div className="pt-12 border-t border-zinc-100 flex flex-col sm:flex-row gap-8">
                    <Button className="bg-[#222222] hover:bg-[#ee6669] text-white px-10 h-14 sm:h-16 rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl transition-all" onClick={() => router.push('/projects')}>
                        VIEW COMPLETED PROJECTS
                    </Button>
                    <Button variant="outline" className="border-zinc-200 px-10 h-14 sm:h-16 rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-50 transition-all" onClick={reset}>
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
                    <div className="space-y-10">
                      {step === 1 && (
                        <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">What is the <span className="text-[#ee6669]">BHK Type?</span></h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, bhk: item}); nextStep(); }}
                                className={cn(
                                  "h-56 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-5 group relative overflow-hidden active:scale-95 md:active:scale-100",
                                  formData.bhk === item ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-[0_24px_48px_-12px_rgba(238,102,105,0.15)]" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                <span className={cn("text-5xl font-serif transition-all duration-700 group-hover:scale-110", formData.bhk === item ? "text-[#ee6669]" : "text-zinc-200 group-hover:text-zinc-300")}>{item.split(' ')[0]}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Bedroom</span>
                                {formData.bhk === item && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Which <span className="text-[#ee6669]">spaces</span> to include?</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                              { id: 'Kitchen', icon: Zap },
                              { id: 'Living Room Display', icon: Award },
                              { id: 'TV Unit', icon: Layout },
                              { id: 'False Ceiling', icon: Layers },
                              { id: 'Mandir', icon: Sparkles },
                              { id: 'Study Unit', icon: Briefcase },
                              { id: 'Sofa', icon: Home },
                              { id: 'Partition (Living Room)', icon: Maximize2 },
                            ].map(item => (
                              <button 
                                key={item.id} 
                                onClick={() => toggleSelection('spaces', item.id)}
                                className={cn(
                                  "p-8 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-8 text-center group relative overflow-hidden active:scale-95 md:active:scale-100",
                                  formData.spaces.includes(item.id) ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-[0_24px_48px_-12px_rgba(238,102,105,0.12)]" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                )}
                              >
                                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700", formData.spaces.includes(item.id) ? "bg-[#ee6669] text-white rotate-6" : "bg-zinc-50 group-hover:bg-[#ee6669]/10 group-hover:text-[#ee6669]")}>
                                   <item.icon className="w-8 h-8" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.id}</span>
                                {formData.spaces.includes(item.id) && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                          <div className="pt-8 flex flex-col md:flex-row items-center gap-10">
                             <Button onClick={nextStep} disabled={formData.spaces.length === 0} className="bg-[#222222] hover:bg-[#ee6669] text-white px-16 h-14 rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl group">
                               NEXT SELECTION <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                             </Button>
                             <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em] flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                                Select one or more spaces
                             </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Choose <span className="text-[#ee6669]">Interior Style</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {['Modern', 'Luxury', 'Minimal', 'Contemporary', 'Wooden Elegant'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, style: item}); nextStep(); }}
                                className={cn(
                                  "p-14 rounded-[2rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[11px] group relative overflow-hidden active:scale-95 md:active:scale-100",
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
                        <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Select <span className="text-[#ee6669]">Materials</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {['Laminate', 'Acrylic', 'PU Finish', 'Veneer'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, material: item}); nextStep(); }}
                                className={cn(
                                  "p-8 rounded-[2rem] border-2 transition-all duration-500 font-bold text-sm uppercase tracking-[0.24em] group relative active:scale-95 md:active:scale-100",
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
                    </div>
                  )}

                  {/* --- KITCHEN FLOW --- */}
                  {category === 'kitchen' && (
                    <div className="space-y-10">
                      {step === 1 && (
                        <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Kitchen <span className="text-[#ee6669]">Layout</span></h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {['L Shape', 'U Shape', 'Parallel', 'Straight', 'Island Kitchen'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, layout: item}); nextStep(); }}
                                className={cn(
                                  "p-14 rounded-[2rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[11px] text-center group relative overflow-hidden",
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
                        <div className="space-y-10">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Platform <span className="text-[#ee6669]">Dimensions</span></h3>
                          
                          {/* Visual Layout Guide - Moved above sliders */}
                          <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                             <div className="relative w-32 h-32 bg-white rounded-2xl border border-zinc-200 flex items-center justify-center overflow-hidden shadow-inner">
                                {formData.layout === 'Straight' && (
                                  <div className="w-20 h-4 bg-[#ee6669] rounded-sm relative">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#ee6669]">TOTAL</span>
                                  </div>
                                )}
                                {formData.layout === 'L Shape' && (
                                  <div className="w-20 h-20 relative">
                                    <div className="absolute top-0 left-0 w-4 h-20 bg-[#ee6669] rounded-sm" />
                                    <div className="absolute bottom-0 left-0 h-4 w-20 bg-[#ee6669] rounded-sm" />
                                    <span className="absolute top-1/2 -left-5 -translate-y-1/2 text-[10px] font-bold text-[#ee6669]">A</span>
                                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#ee6669]">B</span>
                                  </div>
                                )}
                                {formData.layout === 'Parallel' && (
                                  <div className="w-20 h-20 relative flex justify-between">
                                    <div className="w-4 h-20 bg-[#ee6669] rounded-sm relative">
                                      <span className="absolute top-1/2 -left-5 -translate-y-1/2 text-[10px] font-bold text-[#ee6669]">A</span>
                                    </div>
                                    <div className="w-4 h-20 bg-[#ee6669] rounded-sm relative">
                                      <span className="absolute top-1/2 -right-5 -translate-y-1/2 text-[10px] font-bold text-[#ee6669]">B</span>
                                    </div>
                                  </div>
                                )}
                                {formData.layout === 'U Shape' && (
                                  <div className="w-20 h-20 relative">
                                    <div className="absolute top-0 left-0 w-4 h-20 bg-[#ee6669] rounded-sm" />
                                    <div className="absolute bottom-0 left-0 h-4 w-20 bg-[#ee6669] rounded-sm" />
                                    <div className="absolute top-0 right-0 w-4 h-20 bg-[#ee6669] rounded-sm" />
                                    <span className="absolute top-1/2 -left-5 -translate-y-1/2 text-[10px] font-bold text-[#ee6669]">A</span>
                                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#ee6669]">B</span>
                                    <span className="absolute top-1/2 -right-5 -translate-y-1/2 text-[10px] font-bold text-[#ee6669]">C</span>
                                  </div>
                                )}
                             </div>
                             <div className="text-center md:text-left space-y-2">
                                <p className="text-sm font-bold text-[#222222] uppercase tracking-widest">{formData.layout} Guide</p>
                                <p className="text-xs text-zinc-500 max-w-[280px]">Match your kitchen's walls to the letters in the diagram to input the correct dimensions below.</p>
                             </div>
                          </div>
                          
                          {(formData.layout === 'L Shape' || formData.layout === 'Parallel') && (
                            <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
                              <div className="p-12 bg-white border border-zinc-100 rounded-[2rem] space-y-8 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                                 <div className="space-y-2">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.kitchenSideA / 12)} 
                                        onChange={(e) => setFormData({...formData, kitchenSideA: (Number(e.target.value) * 12) + (formData.kitchenSideA % 12)})} 
                                        className="w-24 text-right bg-transparent focus:outline-none text-8xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-4xl ml-1 mr-4">ft</span>
                                      <input 
                                        type="number" 
                                        value={formData.kitchenSideA % 12} 
                                        onChange={(e) => setFormData({...formData, kitchenSideA: (Math.floor(formData.kitchenSideA / 12) * 12) + Number(e.target.value)})} 
                                        className="w-20 text-right bg-transparent focus:outline-none text-8xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-4xl ml-1">in</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.5em]">{formData.layout === 'L Shape' ? 'Wall Side A' : 'Platform A'}</p>
                                 </div>
                                 <Slider 
                                  defaultValue={[formData.kitchenSideA]} 
                                  min={36} max={480} step={1} 
                                  className="w-full h-2"
                                  onValueChange={(val) => setFormData({...formData, kitchenSideA: val[0]})}
                                 />
                              </div>
                              <div className="p-12 bg-white border border-zinc-100 rounded-[2rem] space-y-8 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                                 <div className="space-y-2">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.kitchenSideB / 12)} 
                                        onChange={(e) => setFormData({...formData, kitchenSideB: (Number(e.target.value) * 12) + (formData.kitchenSideB % 12)})} 
                                        className="w-24 text-right bg-transparent focus:outline-none text-8xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-4xl ml-1 mr-4">ft</span>
                                      <input 
                                        type="number" 
                                        value={formData.kitchenSideB % 12} 
                                        onChange={(e) => setFormData({...formData, kitchenSideB: (Math.floor(formData.kitchenSideB / 12) * 12) + Number(e.target.value)})} 
                                        className="w-20 text-right bg-transparent focus:outline-none text-8xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-4xl ml-1">in</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.5em]">{formData.layout === 'L Shape' ? 'Wall Side B' : 'Platform B'}</p>
                                 </div>
                                 <Slider 
                                  defaultValue={[formData.kitchenSideB]} 
                                  min={36} max={480} step={1} 
                                  className="w-full h-2"
                                  onValueChange={(val) => setFormData({...formData, kitchenSideB: val[0]})}
                                 />
                              </div>
                            </div>
                          )}

                          {formData.layout === 'U Shape' && (
                            <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
                              <div className="p-10 bg-white border border-zinc-100 rounded-[2rem] space-y-8 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                                 <div className="space-y-2">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.kitchenSideA / 12)} 
                                        onChange={(e) => setFormData({...formData, kitchenSideA: (Number(e.target.value) * 12) + (formData.kitchenSideA % 12)})} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1 mr-2">ft</span>
                                      <input 
                                        type="number" 
                                        value={formData.kitchenSideA % 12} 
                                        onChange={(e) => setFormData({...formData, kitchenSideA: (Math.floor(formData.kitchenSideA / 12) * 12) + Number(e.target.value)})} 
                                        className="w-14 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1">in</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Side A</p>
                                 </div>
                                 <Slider 
                                  defaultValue={[formData.kitchenSideA]} 
                                  min={36} max={480} step={1} 
                                  className="w-full h-2"
                                  onValueChange={(val) => setFormData({...formData, kitchenSideA: val[0]})}
                                 />
                              </div>
                              <div className="p-10 bg-white border border-zinc-100 rounded-[2rem] space-y-8 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                                 <div className="space-y-2">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.kitchenSideB / 12)} 
                                        onChange={(e) => setFormData({...formData, kitchenSideB: (Number(e.target.value) * 12) + (formData.kitchenSideB % 12)})} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1 mr-2">ft</span>
                                      <input 
                                        type="number" 
                                        value={formData.kitchenSideB % 12} 
                                        onChange={(e) => setFormData({...formData, kitchenSideB: (Math.floor(formData.kitchenSideB / 12) * 12) + Number(e.target.value)})} 
                                        className="w-14 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1">in</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Side B</p>
                                 </div>
                                 <Slider 
                                  defaultValue={[formData.kitchenSideB]} 
                                  min={36} max={480} step={1} 
                                  className="w-full h-2"
                                  onValueChange={(val) => setFormData({...formData, kitchenSideB: val[0]})}
                                 />
                              </div>
                              <div className="p-10 bg-white border border-zinc-100 rounded-[2rem] space-y-8 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                                 <div className="space-y-2">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.kitchenSideC / 12)} 
                                        onChange={(e) => setFormData({...formData, kitchenSideC: (Number(e.target.value) * 12) + (formData.kitchenSideC % 12)})} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1 mr-2">ft</span>
                                      <input 
                                        type="number" 
                                        value={formData.kitchenSideC % 12} 
                                        onChange={(e) => setFormData({...formData, kitchenSideC: (Math.floor(formData.kitchenSideC / 12) * 12) + Number(e.target.value)})} 
                                        className="w-14 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1">in</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Side C</p>
                                 </div>
                                 <Slider 
                                  defaultValue={[formData.kitchenSideC]} 
                                  min={36} max={480} step={1} 
                                  className="w-full h-2"
                                  onValueChange={(val) => setFormData({...formData, kitchenSideC: val[0]})}
                                 />
                              </div>
                            </div>
                          )}

                          {(formData.layout === 'Straight' || formData.layout === 'Island Kitchen') && (
                            <div className="max-w-3xl p-24 bg-white border border-zinc-100 rounded-[2rem] space-y-10 text-center shadow-[0_32px_64px_-16px_rgba(45,27,78,0.05)]">
                               <div className="space-y-4">
                                  <div className="flex items-baseline justify-center text-[#ee6669]">
                                    <input 
                                      type="number" 
                                      value={Math.floor(formData.platformLength / 12)} 
                                      onChange={(e) => setFormData({...formData, platformLength: (Number(e.target.value) * 12) + (formData.platformLength % 12)})} 
                                      className="w-32 text-right bg-transparent focus:outline-none text-[120px] font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                    />
                                    <span className="text-6xl ml-1 mr-6">ft</span>
                                    <input 
                                      type="number" 
                                      value={formData.platformLength % 12} 
                                      onChange={(e) => setFormData({...formData, platformLength: (Math.floor(formData.platformLength / 12) * 12) + Number(e.target.value)})} 
                                      className="w-24 text-right bg-transparent focus:outline-none text-[120px] font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                    />
                                    <span className="text-6xl ml-1">in</span>
                                  </div>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.5em]">Total Length</p>
                               </div>
                               <Slider 
                                defaultValue={[formData.platformLength]} 
                                min={60} max={600} step={1} 
                                className="w-full h-2"
                                onValueChange={(val) => setFormData({...formData, platformLength: val[0]})}
                               />
                            </div>
                          )}

                          <div className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
                              {formData.layout === 'L Shape' ? 'Adjust dimensions for both walls of your L-shaped kitchen' : 'Slide to adjust the total running length of your kitchen platform'}
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
                          </div>

                          <Button onClick={nextStep} className="bg-[#222222] hover:bg-[#ee6669] text-white px-10 h-14 sm:h-16 rounded-[2rem] font-bold uppercase tracking-[0.24em] text-[12px] shadow-2xl group transition-all w-full md:w-auto">
                            SET DIMENSIONS & PROCEED <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      )}

                      {step === 3 && (
                         <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Kitchen <span className="text-[#ee6669]">Finish</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {['Normal Mica', 'Acrylic', 'Premium Laminate', 'Glossy Acrylic', 'Matte PU'].map(item => (
                              <button 
                                key={item} 
                                onClick={() => { setFormData({...formData, kitchenFinish: item}); nextStep(); }}
                                className={cn(
                                  "p-10 rounded-[2rem] border-2 transition-all duration-500 font-bold text-sm uppercase tracking-[0.24em] group relative",
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
                        <div className="space-y-8">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Hardware <span className="text-[#ee6669]">System</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                              { id: 'Tandem Drawers', desc: 'Premium soft-close runner system' },
                              { id: 'Jali / Normal', desc: 'Economic basket system' },
                              { id: 'Perforated', desc: 'Durable ventilated baskets' }
                            ].map(item => (
                              <button 
                                key={item.id} 
                                onClick={() => { setFormData({...formData, kitchenHardware: item.id}); nextStep(); }}
                                className={cn(
                                  "p-10 rounded-[2rem] border-2 transition-all duration-500 text-left group relative",
                                  formData.kitchenHardware === item.id ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20"
                                )}
                              >
                                <p className="font-bold text-sm uppercase tracking-[0.24em] mb-2">{item.id}</p>
                                <p className="text-[10px] opacity-60 tracking-widest uppercase">{item.desc}</p>
                                {formData.kitchenHardware === item.id && <div className="absolute top-1/2 right-10 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ee6669]" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-12">
                          <div className="space-y-8">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Select <span className="text-[#ee6669]">Add-ons</span></h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                              {['Tall Unit', 'Corner Unit', 'Pantry', 'Rolling Shutter'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => toggleSelection('kitchenAccessories', item)}
                                  className={cn(
                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 flex items-center justify-center text-center group relative overflow-hidden active:scale-95 md:active:scale-100",
                                    formData.kitchenAccessories.includes(item) ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                  )}
                                >
                                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item}</span>
                                  {formData.kitchenAccessories.includes(item) && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="pt-8">
                            <Button onClick={nextStep} className="bg-[#222222] hover:bg-[#ee6669] text-white px-10 h-14 sm:h-16 rounded-[2rem] font-bold uppercase tracking-[0.24em] text-[12px] shadow-2xl group transition-all">
                              REVIEW SELECTIONS & PROCEED <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- WARDROBE FLOW --- */}
                  {category === 'wardrobe' && (
                     <div className="space-y-10">
                        {step === 1 && (
                          <div className="space-y-8">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Wardrobe <span className="text-[#ee6669]">Type</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {['Sliding', 'Hinged', 'Walk-in'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => { setFormData({...formData, wardrobeType: item}); nextStep(); }}
                                  className={cn(
                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[11px] group relative",
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
                          <div className="space-y-10">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Input <span className="text-[#ee6669]">Dimensions</span></h3>
                            <div className="grid md:grid-cols-2 gap-10 max-w-3xl">
                              <div className="space-y-8 p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem]">
                                 <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.wardrobeWidth)} 
                                        onChange={(e) => {
                                          const ft = Number(e.target.value);
                                          const inches = (formData.wardrobeWidth % 1) * 12;
                                          setFormData({...formData, wardrobeWidth: ft + (inches / 12)});
                                        }} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1 mr-4">ft</span>
                                      <input 
                                        type="number" 
                                        value={Math.round((formData.wardrobeWidth % 1) * 12)} 
                                        onChange={(e) => {
                                          const ft = Math.floor(formData.wardrobeWidth);
                                          const inches = Number(e.target.value);
                                          setFormData({...formData, wardrobeWidth: ft + (inches / 12)});
                                        }} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1">in</span>
                                    </div>
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em]">Wardrobe Width</label>
                                 </div>
                                 <Slider 
                                    defaultValue={[formData.wardrobeWidth]} 
                                    min={3} max={20} step={1/12} 
                                    className="w-full h-2"
                                    onValueChange={(val) => setFormData({...formData, wardrobeWidth: val[0]})}
                                 />
                              </div>
                              <div className="space-y-8 p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem]">
                                 <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                                    <div className="flex items-baseline justify-center text-[#ee6669]">
                                      <input 
                                        type="number" 
                                        value={Math.floor(formData.wardrobeHeight)} 
                                        onChange={(e) => {
                                          const ft = Number(e.target.value);
                                          const inches = (formData.wardrobeHeight % 1) * 12;
                                          setFormData({...formData, wardrobeHeight: ft + (inches / 12)});
                                        }} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1 mr-4">ft</span>
                                      <input 
                                        type="number" 
                                        value={Math.round((formData.wardrobeHeight % 1) * 12)} 
                                        onChange={(e) => {
                                          const ft = Math.floor(formData.wardrobeHeight);
                                          const inches = Number(e.target.value);
                                          setFormData({...formData, wardrobeHeight: ft + (inches / 12)});
                                        }} 
                                        className="w-16 text-right bg-transparent focus:outline-none text-6xl font-serif font-light tracking-tighter leading-none border-b-2 border-transparent hover:border-zinc-200 focus:border-[#ee6669] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all" 
                                      />
                                      <span className="text-3xl ml-1">in</span>
                                    </div>
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em]">Wardrobe Height</label>
                                 </div>
                                 <Slider 
                                    defaultValue={[formData.wardrobeHeight]} 
                                    min={5} max={12} step={1/12} 
                                    className="w-full h-2"
                                    onValueChange={(val) => setFormData({...formData, wardrobeHeight: val[0]})}
                                 />
                              </div>
                            </div>
                            <Button onClick={nextStep} className="bg-[#222222] hover:bg-[#ee6669] text-white px-10 h-14 sm:h-16 rounded-[2rem] font-bold uppercase tracking-[0.24em] text-[12px] shadow-2xl transition-all group">
                              SAVE DIMENSIONS <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-8">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Finish <span className="text-[#ee6669]">Type</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {['Mica', 'Acrylic', 'Premium Matt Finish', 'Veneer'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => { setFormData({...formData, wardrobeFinish: item}); nextStep(); }}
                                  className={cn(
                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 font-bold text-sm uppercase tracking-[0.24em] group relative",
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
                          <div className="space-y-8">
                            <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222]">Internal <span className="text-[#ee6669]">Accessories</span></h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                              {['Drawers', 'Shoe Rack', 'Jewelry Unit', 'Full Mirror', 'Pull Down Hanger', 'Trouser Organiser'].map(item => (
                                <button 
                                  key={item} 
                                  onClick={() => toggleSelection('wardrobeAccessories', item)}
                                  className={cn(
                                    "p-8 rounded-[2rem] border-2 transition-all duration-500 flex items-center justify-center text-center group relative overflow-hidden",
                                    formData.wardrobeAccessories.includes(item) ? "border-[#ee6669] bg-[#ee6669]/5 text-[#ee6669] shadow-xl" : "border-zinc-50 bg-white text-zinc-400 hover:border-[#ee6669]/20 hover:shadow-xl"
                                  )}
                                >
                                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item}</span>
                                  {formData.wardrobeAccessories.includes(item) && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#ee6669]" />}
                                </button>
                              ))}
                            </div>
                            <div className="pt-8">
                               <Button onClick={nextStep} className="bg-[#222222] hover:bg-[#ee6669] text-white px-10 h-14 sm:h-16 rounded-[2rem] font-bold uppercase tracking-[0.24em] text-[12px] shadow-2xl transition-all group">
                                 REVIEW & GET QUOTE <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                               </Button>
                            </div>
                          </div>
                        )}
                     </div>
                  )}

                  {/* --- SHARED CONTACT FORM (FINAL STEP) --- */}
                  {((category === 'home' && step === 5) || (category === 'kitchen' && step === 6) || (category === 'wardrobe' && step === 5)) && (

                     <div className="max-w-3xl space-y-10">
                        <div className="space-y-6">
                          <h3 className="text-4xl lg:text-6xl font-serif font-light text-[#222222] leading-[1.1] tracking-tight">
                            Almost <span className="text-[#ee6669]">Done!</span>
                          </h3>
                          <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                            Our experts are calculating your exact cost in the background. Fill out this form to reveal your estimate and receive a detailed quotation on WhatsApp.
                          </p>
                        </div>
                        
                        <form onSubmit={handleFinalSubmit} className="space-y-10">
                          <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em] ml-2 flex items-center gap-3"><User className="w-4 h-4" /> Full Name</label>
                              <Input 
                                placeholder="Rajesh Kumar" 
                                required
                                className="h-14 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm px-8" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em] ml-2 flex items-center gap-3"><Mail className="w-4 h-4" /> Email Address</label>
                              <Input 
                                placeholder="rajesh@example.com" 
                                type="email"
                                required
                                className="h-14 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm px-8" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em] ml-2 flex items-center gap-3"><Phone className="w-4 h-4" /> Phone Number</label>
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
                              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.24em] ml-2 flex items-center gap-3"><Building className="w-4 h-4" /> Project Location</label>
                              <Input 
                                placeholder="Arera Colony, Bhopal" 
                                required
                                className="h-14 rounded-[1.5rem] border-zinc-100 bg-zinc-50 focus:bg-white focus:ring-4 focus:ring-[#ee6669]/5 transition-all text-sm px-8" 
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
                             <Button disabled={isSubmitting} type="submit" className="w-full h-14 sm:h-16 bg-[#ee6669] hover:bg-[#222222] text-white font-bold uppercase tracking-[0.24em] text-[12px] rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(238,102,105,0.25)] transition-all active:scale-[0.98] group relative overflow-hidden">
                               <span className="relative z-10 flex items-center justify-center">
                                  {isSubmitting ? 'CALCULATING...' : 'GET MY DETAILED QUOTE'} {!isSubmitting && <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />}
                               </span>
                               <div className="absolute inset-0 bg-[#222222] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                             </Button>
                             <p className="text-[9px] text-zinc-400 text-center mt-10 leading-relaxed uppercase tracking-[0.25em] font-medium opacity-60">
                                By continuing, you agree to our <span className="text-[#222222] font-bold underline cursor-pointer">Privacy Policy</span>. Your data is encrypted and secure.
                             </p>
                          </div>
                        </form>
                     </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back Navigation */}
            {!submitted && step > 1 && step < 6 && (
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
