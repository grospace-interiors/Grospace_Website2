'use client'

import * as React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

interface ProjectImageViewerProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string | null
  title?: string
}

export function ProjectImageViewer({ isOpen, onClose, imageSrc, title }: ProjectImageViewerProps) {
  if (!imageSrc) return null

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[101] flex flex-col items-center justify-center focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Accessibility: Title and Description */}
          <DialogPrimitive.Title className="sr-only">
            {title || 'Project image viewer'}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Full screen image viewer for {title || 'the selected project'}.
          </DialogPrimitive.Description>

          {/* Close Area (Click anywhere to close) */}
          <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={onClose} />

          {/* Close Button */}
          <DialogPrimitive.Close className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white/70 transition-all hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Image Container */}
          <div className="relative z-10 h-[85vh] w-[90vw] md:h-[80vh] md:w-[80vw] pointer-events-none">
            <Image
              src={imageSrc}
              alt={title || 'Project image'}
              fill
              className="object-contain drop-shadow-2xl"
              unoptimized
              priority
            />
          </div>

          {/* Caption */}
          {title && (
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center px-6 text-center pointer-events-none">
              <p className="max-w-2xl text-sm font-light tracking-[0.15em] text-white/80 uppercase drop-shadow-md border-t border-white/10 pt-4">
                {title}
              </p>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
