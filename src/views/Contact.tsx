import SnappingPage from "@/components/snappingPage";
import { sectionsConfig } from "@/constants";

export default function Contact() {
  return (
    <SnappingPage
      id={sectionsConfig.contact.id}
      className={[
        "text-malachite-950",
        sectionsConfig.contact.styles?.background,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Contact Me
    </SnappingPage>
  );
}
