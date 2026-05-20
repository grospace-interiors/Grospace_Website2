'use client'

import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'

const WHATSAPP_NUMBER = '918319032087'
const PHONE_NUMBER = '+918319032087'

export function MobileCtaBar() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I'm interested in a free site visit."
  )}`

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-zinc-200 bg-white/95 px-3 py-2 shadow-[0_-12px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.35fr] gap-2">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex h-12 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white text-[10px] font-bold uppercase tracking-[0.12em] text-[#2d1b4e]"
          aria-label="Call Grospace Interiors"
        >
          <Phone className="h-4 w-4 text-[#ee6669]" />
          Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] text-[10px] font-bold uppercase tracking-[0.12em] text-white"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </a>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-lead-modal'))}
          className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#ee6669] text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#ee6669]/20"
        >
          <CalendarCheck className="h-4 w-4" />
          Free Visit
        </button>
      </div>
    </div>
  )
}
