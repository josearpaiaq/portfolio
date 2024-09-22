import SnappingPage from "@/components/snappingPage";
import { sectionsIds } from "@/constants";

export default function Projects() {
  return (
    <SnappingPage
      id={sectionsIds.projects}
      className="bg-malachite-500 text-malachite-950"
    >
      Projects
    </SnappingPage>
  );
}
