import Image from 'next/image';
import { IProjects } from '@/types';
import { tags } from '@/constants';
import Chip from '../Chip';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
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
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 text-card-foreground transition-colors duration-300 hover:border-highlight/40">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold">{title}</h3>
        <StatusBadge status={status} />
      </div>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

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

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground">
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-xl">
            <DialogHeader className="text-left">
              <div className="flex items-center gap-3">
                <DialogTitle>{title}</DialogTitle>
                <StatusBadge status={status} />
              </div>
              <DialogDescription className="leading-relaxed">{description}</DialogDescription>
            </DialogHeader>

            {image && (
              <Image
                src={image}
                alt={`${title} screenshot`}
                width={800}
                height={416}
                className="w-full rounded-md border border-border object-cover object-left-top"
              />
            )}

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

            <DialogFooter className="gap-2">
              {repo && (
                <Button asChild variant="outline">
                  <a href={repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
              {url && (
                <Button asChild>
                  <a href={url} target="_blank" rel="noreferrer">
                    Live ↗
                  </a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
