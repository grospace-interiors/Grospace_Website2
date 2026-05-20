import { supabase } from '@/lib/supabase'
import { DesignConceptsClient } from './design-concepts-client'
import { getProxyImageUrl } from '@/lib/utils'

export async function DesignConceptsSection({ limit }: { limit?: number }) {
  // Fetch data on the server
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('visualization_categories')
    .select('*')
    .order('name')

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }

  const { data: visualizationsData, error: visualizationsError } = await supabase
    .from('visualizations')
    .select('*')
    .order('created_at', { ascending: false })

  if (visualizationsError) {
    console.error('Error fetching visualizations:', visualizationsError)
  }

  const proxiedVisualizations = (visualizationsData || []).map(v => ({
    ...v,
    image_url: getProxyImageUrl(v.image_url)
  }))

  return (
    <section className="w-full bg-white py-16 md:py-24 text-zinc-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-4">
            Design Concepts
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-zinc-900 text-balance">
            3D Visualizations
          </h2>
          <p className="text-lg text-zinc-600 mt-6 max-w-2xl">
            Explore our design concepts and architectural visualizations that bring your space to life before execution.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-primary" />
        </div>

        {/* Client component for filters and grid display */}
        <DesignConceptsClient 
          categories={categoriesData || []} 
          visualizations={proxiedVisualizations} 
          limit={limit} 
        />

        {/* View All Button */}
        {limit && (
          <div className="text-center mt-12">
            <a href="/projects" className="inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white h-12 px-8">
              Explore More Concepts
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
