import fs from 'node:fs/promises';
import path from 'node:path';
import type { MDXContent } from 'mdx/types';

export interface PostMetadata {
  title: string;
  description: string;
  // ISO dates (YYYY-MM-DD)
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  // Drafts are excluded from the list, sitemap, feed and static routes.
  draft?: boolean;
}

export interface Post extends PostMetadata {
  slug: string;
}

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''));
}

export async function getPost(slug: string): Promise<Post & { Content: MDXContent }> {
  const { default: Content, metadata } = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: MDXContent;
    metadata: PostMetadata;
  };
  return { slug, ...metadata, Content };
}

// Published posts, newest first.
export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { Content, ...post } = await getPost(slug);
      return post;
    }),
  );
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
