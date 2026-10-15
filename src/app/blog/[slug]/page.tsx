import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { formatPostDate, getPost, getPosts } from '@/lib/blog';

const siteUrl = process.env.URL ?? 'http://localhost:3000';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { title, description, publishedAt, updatedAt, tags } = await getPost(slug);

  return {
    title: `${title} — Jose Arpaia Quintero`,
    description,
    keywords: tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: ['Jose Arpaia Quintero'],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { title, description, publishedAt, updatedAt, tags, Content } = await getPost(slug);

  const postJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    url: `${siteUrl}/blog/${slug}`,
    image: `${siteUrl}/blog/${slug}/opengraph-image`,
    keywords: tags,
    author: { '@type': 'Person', name: 'Jose Arpaia Quintero', url: siteUrl },
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-10">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All posts
          </Link>
        </Button>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10 md:px-10">
        <article className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <time dateTime={publishedAt} className="font-mono text-xs text-muted-foreground">
              {formatPostDate(publishedAt)}
            </time>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{description}</p>
          </header>

          <div className="prose max-w-none">
            <Content />
          </div>
        </article>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
    </div>
  );
}
