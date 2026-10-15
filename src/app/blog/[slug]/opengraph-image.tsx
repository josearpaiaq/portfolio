import { ImageResponse } from 'next/og';
import { getPost, getPosts } from '@/lib/blog';

export const alt = 'Blog post by Jose Arpaia Quintero';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { title } = await getPost(slug);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 75% 20%, rgba(163, 230, 53, 0.15), transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          letterSpacing: 10,
          color: '#a1a1aa',
          textTransform: 'uppercase',
        }}
      >
        Blog
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 16,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#fafafa',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', marginTop: 32, fontSize: 32, color: '#a1a1aa' }}>
        Jose Arpaia Quintero
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 48,
          width: 120,
          height: 6,
          backgroundColor: '#a3e635',
          borderRadius: 3,
        }}
      />
    </div>,
    { ...size },
  );
}
