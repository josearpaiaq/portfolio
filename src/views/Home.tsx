import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";

export default function Home() {
  return (
    <SnappingPage
      className={[sectionsConfig.home.styles?.background].join(" ")}
      id={sectionsConfig.home.id}
    >
      <div id="top" className="h-1 w-1 bg-transparent"></div>
      <h1 id="main-title">José Arpaia</h1>
      <h3>Software Developer</h3>
    </SnappingPage>
  );
}
