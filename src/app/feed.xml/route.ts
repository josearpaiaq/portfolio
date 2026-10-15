import { getPosts } from '@/lib/blog';

const siteUrl = process.env.URL ?? 'http://localhost:3000';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map(
      ({ slug, title, description, publishedAt }) => `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${siteUrl}/blog/${slug}</link>
      <guid>${siteUrl}/blog/${slug}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jose Arpaia Quintero — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Notes on web development, React, Next.js, TypeScript and Node.js.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
