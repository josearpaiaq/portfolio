import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { aboutCopy, aboutFacts, sectionsConfig } from '@/constants';
import { useTilt } from '@/hooks/useTilt';

export default function About() {
  const tilt = useTilt<HTMLDListElement>();

  return (
    <SnappingPage id={sectionsConfig.about.id}>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto my-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10 md:px-10">
          <FadeIn>
            <SectionHeading kicker="About" title="A bit about me" />
          </FadeIn>

          <div className="flex flex-col gap-10 md:flex-row">
            <FadeIn delay={0.15} className="flex-[2]">
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
                {aboutCopy.paragraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.lead}
                    {paragraph.link && (
                      <>
                        {' '}
                        <a
                          href={paragraph.link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-highlight underline-offset-4 hover:underline"
                        >
                          {paragraph.link.text}
                        </a>
                      </>
                    )}
                    {paragraph.tail}
                  </p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="flex-1">
              <dl
                ref={tilt.ref}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                className="flex h-fit flex-col gap-4 rounded-lg border border-border bg-card p-6 text-card-foreground transition-transform duration-150 ease-out will-change-transform"
              >
                {aboutFacts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                    <div>
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-sm">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </SnappingPage>
  );
}
