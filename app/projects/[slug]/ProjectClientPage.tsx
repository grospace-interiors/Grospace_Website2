'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProjectImageViewer } from '@/components/project-image-viewer';
import { useBackButtonModal } from '@/hooks/use-back-button-modal';

interface ProjectData {
  id: string;
  title: string;
  description: string | null;
  images: string[];
}

export default function ProjectClientPage({ project }: { project: ProjectData }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState<string | null>(null);

  // Sync back button with viewer
  useBackButtonModal(isViewerOpen, () => setIsViewerOpen(false));

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const openImageViewer = (imgSrc: string) => {
    setViewerImage(imgSrc);
    setIsViewerOpen(true);
  }

  return (
    <div className="container mx-auto overflow-x-clip px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <h1 className="mb-5 text-center font-serif text-3xl font-light text-foreground sm:mb-8 sm:text-4xl">
        {project.title}
      </h1>

      {project.description && (
        <p className="mb-8 text-center text-sm text-muted-foreground sm:text-lg">
          {project.description}
        </p>
      )}

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 project-images-grid">
        {project.images && project.images.map((imgSrc, index) => (
          <button 
            key={index} 
            className="relative aspect-video min-w-[86%] snap-center cursor-zoom-in overflow-hidden rounded-lg text-left shadow-lg transition-opacity hover:opacity-90 md:min-w-0"
            onClick={() => openImageViewer(imgSrc)}
          >
            <Image
              src={imgSrc}
              alt={`${project.title} image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Full-screen Image Viewer with Zoom */}
      <ProjectImageViewer 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        imageSrc={viewerImage}
        title={project.title}
      />
    </div>
  );
}
