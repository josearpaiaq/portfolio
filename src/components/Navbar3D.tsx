'use client';

import { MutableRefObject, useState } from 'react';
import { BEAT_COUNT, BEAT_IDS } from '@/components/three/sceneLayout';
import { sectionsConfig } from '@/constants';
import { cn } from '@/lib/utils';
import useStore from '@/store';
import BrandingLogo from './icons/BrandingLogo';
import MenuIcon from './icons/MenuIcon';
import NavbarLink from './NavbarLink';
import { Button } from './ui/button';
import VersionToggle from './VersionToggle';

const navLinks = [
  { id: sectionsConfig.home.id, label: 'Home' },
  { id: sectionsConfig.about.id, label: 'About' },
  { id: sectionsConfig.experience.id, label: 'Experience' },
  { id: sectionsConfig.projects.id, label: 'Projects' },
  { id: sectionsConfig.techStack.id, label: 'Tech Stack' },
];

export default function Navbar3D({ progressTarget }: { progressTarget: MutableRefObject<number> }) {
  const activeSection = useStore((state) => state.activeSection);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToBeat = (id: string) => {
    const index = BEAT_IDS.indexOf(id);
    if (index === -1) return;
    progressTarget.current = index / (BEAT_COUNT - 1);
    setMenuOpen(false);
  };

  return (
    <nav
      id="navbar-3d"
      className="fixed left-0 right-0 top-0 z-[90] mx-auto mt-2 w-[99%] rounded-lg border border-border bg-background/80 p-2 text-foreground backdrop-blur"
    >
      <div className="flex w-full items-center justify-between p-2">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToBeat(sectionsConfig.home.id)}
          className="flex h-8 w-8 select-none items-center justify-center rounded-md transition-all duration-300 ease-in-out hover:bg-secondary"
        >
          <BrandingLogo />
        </button>

        <div className="flex items-center gap-1 md:hidden">
          <VersionToggle />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2"
          >
            <MenuIcon
              color="currentColor"
              className={cn(
                'block transition-all duration-300 ease-in-out',
                menuOpen ? '-rotate-45 opacity-100' : 'opacity-70',
              )}
            />
          </button>
        </div>

        <div className="hidden h-fit items-center justify-between gap-2 md:flex">
          {navLinks.map(({ id, label }) => (
            <NavbarLink key={id} active={activeSection === id} onClick={() => scrollToBeat(id)}>
              {label}
            </NavbarLink>
          ))}
          <VersionToggle />
          <Button onClick={() => scrollToBeat(sectionsConfig.contact.id)}>Contact</Button>
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center justify-between gap-2 overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          menuOpen ? 'max-h-screen pb-4 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {navLinks.map(({ id, label }) => (
          <NavbarLink key={id} active={activeSection === id} onClick={() => scrollToBeat(id)}>
            {label}
          </NavbarLink>
        ))}
        <Button onClick={() => scrollToBeat(sectionsConfig.contact.id)}>Contact</Button>
      </div>
    </nav>
  );
}
