import { ReactNode } from 'react';

interface TimelineEvent {
  company: string;
  position: string;
  date?: string;
  url?: string;
  description?: ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
  color?: string;
}

export default function HorizontalTimeline({ events }: TimelineProps) {
  return (
    <div className="relative flex w-full items-center gap-4 overflow-auto py-8">
      <div className="absolute top-1 h-[.1rem] w-full bg-white" />
      {events.map(({ date, company, url, position, description }, index) => (
        <div key={index} className="ml-4 flex w-full max-w-[30rem]">
          <div className="absolute top-0 !z-50 h-3 w-3 rounded-full bg-teal-100" />
          <a
            className={[
              'mb-4 min-w-[15rem] rounded-md bg-teal-600 p-4 hover:shadow-md',
              url && 'cursor-pointer',
            ]
              .filter(Boolean)
              .join(' ')}
            href={url}
            target="_blank"
          >
            <h3 className="text-lg text-white">
              <span className="font-bold">{position}</span> at{' '}
              <span className="font-semibold">{company}</span>
            </h3>
            <span className="text-sm text-slate-800">{date}</span>
            <div className="mb-4 text-base font-normal text-teal-900 dark:text-teal-900">
              {description}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
