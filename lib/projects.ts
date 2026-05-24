import { supabase } from './supabase'
import { Project } from './types'

/**
 * Fetches projects from the database with optional filtering.
 * @param options.featured - If true, only fetches featured projects.
 * @param options.activeOnly - If true (default), only fetches active projects.
 * @param options.limit - Optional limit on the number of projects returned.
 */
export async function getProjects({
  featured = false,
  activeOnly = true,
  limit
}: {
  featured?: boolean;
  activeOnly?: boolean;
  limit?: number;
} = {}) {
  try {
    let query = supabase
      .from('projects')
      .select('*')

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    if (featured) {
      query = query.eq('is_featured', true)
    }

    query = query
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return data as Project[]
  } catch (err) {
    console.error('Unexpected error fetching projects:', err)
    return []
  }
}

/**
 * Fetches a single project by its ID or Slug.
 * Note: Assumes 'id' is used for unique identification.
 */
export async function getProjectById(id: string) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error(`Error fetching project ${id}:`, error)
      return null
    }

    return data as Project
  } catch (err) {
    console.error(`Unexpected error fetching project ${id}:`, err)
    return null
  }
}
