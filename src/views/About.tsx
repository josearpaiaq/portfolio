import { Briefcase, Globe, MapPin, Sparkles } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { sectionsConfig } from '@/constants';

// Visually-obvious marker for bio facts the owner still needs to provide.
function Pending({ children }: { children: string }) {
  return (
    <span className="rounded bg-yellow-400/20 px-1.5 py-0.5 font-mono text-xs text-yellow-700 dark:text-yellow-400">
      [PENDING: {children}]
    </span>
  );
}

const facts = [
  { icon: MapPin, label: 'Location', value: 'Panamá' },
  { icon: Briefcase, label: 'Experience', value: '4+ years · currently @ BlueCore' },
  { icon: Sparkles, label: 'Focus', value: 'Web & mobile products' },
  { icon: Globe, label: 'Languages', value: 'Spanish · English' },
];

export default function About() {
  return (
    <SnappingPage id={sectionsConfig.about.id}>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-6 py-10 md:px-10">
        <FadeIn>
          <SectionHeading kicker="About" title="A bit about me" />
        </FadeIn>

        <div className="flex flex-col gap-10 md:flex-row">
          <FadeIn delay={0.15} className="flex-[2]">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a full stack developer based in Panamá with over four years of experience
                building web and mobile applications. I currently work at{' '}
                <a
                  href="https://www.bluecorela.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-highlight underline-offset-4 hover:underline"
                >
                  BlueCore
                </a>
                , crafting mobile banking apps for the financial sector with Ionic and Angular,
                before that I spent three years at Etyalab shipping web products with Vue, React and
                Next.js.
              </p>
              <p>
                I work across the stack with TypeScript, Node.js and PostgreSQL, and lately
                I&apos;ve been building AI-powered side projects like a gym routine manager with
                vision-based equipment recognition and a voice-first app for practicing spoken
                English. As a full stack developer, I enjoy working with a wide range of tools and
                technologies, and I'm always looking for ways to improve my skills and knowledge.
                Being able to work with projects that actually change people&apos;s lives is a dream
                come true to me.
              </p>
              <p>
                Outside of code: I enjoy sports, pop culture movies, tv shows, and video games. I'm
                a big fan of football, enjoy watching italian Serie A matches and playing FIFA (or
                A.K.A nowadays as EA Sports FC lol) with friends. Also, I like reading books, or
                listening to audiobooks lately.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="flex-1">
            <dl className="flex h-fit flex-col gap-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
              {facts.map(({ icon: Icon, label, value }) => (
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
    </SnappingPage>
  );
}
