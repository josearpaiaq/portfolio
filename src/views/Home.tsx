import Chip from '@/components/Chip';
import FadeIn from '@/components/FadeIn';
import SnappingPage from '@/components/SnappingPage';
import { Button } from '@/components/ui/button';
import { sectionsConfig } from '@/constants';
import { downloadCV, scrollTo } from '@/lib/utils';

const heroTech = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Go'];

export default function Home() {
  return (
    <SnappingPage id={sectionsConfig.home.id} className="hero-glow">
      {/* Photo slot: when a photo/avatar is ready, turn this container into a
          two-column grid (copy left, image right) without changing the copy. */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-4 px-6 md:px-10">
        <div id="top" className="h-1 w-1 bg-transparent"></div>
        <FadeIn delay={0.1}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Full Stack Developer
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <h1 id="main-title" className="text-5xl font-bold tracking-tight md:text-7xl">
            Jose Arpaia Quintero
          </h1>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p className="max-w-xl text-balance text-lg text-muted-foreground md:text-xl">
            I build fast, accessible web and mobile apps with{' '}
            <span className="font-semibold text-highlight">React</span>,{' '}
            <span className="font-semibold text-highlight">Next.js</span> and{' '}
            <span className="font-semibold text-highlight">TypeScript</span>.
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <Button onClick={() => scrollTo(sectionsConfig.projects.id)}>View my work</Button>
            <Button variant="outline" onClick={() => downloadCV()}>
              Download my CV
            </Button>
            <Button
              variant="link"
              className="text-muted-foreground"
              onClick={() => scrollTo(sectionsConfig.contact.id)}
            >
              get in touch →
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="mt-6 flex flex-wrap gap-2">
            {heroTech.map((tech) => (
              <Chip key={tech}>
                <span className="font-mono text-xs">{tech}</span>
              </Chip>
            ))}
          </div>
        </FadeIn>
      </div>
    </SnappingPage>
  );
}
