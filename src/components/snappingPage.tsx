import { ReactNode } from "react";

export default function SnappingPage({
  children,
  className,
  id,
  backgroundVideoUrl,
}: {
  children: ReactNode;
  className?: string;
  id: string;
  backgroundVideoUrl?: string;
}) {
  return (
    <section
      id={id}
      className={[
        "relative snap-center snap-always h-screen bg-slate-700 overflow-y-auto py-[10vh]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {backgroundVideoUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={backgroundVideoUrl}
          autoPlay
          loop
          muted
        />
      )}
      <div className="h-full w-full relative z-10">{children}</div>
    </section>
  );
}
