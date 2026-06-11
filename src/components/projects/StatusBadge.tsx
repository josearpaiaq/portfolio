import { ProjectStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusText: Record<ProjectStatus, string> = {
  Live: 'text-highlight',
  WIP: 'text-yellow-700 dark:text-yellow-400',
  Archived: 'text-muted-foreground',
};

const statusDot: Record<ProjectStatus, string> = {
  Live: 'bg-highlight',
  WIP: 'bg-yellow-500',
  Archived: 'bg-muted-foreground',
};

export default function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex w-fit items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur',
        statusText[status],
        className,
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', statusDot[status])}></span>
      {status}
    </span>
  );
}
