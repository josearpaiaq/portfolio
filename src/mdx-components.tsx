import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

// Available in every post without importing them.
const components: MDXComponents = { Image };

export function useMDXComponents(): MDXComponents {
  return components;
}
