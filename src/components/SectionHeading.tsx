import { cn } from '@/lib/utils';

export default function SectionHeading({
  kicker,
  title,
  className,
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-highlight">{kicker}</p>
      <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
    </div>
  );
}
