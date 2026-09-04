'use client';

import { MutableRefObject } from 'react';
import Chip from '@/components/Chip';
import { Button } from '@/components/ui/button';
import { heroCopy, sectionsConfig } from '@/constants';
import { downloadCV } from '@/lib/utils';
import useStore from '@/store';
import { BEAT_COUNT, BEAT_IDS } from './sceneLayout';

export default function HeroOverlayText({
  progressTarget,
}: {
  progressTarget: MutableRefObject<number>;
}) {
  const activeSection = useStore((state) => state.activeSection);
  const visible = activeSection === sectionsConfig.home.id;

  const scrollToBeat = (id: string) => {
    const index = BEAT_IDS.indexOf(id);
    if (index === -1) return;
    progressTarget.current = index / (BEAT_COUNT - 1);
  };

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[80] flex h-dvh flex-col justify-center px-6 transition-opacity duration-500 md:px-16 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className={`flex max-w-xl flex-col gap-4 ${visible ? 'pointer-events-auto' : ''}`}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {heroCopy.kicker}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          {heroCopy.name}
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          {heroCopy.subtitleLead}{' '}
          {heroCopy.subtitleHighlights.map((tech, i) => (
            <span key={tech}>
              <span className="font-semibold text-highlight">{tech}</span>
              {i < heroCopy.subtitleHighlights.length - 1
                ? i === heroCopy.subtitleHighlights.length - 2
                  ? ' and '
                  : ', '
                : '.'}
            </span>
          ))}
        </p>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
          <Button onClick={() => scrollToBeat(sectionsConfig.projects.id)}>View my work</Button>
          <Button variant="outline" onClick={() => downloadCV()}>
            Download my CV
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => scrollToBeat(sectionsConfig.contact.id)}
          >
            get in touch →
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {heroCopy.heroTech.map((tech) => (
            <Chip key={tech}>
              <span className="font-mono text-xs">{tech}</span>
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
