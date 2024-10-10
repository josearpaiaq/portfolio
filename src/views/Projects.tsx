import SnappingPage from '@/components/snappingPage';
import { projects, sectionsConfig } from '@/constants';
import ProjectCard from '@/components/projects/projectCard';

export default function Projects() {
  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex h-full flex-col gap-2 px-6 text-teal-200">
        <h3 className="w-full py-6 text-center text-3xl text-teal-100">Projects</h3>
        <div className="grid grid-cols-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ title, description, url, image, tags: projectTags }, index) => (
            <ProjectCard
              key={title + index}
              title={title}
              description={description}
              url={url}
              image={image}
              tags={projectTags}
            />
          ))}
        </div>
      </div>
    </SnappingPage>
  );
}
