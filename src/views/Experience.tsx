import FadeIn from '@/components/FadeIn';
import JobCard from '@/components/jobs/JobCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { jobs, sectionsConfig } from '@/constants';

export default function Experience() {
  return (
    <SnappingPage id={sectionsConfig.experience.id} snapAlign="start">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-10 md:px-0">
        <FadeIn>
          <SectionHeading kicker="Career" title="Professional Experience" />
        </FadeIn>

        <div className="flex flex-col gap-6">
          {jobs.map((job, index) => (
            <FadeIn key={job.company} delay={index * 0.15}>
              <JobCard {...job} />
            </FadeIn>
          ))}
        </div>
      </div>
    </SnappingPage>
  );
}
