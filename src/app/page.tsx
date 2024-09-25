import Navbar from "@/components/navbar";
import Home from "@/views/Home";
import Experience from "@/views/Experience";
import Projects from "@/views/Projects";
import Contact from "@/views/Contact";
import ScrollToTopButton from "@/components/scrollTopComponent";

export default function App() {
  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      <main
        className="snap-y snap-mandatory overflow-y-scroll h-[95vh]"
        id="main"
      >
        <Home />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <ScrollToTopButton />
    </section>
  );
}
