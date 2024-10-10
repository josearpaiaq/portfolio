'use client';

import { sectionsConfig } from '@/constants';
import MenuIcon from './icons/MenuIcon';
import { useEffect, useRef } from 'react';
import NavbarLink from './navbarLink';
import { scrollTo } from '@/lib/utils';
import useStore from '@/store';
import BrandingLogo from './icons/BrandingLogo';

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { topVisible, navbarIsOpen, setNavbarIsOpen } = useStore();

  const scrollToTop = () => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  };

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
  }, []);

  useEffect(() => {
    // Si el usuario abre el menu, desactivamos el scroll
    if (navbarIsOpen) {
      // Desactivamos el scroll
      document.body.style.overflow = 'hidden';
    }
  }, [navbarIsOpen]);

  return (
    <>
      <div
        className={[
          'absolute inset-0 z-50 bg-teal-950/50 transition-all duration-300 ease-in-out',
          navbarIsOpen ? '' : 'hidden',
        ]
          .filter(Boolean)
          .join(' ')}
      ></div>
      <nav
        id="navbar"
        ref={navbarRef}
        className={[
          'w-full p-2',
          'absolute top-0 z-[90]',
          'mx-auto w-[99%] rounded-lg',
          'transition-all duration-300 ease-in-out',
          'h-fit text-teal-50 md:max-h-[10vh]',
          topVisible
            ? navbarIsOpen
              ? 'bg-teal-700 pb-4 text-teal-50'
              : 'bg-transparent text-teal-500'
            : 'bg-teal-700/70',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="z-10 flex flex-col items-center justify-between">
          <div className="flex w-full items-center justify-between p-2">
            <div
              className="h-8 w-8 cursor-pointer select-none self-start rounded-md p-2 text-xl font-semibold transition-all duration-300 ease-in-out hover:bg-teal-700/70 md:self-center [&>img]:hover:scale-150"
              onClick={scrollToTop}
            >
              <BrandingLogo />
            </div>
            <MenuIcon
              onClick={() => setNavbarIsOpen(!navbarIsOpen)}
              color={'#fff'}
              className={[
                'z-50 block cursor-pointer transition-all duration-300 ease-in-out md:hidden',
                navbarIsOpen ? '-rotate-45 opacity-100' : 'opacity-50',
              ]
                .filter(Boolean)
                .join(' ')}
            />

            {/* Desktop navbar */}
            <div className="hidden h-fit items-center justify-between gap-4 md:flex">
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
              'flex w-full flex-col items-center justify-between gap-4 overflow-hidden transition-all duration-300 ease-in-out md:hidden md:flex-row',
              navbarIsOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
            ].join(' ')}
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
