import { IProjects } from "@/types";
import Chip from "../chip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { tags } from "@/constants";

export default function ProjectCard({
  url,
  title,
  description,
  tags: projectTags,
  image,
}: IProjects) {
  return (
    <Card
      className={[
        "bg-teal-800 text-teal-200 transition-all duration-300",
        url && "cursor-pointer hover:bg-teal-900",
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
        {description && <CardDescription>{description}</CardDescription>}
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
  );
}
