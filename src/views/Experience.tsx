import SnappingPage from "@/components/snappingPage";
import { sectionsConfig, tags } from "@/constants";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
import HorizontalTimeline from "@/components/horizontalTimeline";

export default function Experience() {
  const plugin = useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true, active: true })
  );
  return (
    <SnappingPage id={sectionsConfig.experience.id}>
      <h3 className="text-3xl text-center w-full text-teal-100 py-6">
        {"Work Experience"}
      </h3>

      {/* Desktop Static version */}
      <div className="gap-4 items-center justify-around flex-wrap pt-4 w-full hidden md:flex">
        {Object.values(tags).map(({ title, icon, url }, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-teal-100 gap-2 p-2 border-none select-none [&>a>img]:hover:animate-bounce"
          >
            <a href={url} target="_blank" rel="noreferrer">
              {icon && <img src={icon} alt={title} className="w-12 h-12" />}
            </a>
            <h3>{title}</h3>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full md:hidden"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Object.values(tags).map(({ title, icon, url }, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div
                className="p-1 border-none"
                style={{
                  backgroundImage: `url(${icon}}`,
                  backgroundColor: "transparent",
                }}
              >
                <Card className="bg-transparent border-none shadow-none">
                  <CardContent className="flex flex-col text-teal-100 justify-between select-none aspect-square items-center p-6 ">
                    <a href={url} target="_blank" rel="noreferrer">
                      {icon && (
                        <img src={icon} alt={title} className="w-42 h-42" />
                      )}
                    </a>
                    <h3>{title}</h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full px-8 pt-12">
        <HorizontalTimeline
          events={[
            {
              company: "Etyalab S.A.",
              date: "Nov 01, 2021 - Today",
              position: "Frontend Developer",
              description:
                "My role in the company is to develop and maintain the web applications. I am responsible for creating and maintaining the user interface, ensuring a seamless user experience, and implementing new features and functionalities.",
            },
          ]}
        />
      </div>
    </SnappingPage>
  );
}
