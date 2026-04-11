import FadeIn from '@/components/FadeIn';
import SnappingPage from '@/components/SnappingPage';
import TechStack from '@/components/TechStack';
import { sectionsConfig } from '@/constants';

export default function TechStackPage() {
  return (
    <SnappingPage id={sectionsConfig.techStack.id}>
      <FadeIn>
        <h3 className="w-full pt-6 text-center text-3xl text-teal-100">{'Tech Stack'}</h3>
      </FadeIn>
      <FadeIn delay={0.2}>
        <TechStack />
      </FadeIn>
    </SnappingPage>
  );
}
