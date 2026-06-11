"use client"

import { MessageCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import * as fp from '@/lib/fpixel'

export function WhatsAppFab() {
  const WHATSAPP_NUMBER = '918319032087' // Replace with your WhatsApp number
  const prefilledMessage = "Hi, I'm interested in a free site visit."
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fp.customEvent('WhatsAppClick', { location: 'fab' })}
            className="fixed bottom-6 right-6 z-50 hidden rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-colors duration-300 hover:bg-[#128C7E] md:flex"
          >
            <MessageCircle className="w-8 h-8" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
