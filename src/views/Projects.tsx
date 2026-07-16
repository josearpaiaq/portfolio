import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import HorizontalRail from '@/components/HorizontalRail';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { Button } from '@/components/ui/button';
import { projects, sectionsConfig } from '@/constants';

export default function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex min-h-0 flex-1 flex-col gap-6 py-6">
        <FadeIn className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-4 px-6 md:px-10">
          <SectionHeading kicker="Work" title="Projects" />
          <Button asChild variant="outline">
            <Link href="/projects">View all projects</Link>
          </Button>
        </FadeIn>

        <HorizontalRail label="Featured projects" className="mx-auto w-full max-w-6xl">
          {featured
            .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
            .map((project, index) => (
              <FadeIn
                key={project.title}
                delay={index * 0.1}
                direction="left"
                className="my-auto max-h-full w-[88vw] shrink-0 snap-center overflow-y-auto sm:w-[380px]"
              >
                <ProjectCard {...project} />
              </FadeIn>
            ))}
        </HorizontalRail>
      </div>
    </SnappingPage>
  );
}
