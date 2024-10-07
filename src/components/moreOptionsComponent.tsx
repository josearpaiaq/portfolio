"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import ArrowUp from "./icons/ArrowUp";
import { sectionsConfig } from "@/constants";
import PlusSign from "./icons/PlusSign";
import DownloadFile from "./icons/DownloadFile";
import { downloadCV } from "@/lib/utils";
import useStore from "@/store";

interface IMoreOptions {
  title?: string;
  children: ReactNode;
  onClick: () => void;
  visible?: boolean;
  size?: "2" | "3";
  className?: string;
}

export default function MoreOptionsComponent() {
  const { topVisible, setTopVisible } = useStore();
  const [openOptions, setOpenOptions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moreOptions: IMoreOptions[] = [
    {
      title: "Download my CV",
      children: <DownloadFile />,
      onClick: () => downloadCV(),
      size: "2",
    },
  ];

  const scrollToTop = () => {
    const topSection = document.getElementById(sectionsConfig.home.id);
    topSection?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const topElement = document.getElementById("top");

    if (!topElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Si la sección principal no es visible, mostramos el botón
        const isV = !entries[0].isIntersecting;
        setTopVisible(!isV);
      },
      { threshold: 0.1 } // Se activa cuando el 10% de la sección es visible
    );

    observer.observe(topElement);

    return () => {
      if (topElement) {
        observer.unobserve(topElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={[
        "flex flex-col items-center gap-2",
        "fixed bottom-8 right-8 text-white",
        "transition-all duration-300",
        "bg-transparent",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={containerRef}
    >
      <CircleButton
        onClick={scrollToTop}
        visible={!topVisible}
        size="2"
        title="Go back to top"
      >
        {<ArrowUp />}
      </CircleButton>

      {moreOptions.map(({ title, children, onClick, size }, index) => (
        <CircleButton
          onClick={onClick}
          visible={openOptions}
          title={title}
          key={index}
          size={size || "2"}
        >
          {children}
        </CircleButton>
      ))}

      <CircleButton
        onClick={() => setOpenOptions((prev) => !prev)}
        visible
        title="More Options"
        className={openOptions ? "rotate-45" : ""}
      >
        <PlusSign />
      </CircleButton>
    </div>
  );
}

function CircleButton({
  title,
  children,
  onClick,
  visible,
  size = "3",
  className,
}: IMoreOptions) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "transition-all duration-300 transform",
        "shadow-md",
        "hover:shadow-xl hover:scale-110 hover:opacity-85 rounded-full bg-malachite-500",
        size === "3" ? "p-3" : "p-2",
        visible ? "opacity-100 flex" : "opacity-0 hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={title}
      title={title}
    >
      {children}
    </button>
  );
}
