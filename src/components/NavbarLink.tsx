import { cn } from '@/lib/utils';

export default function NavbarLink({
  onClick,
  active = false,
  children,
}: {
  onClick?: () => void;
  active?: boolean;
  children: string;
}) {
  return (
    <div className="group flex flex-col transition-all">
      <button
        type="button"
        className={cn(
          'rounded-md px-4 py-2 transition-colors',
          active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
        onClick={() => onClick?.()}
      >
        {children}
      </button>
      <div
        className={cn(
          'h-0.5 bg-primary transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full',
        )}
      ></div>
    </div>
  );
}
