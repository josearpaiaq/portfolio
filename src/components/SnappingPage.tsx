import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function SnappingPage({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex h-svh snap-center snap-always flex-col overflow-hidden pt-[10vh]',
        className,
      )}
    >
      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">{children}</div>
    </section>
  );
}
