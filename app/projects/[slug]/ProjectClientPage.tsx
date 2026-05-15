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
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const openImageViewer = (imgSrc: string) => {
    setViewerImage(imgSrc);
    setIsViewerOpen(true);
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif font-light text-foreground mb-8 text-center">
        {project.title}
      </h1>

      {project.description && (
        <p className="text-lg text-muted-foreground mb-8 text-center">
          {project.description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 project-images-grid">
        {project.images && project.images.map((imgSrc, index) => (
          <button 
            key={index} 
            className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg cursor-zoom-in hover:opacity-90 transition-opacity text-left"
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
