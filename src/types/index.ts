import { tagsEnum } from '@/constants';
import { ReactNode } from 'react';

export interface IMenuIconProps {
  color?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  strokeWidth?: string | number;
  stroke?: string;
  onClick?: () => void;
}

export type ProjectStatus = 'Live' | 'WIP' | 'Archived';

export interface IProjects {
  title: string;
  description: string;
  status: ProjectStatus;
  featured?: boolean;
  url?: string;
  image?: string;
  color?: string;
  repo?: string;
  tags?: tagsEnum[];
}

export interface IJobs {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  description?: ReactNode;
  tags?: tagsEnum[];
  remarkablePoints?: string[];
}
