import FadeIn from '@/components/FadeIn';
import CompactProjectCard from '@/components/projects/CompactProjectCard';
import ProjectCard from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { projects, sectionsConfig } from '@/constants';

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <SnappingPage id={sectionsConfig.projects.id} snapAlign="start">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        <FadeIn>
          <SectionHeading kicker="Work" title="Projects" />
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.12} className="h-full">
              <ProjectCard {...project} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground">
            More projects
          </h3>
        </FadeIn>

        <div className="grid gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.08}>
              <CompactProjectCard {...project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </SnappingPage>
  );
}
