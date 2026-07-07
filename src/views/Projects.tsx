import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { Button } from '@/components/ui/button';
import { projects, sectionsConfig } from '@/constants';

export default function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto my-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:px-10">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Work" title="Projects" />
            <Button asChild variant="outline">
              <Link href="/projects">View all projects</Link>
            </Button>
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured
              .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
              .map((project, index) => (
                <FadeIn key={project.title} delay={index * 0.1} direction="left" className="h-full">
                  <ProjectCard {...project} />
                </FadeIn>
              ))}
          </div>
        </div>
      </div>
    </SnappingPage>
  );
}
