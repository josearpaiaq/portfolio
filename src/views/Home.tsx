import SnappingPage from "@/components/snappingPage";
import { Button } from "@/components/ui/button";
import { sectionsConfig } from "@/constants";
import { downloadCV, scrollTo } from "@/lib/utils";

export default function Home() {
  return (
    <SnappingPage
      className={["relative z-0"].filter(Boolean).join(" ")}
      id={sectionsConfig.home.id}
      backgroundVideoUrl={"/background.mp4"}
    >
      <div className="flex flex-col gap-2 justify-center h-full px-6 md:px-36 text-teal-200">
        <div id="top" className="h-1 w-1 bg-transparent"></div>
        <h1 id="main-title" className="text-5xl md:text-6xl my-4">
          Jose Arpaia
        </h1>
        <h3 className="flex flex-col md:flex-row gap-2 md:items-center">
          <span className="mx-1 font-bold text-lg bg-teal-400 rounded-full text-teal-800 py-2 px-4 w-fit">
            Software Engineer
          </span>
          <span>experienced with TypeScript, React, and Vue.</span>
        </h3>

        <div className="flex gap-2 mt-6">
          <Button onClick={() => downloadCV()}>Download my CV</Button>
          <Button
            variant={"secondary"}
            onClick={() => scrollTo(sectionsConfig.contact.id)}
          >
            Get in touch with me
          </Button>
        </div>
      </div>
    </SnappingPage>
  );
}
