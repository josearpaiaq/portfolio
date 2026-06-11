import FadeIn from '@/components/FadeIn';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import TechStack from '@/components/TechStack';
import { sectionsConfig } from '@/constants';

export default function TechStackPage() {
  return (
    <SnappingPage id={sectionsConfig.techStack.id}>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-8 px-6 py-10 md:px-10">
        <FadeIn>
          <SectionHeading kicker="Toolbox" title="Tech Stack" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <TechStack />
        </FadeIn>
      </div>
    </SnappingPage>
  );
}
