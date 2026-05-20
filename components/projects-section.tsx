'use client'

import { supabase } from '@/lib/supabase'
import { ProjectsClient } from './projects-client'
import { useEffect, useState } from 'react'

async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    return data
  } catch (err) {
    console.error('Unexpected error fetching projects:', err)
    return []
  }
}

export function ProjectsSection({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getProjects()
      setProjects(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-6">
         <div className="w-12 h-12 border-2 border-zinc-100 border-t-[#ee6669] rounded-full animate-spin" />
         <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Loading Portfolio...</p>
      </div>
    )
  }

  return (
    <section id="projects" className="w-full overflow-hidden bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 text-center lg:px-8">
        {limit && (
          <>
            <h2 className="mb-4 text-3xl font-serif font-light leading-tight tracking-tight text-[#2d1b4e] sm:mb-6 sm:text-4xl lg:text-5xl">
              Real Homes, <span className="text-[#ee6669]">Real Stories.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-sm font-light leading-relaxed text-zinc-500 sm:mb-10 sm:text-lg">
              Every home we design tells a story of a family's dreams coming to life. Discover our latest transformations across Bhopal.
            </p>
          </>
        )}
        
        <ProjectsClient projects={projects} limit={limit} />
        
        {limit && (
          <div className="mt-12 text-center">
            <a 
              href="/projects" 
              className="inline-flex max-w-full items-center gap-3 rounded-2xl bg-[#2d1b4e] px-8 py-4 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-xl transition-all duration-500 hover:bg-[#ee6669] sm:px-10 sm:py-5 sm:text-[10px] sm:tracking-[0.2em]"
            >
              View Full Portfolio
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
