import { IProjects } from '@/types';
import Chip from '../chip';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { tags } from '@/constants';

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
        'relative bg-teal-800 text-teal-200 transition-all duration-300',
        url && 'cursor-pointer hover:bg-teal-900',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => url && window.open(url, '_blank')}
    >
      <CardHeader className="m-0 p-0">
        {image && (
          <div className="sticky inset-0 m-0 h-full w-full rounded-lg p-0">
            <img src={image} alt={title} className="h-36 w-full rounded-xl object-cover" />
          </div>
        )}
        <CardTitle className="px-4 py-2">
          <a href={url} target="_blank" rel="noreferrer">
            <h3>{title}</h3>
          </a>
        </CardTitle>
      </CardHeader>
      {description && (
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      )}
      <CardFooter className="flex flex-wrap gap-2">
        {projectTags.map((tag) => (
          <Chip key={tag} url={tags[tag].url}>
            <div className="flex items-center gap-1 text-sm">
              {tags[tag].icon && (
                <img src={tags[tag].icon} alt={tags[tag].title} className="h-4 w-4" />
              )}
              {tags[tag].title}
            </div>
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
}
