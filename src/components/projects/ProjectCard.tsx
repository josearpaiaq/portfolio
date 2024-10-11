import { IProjects } from '@/types';
import Chip from '../Chip';
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
        'w-[76vw] rounded-lg bg-teal-700 transition-all duration-300 ease-in-out hover:shadow-md md:h-full md:w-[30vw]',
        url && 'hover:bg-opacity-75',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {image && (
        <img
          src={image}
          alt={title}
          onClick={() => url && window.open(url, '_blank')}
          className="relative inset-0 h-52 w-full cursor-pointer rounded-lg bg-teal-800 object-cover object-left-top shadow-2xl"
        />
      )}
      <div className="px-2 py-1">
        <h3 className="my-2 px-4 text-lg font-bold">{title}</h3>
        <div className="text-balance px-4 text-teal-200/80">{description}</div>
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
