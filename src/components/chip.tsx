import { ReactNode } from "react";

export default function Chip({
  children,
  bgColor = "bg-teal-500",
  textColor = "text-teal-800",
  url,
}: {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  url?: string;
}) {
  return (
    <div
      className={[
        "rounded-full py-1 px-3 select-none shadow-xl transition-all duration-300",
        bgColor,
        textColor,
        url && "cursor-pointer hover:bg-opacity-60",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => url && window.open(url, "_blank")}
    >
      {children}
    </div>
  );
}
