import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Chip({
  children,
  bgColor = 'bg-secondary',
  textColor = 'text-secondary-foreground',
  url,
  onClick,
}: {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  url?: string;
  onClick?: () => void;
}) {
  const className = cn(
    'w-fit select-none rounded-full border border-border px-3 py-1 transition-all duration-300',
    bgColor,
    textColor,
    (url || onClick) && 'cursor-pointer hover:border-highlight/60 hover:text-foreground',
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={className}>{children}</div>;
}
