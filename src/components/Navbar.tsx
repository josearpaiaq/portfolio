'use client';

import { useEffect, useRef } from 'react';
import { sectionsConfig } from '@/constants';
import { cn, scrollTo } from '@/lib/utils';
import useStore from '@/store';
import BrandingLogo from './icons/BrandingLogo';
import MenuIcon from './icons/MenuIcon';
import NavbarLink from './NavbarLink';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const navLinks = [
  { id: sectionsConfig.home.id, label: 'Home' },
  { id: sectionsConfig.about.id, label: 'About' },
  { id: sectionsConfig.experience.id, label: 'Experience' },
  { id: sectionsConfig.projects.id, label: 'Projects' },
  { id: sectionsConfig.techStack.id, label: 'Tech Stack' },
];

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { topVisible, navbarIsOpen, setNavbarIsOpen, activeSection } = useStore();

  const scrollToSection = (sectionId: string) => {
    scrollTo(sectionId);
    setNavbarIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setNavbarIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setNavbarIsOpen]);

  return (
    <>
      <div
        className={cn(
          'absolute inset-0 z-50 bg-background/60 backdrop-blur-sm transition-all duration-300 ease-in-out',
          !navbarIsOpen && 'hidden',
        )}
      ></div>
      <nav
        id="navbar"
        ref={navbarRef}
        className={cn(
          'w-full p-2',
          'absolute top-0 z-[90]',
          'mx-auto w-[99%] rounded-lg',
          'transition-all duration-300 ease-in-out',
          'h-fit text-foreground md:max-h-[10vh]',
          topVisible && !navbarIsOpen
            ? 'bg-transparent'
            : 'border border-border bg-background/80 backdrop-blur',
        )}
      >
        <div className="z-10 flex flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between p-2">
            <button
              type="button"
              aria-label="Back to top"
              className="h-8 w-8 select-none self-start rounded-md p-2 text-xl font-semibold transition-all duration-300 ease-in-out hover:bg-secondary md:self-center"
              onClick={() => scrollToSection(sectionsConfig.home.id)}
            >
              <BrandingLogo />
            </button>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                aria-label={navbarIsOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={navbarIsOpen}
                onClick={() => setNavbarIsOpen(!navbarIsOpen)}
                className="p-2"
              >
                <MenuIcon
                  color="currentColor"
                  className={cn(
                    'z-50 block transition-all duration-300 ease-in-out',
                    navbarIsOpen ? '-rotate-45 opacity-100' : 'opacity-70',
                  )}
                />
              </button>
            </div>

            {/* Desktop navbar */}
            <div className="hidden h-fit items-center justify-between gap-2 md:flex">
              {navLinks.map(({ id, label }) => (
                <NavbarLink
                  key={id}
                  active={activeSection === id}
                  onClick={() => scrollToSection(id)}
                >
                  {label}
                </NavbarLink>
              ))}
              <ThemeToggle />
              <Button onClick={() => scrollToSection(sectionsConfig.contact.id)}>Contact</Button>
            </div>
          </div>

          {/* Mobile navbar */}
          <div
            className={cn(
              'flex w-full flex-col items-center justify-between gap-2 overflow-hidden transition-all duration-300 ease-in-out md:hidden',
              navbarIsOpen ? 'max-h-screen pb-4 opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            {navLinks.map(({ id, label }) => (
              <NavbarLink
                key={id}
                active={activeSection === id}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </NavbarLink>
            ))}
            <Button onClick={() => scrollToSection(sectionsConfig.contact.id)}>Contact</Button>
          </div>
        </div>
      </nav>
    </>
  );
}
