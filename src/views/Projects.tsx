import SnappingPage from '@/components/snappingPage';
import { projects, sectionsConfig } from '@/constants';
import ProjectCard from '@/components/projects/projectCard';

export default function Projects() {
  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex h-full flex-col gap-2 px-6 text-teal-200">
        <h3 className="w-full py-6 text-center text-3xl text-teal-100">Projects</h3>
        <div className="relative flex h-full w-full snap-x snap-mandatory gap-6 overflow-x-auto">
          {projects.map(({ title, description, url, image, tags: projectTags }, index) => (
            <div className="shrink-0 snap-center" key={title + index}>
              <ProjectCard
                title={title}
                description={description}
                url={url}
                image={image}
                tags={projectTags}
              />
            </div>
          ))}
        </div>
      </div>
    </SnappingPage>
  );
}
