import { IJobs } from '@/types';
import Chip from '../chip';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { tags } from '@/constants';

export default function JobCard({
  url,
  position,
  company,
  description,
  tags: jobsTags,
  remarkablePoints,
}: IJobs) {
  return (
    <Card
      className={[
        'relative flex h-full w-[80vw] flex-col justify-between bg-teal-800 text-teal-200 transition-all duration-300 md:w-[45vw]',
        url && 'cursor-pointer hover:bg-teal-900',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => url && window.open(url, '_blank')}
    >
      <CardHeader className="m-0 p-0">
        <CardTitle className="px-6 py-2">
          <a href={url} target="_blank" rel="noreferrer">
            <span className="text-lg font-bold">{position}</span> at{' '}
            <span className="text-lg font-bold">{company}</span>
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <CardDescription className="text-teal-200/80">{description}</CardDescription>
        )}

        {!!remarkablePoints?.length && (
          <div className="mt-4 flex flex-col gap-2 pl-2">
            <h4 className="text-sm font-bold">Remarkable points</h4>
            {remarkablePoints.map((r) => (
              <p className="flex gap-2 text-sm text-teal-200/80">
                &bull; <span>{r}</span>
              </p>
            ))}
          </div>
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
