import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Plugins are passed by name (with serializable options) so they work under Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-pretty-code',
        { theme: { light: 'github-light', dark: 'github-dark' }, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
