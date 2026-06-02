'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Linkedin, Phone, Mail, MapPin, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

export function Footer() {
  const footerLinks = [
    {
      title: 'Offerings',
      links: [
        { label: 'Modular Kitchen', href: '/lp/landing-page' },
        { label: 'Wardrobes', href: '/lp/landing-page' },
        { label: 'Full Home Interiors', href: '/services/full-home-interiors' },
        { label: 'Luxury Interiors', href: '/services/luxury-interiors' },
        { label: 'Commercial Interiors', href: '/services' },
      ],
    },
    {
      title: 'Get Inspired',
      links: [
        { label: 'Design Ideas', href: '/design-library' },
        { label: 'Customer Reviews', href: '/#testimonials' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'How it works', href: '/#process' },
        { label: 'Careers', href: '#' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
      ],
    },
  ]

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-[#222222] text-white pt-16 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand & Social */}
            <div className="lg:col-span-1 space-y-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full flex items-center justify-center bg-transparent">
                   <Image 
                     src="/images/logo.png" 
                     alt="Mark" 
                     fill 
                     sizes="48px"
                     className="object-cover"
                   />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="text-2xl font-bold uppercase tracking-tighter text-white">
                    Grospace
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ee6669]">
                    Interiors
                  </span>
                </div>
              </Link>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61589078587056" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/grospace.interiors?igsh=dGloZzBncG85OXM=" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((col) => (
              <div key={col.title} className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">{col.title}</h3>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Contact Us</h3>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-[#ee6669] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Call us</p>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+919926987123" className="text-sm font-medium hover:text-[#ee6669] transition-colors">+91 99269 87123</a>
                      <a href="tel:+918319032087" className="text-sm font-medium hover:text-[#ee6669] transition-colors">+91 83190 32087</a>
                    </div>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-[#ee6669] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Email us</p>
                    <a href="mailto:grospaceinteriors@gmail.com" className="text-sm font-medium hover:text-[#ee6669] transition-colors">grospaceinteriors@gmail.com</a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-[#ee6669] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Visit us</p>
                    <p className="text-sm text-zinc-400">Sonagiri, Bhopal, Madhya Pradesh</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-zinc-500">
              © 2024 Grospace Interiors. All rights reserved.
            </p>
            <div className="flex gap-8">
               <Link href="/terms" className="text-xs text-zinc-500 hover:text-white">Terms of Use</Link>
               <Link href="/privacy" className="text-xs text-zinc-500 hover:text-white">Privacy Policy</Link>
               <Link href="/cookies" className="text-xs text-zinc-500 hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
