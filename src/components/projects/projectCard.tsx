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
        'w-[85vw] rounded-lg bg-teal-700 transition-all duration-300 ease-in-out hover:shadow-md md:h-full md:w-[30vw]',
        url && 'cursor-pointer hover:opacity-80',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => url && window.open(url, '_blank')}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="sticky inset-0 m-0 h-52 w-full rounded-lg bg-teal-800 object-cover object-left-top p-0"
        />
      )}
      <div className="px-2 py-1">
        <h3 className="my-2 px-4 text-lg font-bold">{title}</h3>
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
    </div>
  );
}
