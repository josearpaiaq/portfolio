import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Tooltip({ title }: { title?: string }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger>{''}</TooltipTrigger>
        <TooltipContent>
          <p>{title || '...'}</p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
