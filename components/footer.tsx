'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Phone, Mail, MapPin, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

export function Footer() {
  const footerLinks = [
    {
      title: 'Offerings',
      links: [
        { label: 'Modular Kitchen', href: '#' },
        { label: 'Wardrobes', href: '#' },
        { label: 'Full Home Interiors', href: '#' },
        { label: 'Luxury Interiors', href: '#' },
        { label: 'Commercial Interiors', href: '#' },
      ],
    },
    {
      title: 'Get Inspired',
      links: [
        { label: 'Design Ideas', href: '#' },
        { label: 'Magazine', href: '#' },
        { label: 'Grospace TV', href: '#' },
        { label: 'Customer Reviews', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'How it works', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
      ],
    },
  ]

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-[#332233] text-white pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            {/* Brand & Social */}
            <div className="lg:col-span-1 space-y-8">
              <Link href="/" className="text-3xl font-bold tracking-tighter uppercase">
                Grospace Interiors
              </Link>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-4">
                 <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Download our app</p>
                 <div className="flex gap-3">
                   <div className="h-10 w-32 bg-zinc-800 rounded border border-white/10 flex items-center justify-center cursor-pointer">
                      <span className="text-[10px] font-bold">GET IT ON Google Play</span>
                   </div>
                   <div className="h-10 w-32 bg-zinc-800 rounded border border-white/10 flex items-center justify-center cursor-pointer">
                      <span className="text-[10px] font-bold">Download on App Store</span>
                   </div>
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
                    <a href="tel:+919926987123" className="text-sm font-medium hover:text-[#ee6669] transition-colors">+91 99269 87123</a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-[#ee6669] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Email us</p>
                    <a href="mailto:care@grospaceinteriors.com" className="text-sm font-medium hover:text-[#ee6669] transition-colors">care@grospaceinteriors.com</a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-[#ee6669] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Visit us</p>
                    <p className="text-sm text-zinc-400">Arera Colony, Bhopal, Madhya Pradesh</p>
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
               <Link href="#" className="text-xs text-zinc-500 hover:text-white">Terms of Use</Link>
               <Link href="#" className="text-xs text-zinc-500 hover:text-white">Privacy Policy</Link>
               <Link href="#" className="text-xs text-zinc-500 hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
