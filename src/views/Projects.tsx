import SnappingPage from "@/components/snappingPage";
import { projects, sectionsConfig, tags } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chip from "@/components/chip";

export default function Projects() {
  return (
    <SnappingPage id={sectionsConfig.projects.id}>
      <div className="flex flex-col gap-2 h-full px-6 text-teal-200 pt-12">
        <h3 className="text-center text-2xl md:text-3xl mb-4">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
          {projects.map(
            ({ title, description, url, image, tags: projectTags }, index) => (
              <Card
                key={title + index}
                className={[
                  "bg-teal-800 text-teal-200",
                  url && "cursor-pointer hover:opacity-85",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => url && window.open(url, "_blank")}
              >
                <CardHeader>
                  <CardTitle>
                    <a href={url} target="_blank" rel="noreferrer">
                      <h3>{title}</h3>
                    </a>
                  </CardTitle>
                  {description && (
                    <CardDescription>{description}</CardDescription>
                  )}
                </CardHeader>
                {image && (
                  <CardContent>
                    <img src={image} alt={title} />
                  </CardContent>
                )}
                <CardFooter className="flex flex-wrap gap-2">
                  {projectTags.map((tag) => (
                    <Chip key={tag} url={tags[tag].url}>
                      <div className="flex items-center gap-1 text-sm">
                        {tags[tag].icon && (
                          <img
                            src={tags[tag].icon}
                            alt={tags[tag].title}
                            className="w-4 h-4"
                          />
                        )}
                        {tags[tag].title}
                      </div>
                    </Chip>
                  ))}
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </SnappingPage>
  );
}
