import { ReactNode } from "react";

export default function SnappingPage({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <section
      id={id}
      className={[
        "snap-center snap-always h-screen bg-slate-700 overflow-y-auto py-[10vh]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
