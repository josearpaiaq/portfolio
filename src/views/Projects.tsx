import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";

export default function Projects() {
  return (
    <SnappingPage
      id={sectionsConfig.projects.id}
      className={[
        "bg-malachite-500 text-malachite-950",
        sectionsConfig.projects.styles,
      ].join(" ")}
    >
      Projects
    </SnappingPage>
  );
}
