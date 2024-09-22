import SnappingPage from "@/components/snappingPage";
import { sectionsIds } from "@/constants";

export default function Home() {
  return (
    <SnappingPage className="bg-malachite-700" id={sectionsIds.home}>
      <h1>José Arpaia</h1>
      <h3>Software Developer</h3>
    </SnappingPage>
  );
}
