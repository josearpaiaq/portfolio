export default function SnappingPage({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <section
      id={id}
      className={[
        "snap-center snap-always h-[92vh] bg-slate-700 overflow-y-auto",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
