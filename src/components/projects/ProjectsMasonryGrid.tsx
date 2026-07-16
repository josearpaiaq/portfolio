'use client';

import { useEffect, useState } from 'react';
import { IProjects } from '@/types';
import HorizontalRail from '../HorizontalRail';
import ProjectDetailCard from './ProjectDetailCard';

const BREAKPOINTS = [
  { query: '(min-width: 1024px)', columns: 3 },
  { query: '(min-width: 640px)', columns: 2 },
];

function getColumnCount() {
  for (const { query, columns } of BREAKPOINTS) {
    if (window.matchMedia(query).matches) return columns;
  }
  return 1;
}

export default function ProjectsMasonryGrid({ projects }: { projects: IProjects[] }) {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const mediaQueries = BREAKPOINTS.map(({ query }) => window.matchMedia(query));
    const update = () => setColumnCount(getColumnCount());

    update();
    mediaQueries.forEach((mq) => mq.addEventListener('change', update));
    return () => mediaQueries.forEach((mq) => mq.removeEventListener('change', update));
  }, []);

  if (columnCount === 1) {
    return (
      <HorizontalRail label="All projects" className="-mx-6">
        {projects.map((project) => (
          <div key={project.title} className="my-auto w-[85vw] shrink-0 snap-center">
            <ProjectDetailCard {...project} />
          </div>
        ))}
      </HorizontalRail>
    );
  }

  const columns: IProjects[][] = Array.from({ length: columnCount }, () => []);
  projects.forEach((project, index) => columns[index % columnCount].push(project));

  return (
    <div className="flex gap-6">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-1 flex-col gap-6">
          {column.map((project) => (
            <ProjectDetailCard key={project.title} {...project} />
          ))}
        </div>
      ))}
    </div>
  );
}
