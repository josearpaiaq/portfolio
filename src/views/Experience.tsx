import JobCard from '@/components/jobs/JobCard';
import SnappingPage from '@/components/SnappingPage';
import TechStack from '@/components/TechStack';
import { jobs, sectionsConfig, tags, tagsEnum } from '@/constants';

export default function Experience() {
  return (
    <SnappingPage id={sectionsConfig.experience.id}>
      <h3 className="w-full pt-6 text-center text-3xl text-teal-100">
        {'Professional Experience'}
      </h3>

      <div className="relative mt-6 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 md:pt-12">
        {jobs.map(
          (
            { company, position, startDate, endDate, url, description, remarkablePoints, tags },
            index,
          ) => (
            <div className="shrink-0 snap-center" key={company + index}>
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
              />
            </div>
          ),
        )}

        {/* TODO: move this to a separate section */}
        {/* <TechStack /> */}
      </div>
    </SnappingPage>
  );
}
