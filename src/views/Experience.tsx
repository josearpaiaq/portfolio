import FadeIn from '@/components/FadeIn';
import JobCard from '@/components/jobs/JobCard';
import SnappingPage from '@/components/SnappingPage';
import { jobs, sectionsConfig } from '@/constants';

export default function Experience() {
  return (
    <SnappingPage id={sectionsConfig.experience.id}>
      <div className="flex h-full flex-col">
        <FadeIn>
          <h3 className="w-full py-6 text-center text-3xl text-teal-100">
            {'Professional Experience'}
          </h3>
        </FadeIn>

        <div className="flex flex-1 items-center">
          <div className="relative flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-12">
            {jobs.map(
              (
                {
                  company,
                  position,
                  startDate,
                  endDate,
                  url,
                  description,
                  remarkablePoints,
                  tags,
                  width,
                },
                index,
              ) => (
                <FadeIn
                  key={company + index}
                  className="shrink-0 snap-center"
                  delay={index * 0.1}
                  direction="left"
                >
                  <JobCard
                    position={position}
                    company={company}
                    description={
                      <div className="text-teal-200/80">
                        <span className="mb-4 ml-2 text-xs font-bold">
                          {startDate} - {endDate}
                        </span>
                        <div className="mt-2 text-teal-50">{description}</div>
                      </div>
                    }
                    remarkablePoints={remarkablePoints}
                    tags={tags}
                    url={url}
                    width={width}
                  />
                </FadeIn>
              ),
            )}
          </div>
        </div>
      </div>
    </SnappingPage>
  );
}
