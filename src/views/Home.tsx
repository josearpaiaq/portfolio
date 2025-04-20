import Chip from '@/components/Chip';
import SnappingPage from '@/components/SnappingPage';
import { Button } from '@/components/ui/button';
import { sectionsConfig } from '@/constants';
import { downloadCV, scrollTo } from '@/lib/utils';

export default function Home() {
  return (
    <SnappingPage
      className={['relative z-0'].filter(Boolean).join(' ')}
      id={sectionsConfig.home.id}
      backgroundVideoUrl={'/background.mp4'}
    >
      <div className="flex h-full flex-col justify-center gap-2 px-6 text-teal-200 md:px-36">
        <div id="top" className="h-1 w-1 bg-transparent"></div>
        <h1 id="main-title" className="my-4 text-5xl md:text-6xl">
          Jose Arpaia Quintero
        </h1>
        <h3 className="flex w-fit flex-col gap-2 md:flex-row md:items-center">
          <Chip>
            <span className="text-nowrap font-bold md:text-lg">Full Stack Developer</span>
          </Chip>
          <span className="w-fit">experienced with TypeScript, React, and Vue.</span>
        </h3>

        <div className="mt-6 flex flex-col gap-2 md:flex-row">
          <Button onClick={() => downloadCV()}>Download my CV</Button>
          <Button variant={'secondary'} onClick={() => scrollTo(sectionsConfig.contact.id)}>
            Get in touch with me
          </Button>
        </div>
      </div>
    </SnappingPage>
  );
}
