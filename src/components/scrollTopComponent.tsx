"use client";

import { useEffect, useState } from "react";
import ArrowUp from "./icons/ArrowUp";
import { sectionsIds } from "@/constants";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mainSection = document.getElementById(sectionsIds.home);

    if (!mainSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Si la sección principal no es visible, mostramos el botón
        if (!entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Se activa cuando el 10% de la sección es visible
    );

    observer.observe(mainSection);

    return () => {
      if (mainSection) {
        observer.unobserve(mainSection);
      }
    };
  }, []);

  const scrollToTop = () => {
    const topSection = document.getElementById(sectionsIds.home);
    topSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={[
        "fixed bottom-8 right-8 bg-malachite-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      aria-label="Scroll to Top"
    >
      <ArrowUp />
    </button>
  );
}
