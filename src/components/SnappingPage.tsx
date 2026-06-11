import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function SnappingPage({
  children,
  className,
  id,
  snapAlign = 'center',
}: {
  children: ReactNode;
  className?: string;
  id: string;
  snapAlign?: 'center' | 'start';
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex min-h-svh flex-col pt-[10vh] md:snap-always',
        snapAlign === 'center'
          ? 'md:h-screen md:snap-center md:overflow-hidden'
          : 'md:min-h-screen md:snap-start',
        className,
      )}
    >
      <div className="relative z-10 flex w-full flex-1 flex-col">{children}</div>
    </section>
  );
}
