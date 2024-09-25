"use client";

import { sectionsConfig } from "@/constants";
import MenuIcon from "./icons/MenuIcon";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={[
        "bg-malachite-100 text-malachite-950 w-full p-2",
        "sticky top-0",
        "rounded-lg w-[99%] mx-auto",
        "transition-all duration-1000 ease-in-out",
        "md:max-h-[10vh]  h-fit",
      ].join(" ")}
    >
      <div className="flex flex-col justify-between items-center">
        <div className="flex w-full justify-between items-center p-2">
          <div className="text-xl font-semibold self-start md:self-center">
            JA
          </div>
          <MenuIcon
            onClick={() => setIsOpen(!isOpen)}
            className={[
              "transition-all duration-300 ease-in-out cursor-pointer block md:hidden",
              isOpen ? "-rotate-45 opacity-100" : "opacity-50",
            ].join(" ")}
          />
          <div className="hidden md:flex justify-between gap-4 items-center h-fit text-malachite-950">
            <a
              className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
              onClick={() => setIsOpen(false)}
              href={`#${sectionsConfig.home.id}`}
            >
              Home
            </a>
            <a
              className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
              onClick={() => setIsOpen(false)}
              href={`#${sectionsConfig.experience.id}`}
            >
              Experience
            </a>
            <a
              className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
              onClick={() => setIsOpen(false)}
              href={`#${sectionsConfig.projects.id}`}
            >
              Projects
            </a>
            <a
              className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
              onClick={() => setIsOpen(false)}
              href={`#${sectionsConfig.contact.id}`}
            >
              Contact Me
            </a>
          </div>
        </div>
        <div
          className={[
            "flex md:hidden md:flex-row flex-col justify-between gap-4 items-center transition-all duration-500 ease-in-out text-malachite-950 w-full overflow-hidden",
            isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0",
          ].join(" ")}
        >
          <a
            className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
            onClick={() => setIsOpen(false)}
            href={`#${sectionsConfig.home.id}`}
          >
            Home
          </a>
          <a
            className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
            onClick={() => setIsOpen(false)}
            href={`#${sectionsConfig.experience.id}`}
          >
            Experience
          </a>
          <a
            className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
            onClick={() => setIsOpen(false)}
            href={`#${sectionsConfig.projects.id}`}
          >
            Projects
          </a>
          <a
            className="cursor-pointer hover:bg-malachite-200 rounded-md hover:shadow-sm px-4 py-2"
            onClick={() => setIsOpen(false)}
            href={`#${sectionsConfig.contact.id}`}
          >
            Contact Me
          </a>
        </div>
      </div>
    </nav>
  );
}
