'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProjectImageViewer } from '@/components/project-image-viewer'
import { useBackButtonModal } from '@/hooks/use-back-button-modal';
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Maximize2, MapPin, Clock, Layout, Sparkles } from 'lucide-react'

import { Project } from '@/lib/types'

interface ProjectsClientProps {
  projects: Project[]
  limit?: number
}

const CATEGORIES = [
  'All Projects',
  'Full Home',
  'Kitchen',
  'Wardrobes',
  'Renovation',
  'Luxury Interiors'
]

export function ProjectsClient({ projects, limit }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerImage, setViewerImage] = useState<string | null>(null)
  const [viewerTitle, setViewerTitle] = useState<string>('')

  // Sync back button with modals
  useBackButtonModal(isDialogOpen, () => setIsDialogOpen(false));
  useBackButtonModal(isViewerOpen, () => setIsViewerOpen(false));

  const filteredProjects = useMemo(() => {
    let filtered = projects
    if (activeCategory !== 'All Projects') {
      filtered = projects.filter(p => p.category === activeCategory)
    }
    return limit ? filtered.slice(0, limit) : filtered
  }, [projects, activeCategory, limit])

  const handleProjectClick = (project: Project) => {
    window.dispatchEvent(new CustomEvent('open-lead-modal-engagement'));
    setSelectedProject(project);
    setIsDialogOpen(true);
  }

  const openImageViewer = (imgSrc: string, title: string) => {
    setViewerImage(imgSrc)
    setViewerTitle(title)
    setIsViewerOpen(true)
  }

  return (
    <>
      {/* Category Filters */}
      {!limit && (
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border",
                activeCategory === cat 
                  ? "bg-[#222222] text-white border-[#222222] shadow-xl shadow-[#222222]/20" 
                  : "bg-white text-zinc-400 border-zinc-100 hover:border-[#ee6669]/30 hover:text-[#ee6669]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className={cn(
        "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 lg:gap-12",
        limit ? "md:grid-cols-2 lg:grid-cols-12" : "md:grid-cols-2 lg:gap-12"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "min-w-[86%] snap-center md:min-w-0",
                limit && (
                  index % 4 === 0 ? "lg:col-span-7" :
                  index % 4 === 1 ? "lg:col-span-5" :
                  index % 4 === 2 ? "lg:col-span-5" :
                  "lg:col-span-7"
                )
              )}
            >
              <button
                type="button"
                className="group relative w-full text-left outline-none"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image Container */}
                <div className={cn(
                  "relative overflow-hidden rounded-[2.5rem] bg-zinc-100 transition-all duration-700 shadow-lg border border-zinc-100 group-hover:border-[#ee6669]/20 group-hover:shadow-[0_48px_80px_-20px_rgba(45,27,78,0.15)] group-hover:-translate-y-2",
                  limit ? (index % 4 === 1 || index % 4 === 2 ? "aspect-[4/5]" : "aspect-[16/11]") : "aspect-[16/10]"
                )}>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title || "Interior Design Project"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest">
                            {project.style_type || 'Modern Luxury'}
                          </span>
                          <span className="px-4 py-1.5 rounded-full bg-[#ee6669] text-white text-[9px] font-bold uppercase tracking-widest">
                            {project.bhk_type || '3BHK'}
                          </span>
                       </div>
                       <h3 className="text-3xl lg:text-4xl font-serif font-light text-white leading-tight">
                         {project.title}
                       </h3>
                       <div className="pt-4 flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">
                          View Full Project <Maximize2 className="w-3.5 h-3.5 ml-2" />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata (Always visible, editorial style) */}
                <div className="mt-8 px-2 space-y-3">
                   <div className="flex items-baseline justify-between border-b border-zinc-100 pb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.3em]">{project.category || 'Full Home'}</span>
                        <h4 className="text-2xl lg:text-3xl font-serif text-[#222222]">{project.title}</h4>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Area</p>
                         <p className="text-sm font-serif text-[#222222]">{project.area_size || '1,250 SQFT'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5 text-[#ee6669]" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{project.timeline || '55 DAYS'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-[#ee6669]" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{project.style_type || 'Modern'}</span>
                      </div>
                   </div>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dialog for showing project details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[1000px] h-[90vh] sm:h-[85vh] flex flex-col p-0 overflow-hidden !grid-cols-none !grid-rows-none rounded-[3.5rem] border-none shadow-2xl">
          <div className="p-8 lg:p-12 border-b bg-white z-10 flex-shrink-0 flex justify-between items-end">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="text-[#ee6669] text-[10px] font-bold uppercase tracking-[0.4em]">{selectedProject?.category || 'Project'}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                 <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.4em]">{selectedProject?.style_type || 'Modern'}</span>
              </div>
              <DialogTitle className="text-3xl lg:text-5xl font-serif font-light text-[#222222]">{selectedProject?.title}</DialogTitle>
            </div>
            <div className="hidden lg:flex flex-col items-end space-y-2 text-right">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</p>
                <p className="text-lg font-serif text-[#222222]">Bhopal, Madhya Pradesh</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y bg-white p-8 lg:p-12" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="grid lg:grid-cols-12 gap-16">
               <div className="lg:col-span-4 space-y-12">
                  {selectedProject?.description && (
                    <div className="space-y-6">
                       <p className="text-[10px] font-bold text-[#ee6669] uppercase tracking-[0.4em]">The Story</p>
                       <p className="text-lg text-zinc-500 font-light leading-relaxed">{selectedProject.description}</p>
                    </div>
                  )}

                  <div className="space-y-8 p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                     <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 pb-4">Project Highlights</p>
                     <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Home Type</span>
                           <span className="text-sm font-bold text-[#222222]">{selectedProject?.bhk_type || '3BHK'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Area Size</span>
                           <span className="text-sm font-bold text-[#222222]">{selectedProject?.area_size || '1,200 sqft'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Timeline</span>
                           <span className="text-sm font-bold text-[#222222]">{selectedProject?.timeline || '60 Days'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Material</span>
                           <span className="text-sm font-bold text-[#222222]">HDHMR & Acrylic</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="pt-8">
                     <Button className="h-14 w-full rounded-2xl bg-[#ee6669] text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-[#ee6669]/20 transition-all hover:bg-[#222222]">
                        BOOK SIMILAR DESIGN
                     </Button>
                  </div>
               </div>

               <div className="lg:col-span-8">
                  {selectedProject?.images && selectedProject.images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {selectedProject.images.map((imgSrc, index) => (
                        <button 
                          key={index} 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageViewer(imgSrc, `${selectedProject.title} - Image ${index + 1}`);
                          }}
                          className={cn(
                            "relative overflow-hidden bg-zinc-50 rounded-[2rem] group cursor-zoom-in isolate shadow-md hover:shadow-xl transition-all duration-500",
                            index % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"
                          )}
                        >
                          <Image
                            src={imgSrc}
                            alt={`${selectedProject.title} image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 800px"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-40 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-100 text-zinc-400">
                      <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Gallery Under Curation</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-screen Image Viewer */}
      <ProjectImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        imageSrc={viewerImage}
        title={viewerTitle}
      />
    </>
  )
}
