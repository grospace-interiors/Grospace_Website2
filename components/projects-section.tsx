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
    <section id="projects" className="w-full py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
        {limit && (
          <>
            <h2 className="text-4xl lg:text-6xl font-serif font-light text-[#2d1b4e] mb-6 tracking-tight leading-tight">
              Real Homes, <span className="text-[#ee6669]">Real Stories.</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
              Every home we design tells a story of a family's dreams coming to life. Discover our latest transformations across Bhopal.
            </p>
          </>
        )}
        
        <ProjectsClient projects={projects} limit={limit} />
        
        {limit && (
          <div className="mt-20 text-center">
            <a 
              href="/projects" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#2d1b4e] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#ee6669] transition-all duration-500"
            >
              View Full Portfolio
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
