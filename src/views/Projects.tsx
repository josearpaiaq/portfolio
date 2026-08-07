import { useEffect } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import HorizontalRail from '@/components/HorizontalRail';
import ProjectCard, { RETURN_SLUG_KEY } from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { Button } from '@/components/ui/button';
import { projects, sectionsConfig } from '@/constants';

export default function Projects() {
  const featured = projects.filter((project) => project.featured);

  useEffect(() => {
    const slug = sessionStorage.getItem(RETURN_SLUG_KEY);
    if (!slug) return;
    sessionStorage.removeItem(RETURN_SLUG_KEY);

    document.getElementById(sectionsConfig.projects.id)?.scrollIntoView({ behavior: 'auto' });

    const card = document.getElementById(`project-card-${slug}`);
    const rail = card?.closest('[role="region"]') as HTMLElement | null;
    if (card && rail) {
      const cardRect = card.getBoundingClientRect();
      const railRect = rail.getBoundingClientRect();
      const cardCenter = cardRect.left - railRect.left + rail.scrollLeft + cardRect.width / 2;
      rail.scrollLeft = cardCenter - rail.clientWidth / 2;
    }
  }, []);

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
