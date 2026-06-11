'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ComponentProps } from 'react';

export default function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
