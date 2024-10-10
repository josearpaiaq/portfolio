import { ReactNode } from "react";

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
    <div className="relative flex items-center gap-4 overflow-auto py-8 w-full">
      <div className="absolute w-full h-[.1rem] top-1 bg-white" />
      {events.map(({ date, company, url, position, description }, index) => (
        <div key={index} className="flex w-full ml-4 max-w-[30rem]">
          <div className="absolute top-0 w-3 h-3 rounded-full !z-50 bg-teal-100" />
          <a
            className={[
              "p-4 rounded-md mb-4 bg-teal-600 min-w-[15rem] hover:shadow-md",
              url && "cursor-pointer",
            ]
              .filter(Boolean)
              .join(" ")}
            href={url}
            target="_blank"
          >
            <h3 className="text-lg text-white">
              <span className="font-bold">{position}</span> at{" "}
              <span className="font-semibold">{company}</span>
            </h3>
            <span className="text-slate-800 text-sm">{date}</span>
            <div className="mb-4 text-base font-normal text-teal-900 dark:text-teal-900">
              {description}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
