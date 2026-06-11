import { IJobs } from '@/types';
import { tags } from '@/constants';
import Chip from '../Chip';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function JobCard({
  url,
  position,
  company,
  startDate,
  endDate,
  description,
  tags: jobTags,
  remarkablePoints,
}: IJobs) {
  return (
    <Card className="w-full transition-colors duration-300 hover:border-highlight/40">
      <CardHeader className="gap-1">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {startDate} — {endDate}
        </p>
        <CardTitle className="text-lg">
          <span className="text-foreground">{position}</span>
          <span className="font-normal text-muted-foreground"> at </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-highlight underline-offset-4 hover:underline"
          >
            {company}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {description && (
          <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>
        )}

        {!!remarkablePoints?.length && (
          <ul className="flex flex-col gap-2">
            {remarkablePoints.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                <span aria-hidden className="text-highlight">
                  ▹
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {jobTags?.map((tag) => (
          <Chip key={tag} url={tags[tag].url}>
            <div className="flex items-center gap-1 text-sm">
              {tags[tag].icon && <img src={tags[tag].icon} alt="" className="h-4 w-4" />}
              {tags[tag].title}
            </div>
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
}
