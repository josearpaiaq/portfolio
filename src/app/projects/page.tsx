import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ProjectDetailCard from '@/components/projects/ProjectDetailCard';
import SectionHeading from '@/components/SectionHeading';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { projects } from '@/constants';

export const metadata: Metadata = {
  title: 'Projects — Jose Arpaia Quintero',
  description: 'Full list of projects built by Jose Arpaia Quintero, with details on each one.',
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-10">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        <SectionHeading kicker="Work" title="All Projects" />

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {projects.map((project) => (
            <div key={project.title} className="mb-6 break-inside-avoid">
              <ProjectDetailCard {...project} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
