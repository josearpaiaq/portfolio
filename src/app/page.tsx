"use client";

import Navbar from "@/components/navbar";
import Home from "@/views/Home";
import Experience from "@/views/Experience";
import Projects from "@/views/Projects";
import Contact from "@/views/Contact";
import MoreOptionsComponent from "@/components/moreOptionsComponent";
import { sectionsConfig } from "@/constants";
import { useEffect, useState } from "react";

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState<string>("bg-teal-900");

  useEffect(() => {
    const sections = Object.values(sectionsConfig).map((section) =>
      document.getElementById(section.id)
    );

    const observerOptions = {
      root: null, // El viewport
      rootMargin: "0px",
      threshold: 0.5, // Cambia este valor según la cantidad de la sección que debe estar visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as keyof typeof sectionsConfig;
          setBackgroundColor(
            sectionsConfig[sectionId].styles?.background || "bg-teal-100"
          );
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <section
      className={["flex flex-col h-screen", backgroundColor]
        .filter(Boolean)
        .join(" ")}
    >
      <Navbar />
      <main
        className="snap-y snap-mandatory overflow-y-scroll h-screen"
        id="main"
      >
        <Home />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <MoreOptionsComponent />
    </section>
  );
}
