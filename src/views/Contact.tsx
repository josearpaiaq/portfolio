import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";

export default function Contact() {
  return (
    <SnappingPage
      id={sectionsConfig.contact.id}
      className="bg-malachite-400 text-malachite-950"
    >
      Contact Me
    </SnappingPage>
  );
}
