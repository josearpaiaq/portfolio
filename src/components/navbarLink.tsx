import useStore from "@/store";

export default function NavbarLink({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: string;
}) {
  const { topVisible, navbarIsOpen } = useStore();
  return (
    <div className="flex flex-col transition-all group">
      <a
        className={["cursor-pointer rounded-md px-4 py-2"]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onClick?.()}
      >
        {children}
      </a>
      <div
        className={[
          "h-0.5 w-0 transition-all duration-300 group-hover:w-full",
          topVisible
            ? navbarIsOpen
              ? "bg-emerald-200"
              : "bg-emerald-500"
            : "bg-emerald-200",
        ]
          .filter(Boolean)
          .join(" ")}
      ></div>
    </div>
  );
}
