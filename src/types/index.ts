import { tagsEnum } from "@/constants";

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
  description: string;
  url: string;
  image: string;
  tags: tagsEnum[];
}

export interface IExperience {
  title: string;
  description: string;
  fullTime: boolean;
  remote: boolean;
  startDate: number;
  endDate?: number | "present";
  location: string;
  company: string;
  url: string;
  image: string;
  tags: tagsEnum[];
}
