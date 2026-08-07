import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import BackButton from '@/components/projects/BackButton';
import Chip from '@/components/Chip';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/projects/StatusBadge';
import TechIcon from '@/components/TechIcon';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { projects, tags } from '@/constants';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Jose Arpaia Quintero`;
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { title, description, status, url, image, repo, tags: projectTags } = project;

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-10">
        <BackButton fallbackHref="/projects" />
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10 md:px-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          <ViewTransition name={`project-title-${slug}`}>
            <span>{title}</span>
          </ViewTransition>
        </h1>

        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {image && (
            <div className="flex flex-col gap-4 md:flex-1">
              <div className="relative overflow-hidden rounded-xl border border-border">
                <ViewTransition name={`project-image-${slug}`}>
                  <Image
                    src={image}
                    alt={`${title} screenshot`}
                    width={1200}
                    height={624}
                    className="w-full object-cover object-left-top"
                    priority
                  />
                </ViewTransition>
                <StatusBadge status={status} className="absolute right-3 top-3" />
              </div>

              <div className="flex flex-wrap gap-2">
                {projectTags?.map((tag) => (
                  <Chip key={tag} url={tags[tag].url}>
                    <div className="flex items-center gap-1 text-xs">
                      <TechIcon icon={tags[tag].icon} className="h-3.5 w-3.5" />
                      {tags[tag].title}
                    </div>
                  </Chip>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 md:flex-1">
            <ViewTransition name={`project-description-${slug}`}>
              <p className="text-balance leading-relaxed text-muted-foreground">{description}</p>
            </ViewTransition>

            <div className="flex gap-2 pt-2">
              {url && (
                <Button asChild>
                  <a href={url} target="_blank" rel="noreferrer">
                    Live ↗
                  </a>
                </Button>
              )}
              {repo && (
                <Button asChild variant="outline">
                  <a href={repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
