import { useState } from 'react';
import { IJobs } from '@/types';
import Chip from '../Chip';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { tags } from '@/constants';

export default function JobCard({
  url,
  position,
  company,
  description,
  tags: jobsTags,
  remarkablePoints,
  width = '50vw',
}: IJobs) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = !!remarkablePoints?.length;

  return (
    <Card className="relative flex h-fit w-[85vw] flex-col bg-teal-800 text-teal-200 transition-all duration-300 md:w-[46vw] lg:w-[38vw]">
      <CardHeader className="m-0 p-0">
        <CardTitle className="px-6 py-3">
          <span className="text-lg font-bold text-white">{position}</span>
          <span className="text-teal-400"> at </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-lg text-teal-300 underline-offset-2 hover:text-teal-100 hover:underline"
          >
            {company}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {description && <div className="text-balance text-teal-200/80">{description}</div>}

        {hasDetails && expanded && (
          <div className="mt-4 flex flex-col gap-2 pl-2">
            <h4 className="text-sm font-bold">Remarkable points</h4>
            {remarkablePoints!.map((r) => (
              <p className="flex gap-2 text-sm text-teal-200/80" key={r}>
                &bull; <span>{r}</span>
              </p>
            ))}
          </div>
        )}

        {hasDetails && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((prev) => !prev);
            }}
            className="mt-3 text-xs text-teal-400 hover:text-teal-200 transition-colors"
          >
            {expanded ? 'Hide details ▲' : 'Show details ▼'}
          </button>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {jobsTags?.map((tag) => (
          <Chip key={tag} url={tags[tag].url}>
            <div className="flex items-center gap-1 text-sm">
              {tags[tag].icon && (
                <img src={tags[tag].icon} alt={tags[tag].title} className="h-4 w-4" />
              )}
              {tags[tag].title}
            </div>
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
}
