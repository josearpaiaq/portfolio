import { MetadataRoute } from 'next';
import { projects } from '@/constants';
import { getPosts } from '@/lib/blog';

const siteUrl = process.env.URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${siteUrl}/blog`,
      lastModified: posts[0] ? new Date(posts[0].updatedAt ?? posts[0].publishedAt) : undefined,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      priority: 0.7,
    })),
  ];
}
