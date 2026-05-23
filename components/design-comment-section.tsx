'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Send, Star } from 'lucide-react'

export function DesignCommentSection() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  // Form State
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !text) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('design_comments')
        .insert([{ user_name: name, comment_text: text, rating: rating }])

      if (error) throw error
      
      setSubmitted(true)
      setName('')
      setText('')
      setRating(5)
    } catch (err) {
      console.error('Error posting comment:', err)
      alert('Failed to post comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative py-12 lg:py-16 bg-[#222222] overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ee6669]/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-5">
        
        {/* Header - Dark Theme */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl lg:text-4xl font-serif font-light text-white">Share Your Story</h2>
          <p className="text-zinc-400 text-xs lg:text-sm font-light max-w-lg mx-auto">
            If we've helped build your dream home, we'd love to hear your experience. Verified stories will be featured in our family gallery above.
          </p>
        </div>

        {/* Comment Form - Dark Theme & Minimal */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Name</label>
                    <Input 
                      placeholder="Your Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#2a2a2a] border-white/5 focus:border-[#ee6669] text-white h-11 rounded-lg text-sm placeholder:text-zinc-600"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Rating</label>
                    <div className="flex items-center gap-1 h-11 px-3 bg-[#2a2a2a] rounded-lg border border-white/5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star 
                            className={`w-5 h-5 ${
                              (hoverRating || rating) >= star 
                                ? 'fill-[#ee6669] text-[#ee6669]' 
                                : 'text-[#3a3a3a]'
                            } transition-colors duration-200`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Your Grospace Experience</label>
                  <Textarea 
                    placeholder="Tell us about your home transformation..." 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="bg-[#2a2a2a] border-white/5 focus:border-[#ee6669] text-white min-h-[80px] rounded-xl p-3 text-sm placeholder:text-zinc-600"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-[#ee6669] hover:bg-white hover:text-[#222222] text-white px-8 h-12 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-500 shadow-xl shadow-[#ee6669]/20"
                >
                  {submitting ? 'Sending...' : 'Submit Story'} <Send className="w-3 h-3 ml-2" />
                </Button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-4"
              >
                <div className="w-12 h-12 bg-[#ee6669]/10 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6 text-[#ee6669]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-serif text-white">Story Received</h3>
                  <p className="text-zinc-400 text-xs font-light max-w-xs mx-auto leading-relaxed">
                    Your story is being <span className="text-[#ee6669] font-medium italic">verified</span> by our team and will be visible in the gallery once approved.
                  </p>
                </div>
                <Button 
                  variant="link" 
                  onClick={() => setSubmitted(false)}
                  className="text-[#ee6669] text-[9px] font-bold uppercase tracking-widest p-0 h-auto"
                >
                  Write Another
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
