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
        "snap-center snap-always min-h-[95vh] bg-slate-700",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
