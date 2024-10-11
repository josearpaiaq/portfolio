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

export interface IProjects {
  title: string;
  description: ReactNode;
  url?: string;
  image?: string;
  color?: string;
  tags?: tagsEnum[];
}

export interface IExperience {
  title: string;
  description: string;
  fullTime: boolean;
  remote: boolean;
  startDate: number;
  endDate?: number | 'present';
  location: string;
  company: string;
  url: string;
  image: string;
  tags: tagsEnum[];
}

export interface IJobs {
  company: string;
  position: string;
  date?: string;
  url?: string;
  description?: ReactNode;
  tags?: tagsEnum[];
  remarkablePoints?: string[];
}
