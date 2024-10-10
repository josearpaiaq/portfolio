export default function BrandingLogo({
  width = "2",
  height = "2",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <img
      src="/logo_branding.png"
      alt="Logo"
      className="hover:scale-150 transition-all duration-300 ease-in-out"
      style={{ width, height }}
    />
  );
}
