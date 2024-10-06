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
    styles: {
      background: "bg-malachite-900",
    },
  },
  experience: {
    id: "experience",
    styles: {
      background: "bg-malachite-800",
    },
  },
  projects: {
    id: "projects",

    styles: {
      background: "bg-malachite-700",
    },
  },
  contact: {
    id: "contact",
    styles: {
      background: "bg-malachite-600",
    },
  },
};
