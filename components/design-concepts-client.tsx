'use client'

import Image from 'next/image'
import { useState } from 'react'
import { type Visualization, type VisualizationCategory } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ProjectImageViewer } from '@/components/project-image-viewer'
import { useBackButtonModal } from '@/hooks/use-back-button-modal'

interface DesignConceptsClientProps {
  categories: VisualizationCategory[]
  visualizations: Visualization[]
  limit?: number
}

export function DesignConceptsClient({ categories, visualizations, limit }: DesignConceptsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerImage, setViewerImage] = useState<string | null>(null)
  const [viewerTitle, setViewerTitle] = useState<string>('')

  // Sync back button with viewer
  useBackButtonModal(isViewerOpen, () => setIsViewerOpen(false));

  const filteredVisualizations = (selectedCategory === 'all'
    ? visualizations
    : visualizations.filter(v => v.category_id === selectedCategory)
  ).slice(0, limit);

  const openImageViewer = (concept: Visualization) => {
    setViewerImage(concept.image_url)
    setViewerTitle(concept.title)
    setIsViewerOpen(true)
  }

  return (
    <>
      {/* Category Filters */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <button 
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredVisualizations.map((concept) => (
          <button
            key={concept.id}
            type="button"
            className="group relative overflow-hidden bg-muted aspect-square cursor-pointer text-left w-full"
            onClick={() => openImageViewer(concept)}
          >
            {/* Image */}
            <Image
              src={concept.image_url || "/placeholder.svg"}
              alt={`${concept.title} — Grospace design concept`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />

            {/* Content */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-serif font-light text-white text-pretty">
                  {concept.title}
                </h3>
                <div className="inline-block">
                  <span className="text-xs uppercase tracking-[0.1em] text-white/90 font-medium border border-white/40 px-3 py-1.5">
                    3D Design Concept
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Full-screen Image Viewer with Zoom */}
      <ProjectImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        imageSrc={viewerImage}
        title={viewerTitle}
      />
    </>
  )
}
