import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";

export default function Experience() {
  return (
    <SnappingPage
      id={sectionsConfig.experience.id}
      className={[
        "text-malachite-950",
        sectionsConfig.experience.styles?.background,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Experience
    </SnappingPage>
  );
}
