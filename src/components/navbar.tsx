"use client";

import { sectionsConfig } from "@/constants";
import MenuIcon from "./icons/MenuIcon";
import { useEffect, useRef } from "react";
import NavbarLink from "./navbarLink";
import { scrollTo } from "@/lib/utils";
import useStore from "@/store";

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { topVisible, navbarIsOpen, setNavbarIsOpen } = useStore();

  const scrollToTop = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    scrollTo(sectionId);
    setNavbarIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setNavbarIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Si el usuario abre el menu, desactivamos el scroll
    if (navbarIsOpen) {
      // Desactivamos el scroll
      document.body.style.overflow = "hidden";
    }
  }, [navbarIsOpen]);

  return (
    <>
      <div
        className={[
          "inset-0 absolute bg-malachite-950/50 z-50 transition-all duration-300 ease-in-out",
          navbarIsOpen ? "" : "hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      ></div>
      <nav
        id="navbar"
        ref={navbarRef}
        className={[
          "w-full p-2",
          "absolute top-0 z-[90]",
          "rounded-lg w-[99%] mx-auto",
          "transition-all duration-700 ease-in-out",
          "md:max-h-[10vh] h-fit text-malachite-50",
          topVisible
            ? navbarIsOpen
              ? "bg-malachite-700 text-malachite-50 pb-4"
              : "bg-transparent text-malachite-500"
            : "bg-malachite-700/70",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex flex-col justify-between items-center z-10">
          <div className="flex w-full justify-between items-center p-2">
            <div
              className="text-xl font-semibold self-start md:self-center animate-bounce cursor-pointer select-none"
              onClick={scrollToTop}
            >
              JA
            </div>
            <MenuIcon
              onClick={() => setNavbarIsOpen(!navbarIsOpen)}
              color={"#fff"}
              className={[
                "transition-all duration-300 ease-in-out cursor-pointer block md:hidden",
                navbarIsOpen ? "-rotate-45 opacity-100" : "opacity-50",
              ].join(" ")}
            />

            {/* Desktop navbar */}
            <div className="hidden md:flex justify-between gap-4 items-center h-fit">
              <NavbarLink
                onClick={() => {
                  scrollToSection(sectionsConfig.home.id);
                }}
              >
                Home
              </NavbarLink>
              <NavbarLink
                onClick={() => {
                  scrollToSection(sectionsConfig.experience.id);
                }}
              >
                Experience
              </NavbarLink>
              <NavbarLink
                onClick={() => {
                  scrollToSection(sectionsConfig.projects.id);
                }}
              >
                Projects
              </NavbarLink>
              <NavbarLink
                onClick={() => {
                  scrollToSection(sectionsConfig.contact.id);
                }}
              >
                Contact Me
              </NavbarLink>
            </div>
          </div>

          {/* Mobile navbar */}
          <div
            className={[
              "flex md:hidden md:flex-row flex-col justify-between gap-4 items-center transition-all duration-500 ease-in-out w-full overflow-hidden",
              navbarIsOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0",
            ].join(" ")}
          >
            <NavbarLink
              onClick={() => {
                scrollToSection(sectionsConfig.home.id);
              }}
            >
              Home
            </NavbarLink>
            <NavbarLink
              onClick={() => {
                scrollToSection(sectionsConfig.experience.id);
              }}
            >
              Experience
            </NavbarLink>
            <NavbarLink
              onClick={() => {
                scrollToSection(sectionsConfig.projects.id);
              }}
            >
              Projects
            </NavbarLink>
            <NavbarLink
              onClick={() => {
                scrollToSection(sectionsConfig.contact.id);
              }}
            >
              Contact Me
            </NavbarLink>
          </div>
        </div>
      </nav>
    </>
  );
}
