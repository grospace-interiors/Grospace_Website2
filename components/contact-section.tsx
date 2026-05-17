'use client'

import React from "react"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    location: '',
  })

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('loading');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: 'contact_form',
          details: {
            message: formData.message,
            location: formData.location
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setSubmissionStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '', location: '' }); // Reset form
      setTimeout(() => setSubmissionStatus('idle'), 3000); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus('idle'), 3000);
    }
  };

  const getButtonText = () => {
    if (submissionStatus === 'loading') {
      return 'Sending...';
    }
    if (submissionStatus === 'success') {
      return 'Thank you! We\'ll call you soon.';
    }
    if (submissionStatus === 'error') {
      return 'Submission failed. Please try again.';
    }
    return 'Book Free Consultation';
  };

  return (
    <section id="contact" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white text-zinc-900">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-widest text-xs font-medium mb-4">Direct Enquiry</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-zinc-900 text-balance mb-6">
            Let's Start Your Dream Project
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
            Ready to grow your space? Fill out the form below and our Bhopal experts will reach out to you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Full Name*
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nandlal Kushwaha"
                required
                className="bg-zinc-50 border-zinc-200 focus:border-primary text-zinc-900 placeholder:text-zinc-400 rounded-lg h-12"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Phone Number*
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
                className="bg-zinc-50 border-zinc-200 focus:border-primary text-zinc-900 placeholder:text-zinc-400 rounded-lg h-12"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Email Address*
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nandlal@example.com"
                required
                className="bg-zinc-50 border-zinc-200 focus:border-primary text-zinc-900 placeholder:text-zinc-400 rounded-lg h-12"
              />
            </div>

            {/* Site Location */}
            <div>
              <label htmlFor="location" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
                Site Location (Optional)
              </label>
              <Input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Arera Colony, Bhopal"
                className="bg-zinc-50 border-zinc-200 focus:border-primary text-zinc-900 placeholder:text-zinc-400 rounded-lg h-12"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">
              How can we help you?*
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              required
              className="bg-zinc-50 border-zinc-200 focus:border-primary text-zinc-900 placeholder:text-zinc-400 rounded-lg min-h-[120px]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 transform hover:scale-[1.02] rounded-lg shadow-lg hover:shadow-xl"
            disabled={submissionStatus === 'loading' || submissionStatus === 'success'}
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </section>
  )
}
