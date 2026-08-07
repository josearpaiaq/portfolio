import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { useTilt } from '@/hooks/useTilt';
import { IProjects } from '@/types';
import { tags } from '@/constants';
import Chip from '../Chip';
import TechIcon from '../TechIcon';
import { Button } from '../ui/button';
import StatusBadge from './StatusBadge';

export const RETURN_SLUG_KEY = 'portfolio:returnToProjectSlug';

export default function ProjectCard({
  slug,
  url,
  title,
  description,
  tags: projectTags,
  image,
  repo,
  status,
}: IProjects) {
  const rememberReturnSlug = () => {
    sessionStorage.setItem(RETURN_SLUG_KEY, slug);
  };
  const tilt = useTilt<HTMLElement>();

  return (
    <article
      id={`project-card-${slug}`}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-150 ease-out will-change-transform hover:border-highlight/50 hover:shadow-lg"
    >
      {image && (
        <Link href={`/projects/${slug}`} className="relative block" onClick={rememberReturnSlug}>
          <ViewTransition name={`project-image-${slug}`}>
            <Image
              src={image}
              alt={`${title} screenshot`}
              width={800}
              height={416}
              className="h-44 w-full object-cover object-left-top"
            />
          </ViewTransition>
          <StatusBadge status={status} className="absolute right-3 top-3" />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold">
          <Link
            href={`/projects/${slug}`}
            className="hover:text-highlight"
            onClick={rememberReturnSlug}
          >
            <ViewTransition name={`project-title-${slug}`}>
              <span>{title}</span>
            </ViewTransition>
          </Link>
        </h3>
        <ViewTransition name={`project-description-${slug}`}>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </ViewTransition>
        <div className="flex flex-wrap gap-2">
          {projectTags?.map((tag) => (
            <Chip key={tag} url={tags[tag].url}>
              <div className="flex items-center gap-1 text-xs">
                <TechIcon icon={tags[tag].icon} className="h-3.5 w-3.5" />
                {tags[tag].title}
              </div>
            </Chip>
          ))}
        </div>
        <div className="mt-auto flex gap-2 pt-2">
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
