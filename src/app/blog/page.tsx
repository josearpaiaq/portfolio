import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { formatPostDate, getPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Jose Arpaia Quintero',
  description:
    'Notes on web development, React, Next.js, TypeScript and Node.js by Jose Arpaia Quintero.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/feed.xml' },
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-10">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10 md:px-10">
        <SectionHeading kicker="Writing" title="Blog" />

        <ul className="flex flex-col divide-y divide-border">
          {posts.map(({ slug, title, description, publishedAt }) => (
            <li key={slug} className="py-6 first:pt-0">
              <article className="flex flex-col gap-2">
                <time dateTime={publishedAt} className="font-mono text-xs text-muted-foreground">
                  {formatPostDate(publishedAt)}
                </time>
                <h2 className="text-xl font-semibold">
                  <Link href={`/blog/${slug}`} className="transition-colors hover:text-highlight">
                    {title}
                  </Link>
                </h2>
                <p className="leading-relaxed text-muted-foreground">{description}</p>
              </article>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
