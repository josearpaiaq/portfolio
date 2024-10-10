import { ReactNode, useState } from 'react';

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
  // const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      id={id}
      className={[
        'relative h-screen snap-center snap-always overflow-y-auto bg-slate-700 py-[10vh]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        background: !!backgroundVideoUrl
          ? `url(${backgroundVideoUrl}) no-repeat center center/cover`
          : undefined,
      }}
    >
      {backgroundVideoUrl && (
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src={backgroundVideoUrl}
          autoPlay
          loop
          muted
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </section>
  );
}
