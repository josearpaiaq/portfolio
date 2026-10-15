import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NavbarLink({
  onClick,
  href,
  active = false,
  children,
}: {
  onClick?: () => void;
  // Renders a real link (crawlable) instead of a scroll button.
  href?: string;
  active?: boolean;
  children: string;
}) {
  const className = cn(
    'rounded-md px-4 py-2 transition-colors',
    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
  );

  return (
    <div className="group flex flex-col transition-all">
      {href ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        <button type="button" className={className} onClick={() => onClick?.()}>
          {children}
        </button>
      )}
      <div
        className={cn(
          'h-0.5 bg-primary transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full',
        )}
      ></div>
    </div>
  );
}
