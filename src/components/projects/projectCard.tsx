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
    <div
      className={[
        'relative flex min-h-[60vh] w-[80vw] flex-col justify-around rounded-lg bg-teal-800 text-teal-200 transition-all duration-300 md:h-full md:w-[30vw]',
        url && 'cursor-pointer hover:opacity-80',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => url && window.open(url, '_blank')}
    >
      <div className="m-0 -mt-4 p-0">
        {image && (
          <div className="sticky inset-0 h-full w-full rounded-full bg-teal-800">
            <img
              src={image}
              alt={title}
              className="h-52 w-full rounded-xl object-cover object-left-top"
            />
            <h3 className="mt-2 px-4 text-lg font-bold">{title}</h3>
          </div>
        )}
      </div>
      <div className="text-ellipsis px-4 text-teal-200/80">{description}</div>
      <div className="flex flex-wrap gap-2 p-4">
        {projectTags?.map((tag) => (
          <Chip key={tag} url={tags[tag].url}>
            <div className="flex items-center gap-1 text-sm">
              {tags[tag].icon && (
                <img src={tags[tag].icon} alt={tags[tag].title} className="h-4 w-4" />
              )}
              {tags[tag].title}
            </div>
          </Chip>
        ))}
      </div>
    </div>
  );
}
