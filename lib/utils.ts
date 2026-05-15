import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProxyImageUrl(pathOrUrl: string | null | undefined): string {
  if (!pathOrUrl) return '/placeholder.svg'
  
  // If it's a "broken" proxy URL (missing ?) fix it
  if (pathOrUrl.startsWith('/api/proxy-image') && !pathOrUrl.includes('?')) {
    const parts = pathOrUrl.split('/api/proxy-image')
    if (parts.length > 1) {
      const rest = parts[1]
      if (rest.startsWith('path=')) return `/api/proxy-image?${rest}`
      if (rest.startsWith('url=')) return `/api/proxy-image?${rest}`
      return `/api/proxy-image?path=${encodeURIComponent(rest)}`
    }
  }

  // If it's already a correctly proxied URL, return it
  if (pathOrUrl.startsWith('/api/proxy-image')) {
    return pathOrUrl
  }

  if (!pathOrUrl.startsWith('http') && !pathOrUrl.startsWith('/')) {
    return `/api/proxy-image?path=${encodeURIComponent(pathOrUrl)}`
  }

  if (pathOrUrl.includes('.supabase.co/storage/v1/object/public/')) {
    const parts = pathOrUrl.split('/storage/v1/object/public/')
    if (parts.length > 1) {
      return `/api/proxy-image?path=${encodeURIComponent(parts[1])}`
    }
  }

  if (pathOrUrl.startsWith('http')) {
     return `/api/proxy-image?url=${encodeURIComponent(pathOrUrl)}`
  }


  return pathOrUrl
}
