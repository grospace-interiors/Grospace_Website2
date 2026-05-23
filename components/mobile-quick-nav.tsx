'use client'

import Link from 'next/link'
import { Package, LayoutGrid, Calculator, Briefcase } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MobileQuickNav() {
  const pathname = usePathname()
  
  const items = [
    { label: 'Services', icon: Briefcase, href: '/services' },
    { label: 'Packages', icon: Package, href: '/packages' },
    { label: 'Portfolio', icon: LayoutGrid, href: '/projects' },
    { label: 'Calculator', icon: Calculator, href: '/pc' },
  ]

  return (
    <div className="lg:hidden w-full bg-white border-b border-zinc-100 py-1.5 px-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between min-w-full gap-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[64px] transition-all active:scale-95",
                isActive ? "opacity-100" : "opacity-60"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                isActive ? "bg-[#ee6669] text-white shadow-lg shadow-[#ee6669]/10" : "bg-zinc-50 text-[#222222]"
              )}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className={cn(
                "text-[8px] font-bold uppercase tracking-widest",
                isActive ? "text-[#ee6669]" : "text-zinc-400"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
