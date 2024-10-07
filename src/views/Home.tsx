import SnappingPage from "@/components/snappingPage";
import { Button } from "@/components/ui/button";
import { sectionsConfig } from "@/constants";

export default function Home() {
  return (
    <SnappingPage
      className={[sectionsConfig.home.styles?.background, "relative z-0"]
        .filter(Boolean)
        .join(" ")}
      id={sectionsConfig.home.id}
    >
      <div id="top" className="h-1 w-1 bg-transparent"></div>

      <div className="flex flex-col gap-2 justify-center h-full px-6 md:px-36">
        <h1 id="main-title" className="text-6xl">
          José Arpaia
        </h1>
        <h3 className="text-3xl">Software Engineer</h3>

        <div className="flex gap-2 mt-6">
          <Button>Download my CV</Button>
          <Button variant={"secondary"}>Get in touch with me</Button>
        </div>
      </div>
    </SnappingPage>
  );
}
