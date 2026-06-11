import FadeIn from '@/components/FadeIn';
import HorizontalRail from '@/components/HorizontalRail';
import JobCard from '@/components/jobs/JobCard';
import SectionHeading from '@/components/SectionHeading';
import SnappingPage from '@/components/SnappingPage';
import { jobs, sectionsConfig } from '@/constants';

export default function Experience() {
  return (
    <SnappingPage id={sectionsConfig.experience.id}>
      <div className="flex min-h-0 flex-1 flex-col gap-6 py-6">
        <FadeIn className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <SectionHeading kicker="Career" title="Professional Experience" />
        </FadeIn>

        <HorizontalRail label="Work experience" className="mx-auto w-full max-w-6xl">
          {jobs.map((job, index) => (
            <FadeIn
              key={job.company}
              delay={index * 0.15}
              direction="left"
              className="my-auto max-h-full w-[88vw] shrink-0 snap-center overflow-y-auto sm:w-[560px]"
            >
              <JobCard {...job} />
            </FadeIn>
          ))}
        </HorizontalRail>
      </div>
    </SnappingPage>
  );
}
