import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";

export default function Projects() {
  return (
    <SnappingPage
      id={sectionsConfig.projects.id}
      className={[
        "text-malachite-950",
        sectionsConfig.projects.styles?.background,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Projects
    </SnappingPage>
  );
}
