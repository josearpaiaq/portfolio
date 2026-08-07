'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { RETURN_SLUG_KEY } from './ProjectCard';

export default function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  const handleClick = () => {
    // router.back() doesn't go through the same transition path as
    // router.push(), so it never triggers the view transition. Pushing to a
    // known destination keeps the morph working both ways.
    const cameFromHome = sessionStorage.getItem(RETURN_SLUG_KEY);
    router.push(cameFromHome ? '/' : fallbackHref);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
