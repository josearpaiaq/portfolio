import SnappingPage from "@/components/snappingPage";
import { projects, sectionsConfig } from "@/constants";
import ProjectCard from "@/components/projects/projectCard";

export default function Projects() {
  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex flex-col gap-2 h-full px-6 text-teal-200">
        <h3 className="text-3xl text-center w-full text-teal-100 py-6">
          Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
          {projects.map(
            ({ title, description, url, image, tags: projectTags }, index) => (
              <ProjectCard
                key={title + index}
                title={title}
                description={description}
                url={url}
                image={image}
                tags={projectTags}
              />
            )
          )}
        </div>
      </div>
    </SnappingPage>
  );
}
