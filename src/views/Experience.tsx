import JobCard from '@/components/jobs/JobCard';
import SnappingPage from '@/components/SnappingPage';
import { jobs, sectionsConfig, tags, tagsEnum } from '@/constants';

export default function Experience() {
  return (
    <SnappingPage id={sectionsConfig.experience.id}>
      <h3 className="w-full pt-6 text-center text-3xl text-teal-100">{'Work Experience'}</h3>

      <div className="flex w-full flex-col items-center justify-center px-8 pt-12 md:flex-row md:justify-around">
        {jobs.map(({ company, position, date, url, description, remarkablePoints }, index) => (
          <JobCard
            key={company + index}
            position={position}
            company={company}
            description={
              <div className="text-teal-200/80">
                <span className="mb-4 ml-2 text-xs font-bold">{date}</span>
                <div className="mt-2 text-teal-50">{description}</div>
              </div>
            }
            remarkablePoints={remarkablePoints}
            tags={[
              tagsEnum.JavaScript,
              tagsEnum.vuejs,
              tagsEnum.react,
              tagsEnum.tailwind,
              tagsEnum.typescript,
              tagsEnum.nextjs,
            ]}
            url={url}
          />
        ))}

        <div className="md:w-1/2">
          <h3 className="text-md mt-4 text-balance text-center font-semibold text-teal-100 md:mt-0 md:text-lg">
            Technologies and tools I use on a daily basis
          </h3>
          <div className={['grid w-full grid-cols-4 gap-4 pt-4'].filter(Boolean).join(' ')}>
            {Object.values(tags).map(({ title, icon, url }, index) => (
              <div
                key={index}
                className="flex select-none flex-col items-center gap-2 border-none p-2 text-teal-100 [&>a>img]:hover:animate-bounce"
              >
                <a href={url} target="_blank" rel="noreferrer">
                  {icon && <img src={icon} alt={title} className="h-12 w-12" />}
                </a>
                <h3>{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SnappingPage>
  );
}
