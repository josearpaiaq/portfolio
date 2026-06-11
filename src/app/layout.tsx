import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ThemeProvider from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { mediaLinks } from '@/constants';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Netlify exposes the site URL as `URL` at build time; falls back for local dev.
const siteUrl = process.env.URL ?? 'http://localhost:3000';

const description =
  'Full stack developer based in Panamá building fast, accessible web and mobile apps with React, Next.js, TypeScript and Node.js.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Jose Arpaia Quintero — Full Stack Developer',
  description,
  openGraph: {
    title: 'Jose Arpaia Quintero — Full Stack Developer',
    description,
    url: siteUrl,
    siteName: 'Jose Arpaia Quintero',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jose Arpaia Quintero — Full Stack Developer',
    description,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jose Arpaia Quintero',
  jobTitle: 'Full Stack Developer',
  url: siteUrl,
  sameAs: [mediaLinks.github, mediaLinks.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
