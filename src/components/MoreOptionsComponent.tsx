'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import ArrowUp from './icons/ArrowUp';
import { sectionsConfig } from '@/constants';
import PlusSign from './icons/PlusSign';
import DownloadFile from './icons/DownloadFile';
import { cn, downloadCV } from '@/lib/utils';
import useStore from '@/store';

interface IMoreOptions {
  title?: string;
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  visible?: boolean;
  size?: '2' | '3';
  className?: string;
}

export default function MoreOptionsComponent() {
  const { topVisible, setTopVisible } = useStore();
  const [openOptions, setOpenOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moreOptions: IMoreOptions[] = [
    {
      title: 'Download my CV',
      children: <DownloadFile color="currentColor" stroke="currentColor" />,
      onClick: () => downloadCV(),
      size: '2',
    },
  ];

  const scrollToTop = () => {
    const topSection = document.getElementById(sectionsConfig.home.id);
    topSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const topElement = document.getElementById('top');

    if (!topElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Si la sección principal no es visible, mostramos el botón
        const isV = !entries[0].isIntersecting;
        setTopVisible(!isV);
      },
      { threshold: 0.1 }, // Se activa cuando el 10% de la sección es visible
    );

    observer.observe(topElement);

    return () => {
      if (topElement) {
        observer.unobserve(topElement);
      }
    };
  }, [setTopVisible]);

  return (
    <div
      className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-2 bg-transparent transition-all duration-300"
      ref={containerRef}
      onMouseLeave={() => setOpenOptions(false)}
    >
      <CircleButton onClick={scrollToTop} visible={!topVisible} size="2" title="Go back to top">
        {<ArrowUp />}
      </CircleButton>

      {moreOptions.map(({ title, children, onClick, size }, index) => {
        return (
          <CircleButton
            onClick={onClick}
            visible={openOptions}
            title={title}
            key={index}
            size={size || '2'}
          >
            {children}
          </CircleButton>
        );
      })}

      <CircleButton
        onClick={() => {
          setOpenOptions((prev) => !prev);
        }}
        visible
        title="More Options"
        onMouseEnter={() => setOpenOptions(true)}
        className={cn(openOptions && 'rotate-45')}
      >
        <PlusSign color="currentColor" />
      </CircleButton>
    </div>
  );
}

function CircleButton({
  title,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  visible,
  size = '3',
  className,
}: IMoreOptions) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'duration-800 transition-all',
        'shadow-md',
        'rounded-full bg-primary text-primary-foreground hover:scale-110 hover:opacity-85 hover:shadow-xl',
        size === '3' ? 'p-3' : 'p-2',
        visible ? 'flex opacity-100' : 'hidden opacity-0',
        className,
      )}
      aria-label={title}
      title={title}
    >
      {children}
    </button>
  );
}
