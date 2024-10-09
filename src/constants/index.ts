import { IExperience, IProjects } from "@/types";

type SectionOptions = "home" | "experience" | "projects" | "contact";
type SectionStyles = {
  background?: string;
};

export const sectionsConfig: Record<
  SectionOptions,
  { id: string; styles?: SectionStyles }
> = {
  home: {
    id: "home",
  },
  experience: {
    id: "experience",
  },
  projects: {
    id: "projects",
  },
  contact: {
    id: "contact",
  },
};

export enum tagsEnum {
  react = "React",
  tailwind = "Tailwind CSS",
  typescript = "TypeScript",
  nextjs = "Next.js",
  vuejs = "Vue.js",
}

export const tags: Record<
  tagsEnum,
  { title: string; url: string; icon: string }
> = {
  [tagsEnum.react]: {
    title: "React",
    url: "https://reactjs.org/",
    icon: "/images/icons/react.svg",
  },
  [tagsEnum.tailwind]: {
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    icon: "/images/icons/tailwind.svg",
  },
  [tagsEnum.typescript]: {
    title: "TypeScript",
    url: "https://www.typescriptlang.org/",
    icon: "/images/icons/typescript.svg",
  },
  [tagsEnum.nextjs]: {
    title: "Next.js",
    url: "https://nextjs.org/",
    icon: "/images/icons/nextjs.svg",
  },
  [tagsEnum.vuejs]: {
    title: "Vue.js",
    url: "https://vuejs.org/",
    icon: "/images/icons/vuejs.svg",
  },
};

export const experiences: IExperience[] = [
  {
    title: "Frontend Engineer",
    description: "Experienced in JavaScript, React, and Vue.",
    fullTime: true,
    remote: true,
    location: "Panama City, Panama",
    startDate: 2021,
    endDate: "present",
    company: "Etyalab S.A.",
    url: "https://etyalab.com",
    image: "/images/experiences/jose-arpaia.png",
    tags: [
      tagsEnum.react,
      tagsEnum.tailwind,
      tagsEnum.typescript,
      tagsEnum.vuejs,
    ],
  },
];

export const projects: IProjects[] = [
  {
    title: "React Tailwind Template",
    description:
      "A React template with Tailwind CSS, TypeScript, and Next.js. It's a great starting point for your next project.",
    url: "https://github.com/josearpaia/react-tailwind-template",
    image: "/images/projects/react-tailwind-template.png",
    tags: [tagsEnum.nextjs, tagsEnum.tailwind, tagsEnum.typescript],
  },
];
