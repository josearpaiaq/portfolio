import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollTo(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/jose-arpaia-resume.pdf";
  link.download = "jose-arpaia-resume.pdf";
  link.click();
  link.remove();
};
