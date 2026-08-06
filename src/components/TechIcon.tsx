'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { TagIcon } from '@/types';

export default function TechIcon({
  icon,
  alt = '',
  className,
}: {
  icon?: TagIcon;
  alt?: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!icon) return null;

  if (typeof icon === 'string') {
    return <img src={icon} alt={alt} className={className} />;
  }

  const theme = mounted ? resolvedTheme : 'light';
  const src = (theme === 'dark' ? icon.dark : icon.light) ?? icon.light ?? icon.dark;

  if (!src) return null;

  return <img src={src} alt={alt} className={className} />;
}
