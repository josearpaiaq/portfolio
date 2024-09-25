"use client";

import { useEffect, useState } from "react";
import ArrowUp from "./icons/ArrowUp";
import { sectionsConfig } from "@/constants";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const topElement = document.getElementById("top");

    if (!topElement) return;

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

    observer.observe(topElement);

    return () => {
      if (topElement) {
        observer.unobserve(topElement);
      }
    };
  }, []);

  const scrollToTop = () => {
    const topSection = document.getElementById(sectionsConfig.home.id);
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
