'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { IProjects } from '@/types';
import { tags } from '@/constants';
import { cn } from '@/lib/utils';
import Chip from '../Chip';
import StatusBadge from './StatusBadge';

export default function CompactProjectCard({
  url,
  title,
  description,
  tags: projectTags,
  image,
  repo,
  status,
}: IProjects) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground transition-colors duration-300 hover:border-highlight/40">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold">{title}</h3>
        <StatusBadge status={status} />
      </div>

      <div id={detailsId} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        <p
          className={cn(
            'text-sm leading-relaxed text-muted-foreground',
            !expanded && 'line-clamp-3',
          )}
        >
          {description}
        </p>
        {expanded && image && (
          <Image
            src={image}
            alt={`${title} screenshot`}
            width={800}
            height={416}
            className="w-full rounded-md border border-border object-cover object-left-top"
          />
        )}
      </div>

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

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-3 text-sm">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-highlight underline-offset-4 hover:underline"
            >
              Live ↗
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? 'Less' : 'More'}
          <ChevronDown
            aria-hidden
            className={cn(
              'h-3.5 w-3.5 transition-transform duration-300',
              expanded && 'rotate-180',
            )}
          />
        </button>
      </div>
    </article>
  );
}
