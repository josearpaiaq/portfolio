export default function NavbarLink({
  id,
  setIsOpen,
  children,
}: {
  id: string;
  setIsOpen: () => void;
  children: string;
}) {
  return (
    <div className="flex flex-col transition-all group">
      <a
        className="cursor-pointer rounded-md px-4 py-2"
        onClick={setIsOpen}
        href={`#${id}`}
      >
        {children}
      </a>
      <div className="h-0.5 w-0 bg-malachite-950 transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}
