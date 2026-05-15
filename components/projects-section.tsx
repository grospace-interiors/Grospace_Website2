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
    <div id="projects" className="w-full">
      <ProjectsClient projects={projects} limit={limit} />
    </div>
  )
}
