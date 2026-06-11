import FadeIn from '@/components/FadeIn';
import HorizontalRail from '@/components/HorizontalRail';
import CompactProjectCard from '@/components/projects/CompactProjectCard';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { projects, sectionsConfig } from '@/constants';

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex min-h-0 flex-1 flex-col gap-6 py-6">
        <FadeIn className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <SectionHeading kicker="Work" title="Projects" />
        </FadeIn>

        <HorizontalRail label="Projects" className="mx-auto w-full max-w-6xl">
          {featured.map((project, index) => (
            <FadeIn
              key={project.title}
              delay={index * 0.1}
              direction="left"
              className="h-full w-[85vw] shrink-0 snap-start sm:w-[400px]"
            >
              <ProjectCard {...project} />
            </FadeIn>
          ))}
          {more.map((project) => (
            <FadeIn
              key={project.title}
              delay={0.1}
              direction="left"
              className="h-full w-[80vw] shrink-0 snap-start sm:w-[320px]"
            >
              <CompactProjectCard {...project} />
            </FadeIn>
          ))}
        </HorizontalRail>
      </div>
    </SnappingPage>
  );
}
