import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Helper to get server-side supabase client for website
const getSupabaseServer = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let urlParam = searchParams.get('url')
  let pathParam = searchParams.get('path')

  // Security: Prevent hotlinking
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererHostname = refererUrl.hostname
      const currentHost = host?.split(':')[0] || ''
      if (refererHostname !== currentHost && refererHostname !== 'localhost' && !refererHostname.includes('vercel.app')) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    } catch (e) {}
  }

  // Self-healing for broken URLs
  if (!pathParam && !urlParam) {
    const fullUrl = request.url;
    if (fullUrl.includes('proxy-imagepath=')) {
        pathParam = fullUrl.split('proxy-imagepath=')[1];
    } else if (fullUrl.includes('proxy-imageurl=')) {
        urlParam = fullUrl.split('proxy-imageurl=')[1];
    }
  }

  if (!urlParam && !pathParam) {
    return new NextResponse('Missing Path', { status: 400 })
  }

  try {
    const supabase = getSupabaseServer()
    let bucket = ''
    let key = ''

    if (pathParam) {
      const decodedPath = decodeURIComponent(pathParam)
      const parts = decodedPath.split('/')
      bucket = parts[0]
      key = parts.slice(1).join('/')
    } else if (urlParam) {
      const decodedUrl = decodeURIComponent(urlParam)
      if (decodedUrl.includes('/storage/v1/object/public/')) {
        const pathAfterPublic = decodedUrl.split('/storage/v1/object/public/')[1]
        const parts = pathAfterPublic.split('/')
        bucket = parts[0]
        key = parts.slice(1).join('/')
      }
    }

    const allowedBuckets = ['project-images', '3d-visualizations']
    if (!allowedBuckets.includes(bucket)) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const { data, error } = await supabase.storage.from(bucket).download(key)

    if (error || !data) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const buffer = await data.arrayBuffer()
    const headers = new Headers()
    headers.set('Content-Type', data.type || 'image/png')
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    return new NextResponse(buffer, { status: 200, headers })
  } catch (error) {
    return new NextResponse('Error', { status: 500 })
  }
}
