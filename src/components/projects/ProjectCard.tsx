import Image from 'next/image';
import { IProjects } from '@/types';
import { tags } from '@/constants';
import Chip from '../Chip';
import { Button } from '../ui/button';
import StatusBadge from './StatusBadge';

export default function ProjectCard({
  url,
  title,
  description,
  tags: projectTags,
  image,
  repo,
  status,
}: IProjects) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-highlight/50 hover:shadow-lg">
      {image && (
        <div className="relative">
          <Image
            src={image}
            alt={`${title} screenshot`}
            width={800}
            height={416}
            className="h-44 w-full object-cover object-left-top"
          />
          <StatusBadge status={status} className="absolute right-3 top-3" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {projectTags?.map((tag) => (
            <Chip key={tag} url={tags[tag].url}>
              <div className="flex items-center gap-1 text-xs">
                {tags[tag].icon && <img src={tags[tag].icon} alt="" className="h-3.5 w-3.5" />}
                {tags[tag].title}
              </div>
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          {url && (
            <Button asChild size="sm">
              <a href={url} target="_blank" rel="noreferrer">
                Live ↗
              </a>
            </Button>
          )}
          {repo && (
            <Button asChild size="sm" variant="outline">
              <a href={repo} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
