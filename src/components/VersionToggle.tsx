'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function VersionToggle() {
  const pathname = usePathname();
  const is3D = pathname === '/3d';

  return (
    <div
      role="group"
      aria-label="Site version"
      className="flex items-center rounded-full border border-border bg-secondary/50 p-0.5 text-xs font-medium"
    >
      <Link
        href="/3d"
        aria-current={is3D ? 'page' : undefined}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          is3D
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        3D
      </Link>
      <Link
        href="/"
        aria-current={!is3D ? 'page' : undefined}
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          !is3D
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        2D
      </Link>
    </div>
  );
}
