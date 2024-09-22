import SnappingPage from "@/components/snappingPage";
import { sectionsIds } from "@/constants";

export default function Contact() {
  return (
    <SnappingPage
      id={sectionsIds.contact}
      className="bg-malachite-400 text-malachite-950"
    >
      Contact Me
    </SnappingPage>
  );
}
