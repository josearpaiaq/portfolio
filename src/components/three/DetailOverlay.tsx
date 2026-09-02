'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import JobCard from '@/components/jobs/JobCard';
import ProjectDetailCard from '@/components/projects/ProjectDetailCard';
import { IJobs, IProjects } from '@/types';

export type DetailSelection =
  | { type: 'job'; data: IJobs }
  | { type: 'project'; data: IProjects }
  | null;

export default function DetailOverlay({
  selection,
  onClose,
}: {
  selection: DetailSelection;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!selection) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selection, onClose]);

  if (!selection) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-2 top-2 z-10 rounded-full bg-background/90 p-1.5 text-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        {selection.type === 'job' ? (
          <JobCard {...selection.data} />
        ) : (
          <ProjectDetailCard {...selection.data} />
        )}
      </div>
    </div>
  );
}
