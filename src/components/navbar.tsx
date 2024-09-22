import { sectionsIds } from "@/constants";

export default function Navbar() {
  return (
    <nav className="bg-malachite-100 text-malachite-950 sticky top-0 w-full h-full p-4">
      <div className="flex justify-between items-center">
        <div>logo</div>
        <div className="flex justify-between items-center gap-4">
          <a href={`#${sectionsIds.home}`}>Home</a>
          <a href={`#${sectionsIds.experience}`}>Experience</a>
          <a href={`#${sectionsIds.projects}`}>Projects</a>
          <a href={`#${sectionsIds.contact}`}>Contact Me</a>
        </div>
      </div>
    </nav>
  );
}
