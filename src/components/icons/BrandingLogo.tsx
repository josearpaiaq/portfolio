export default function BrandingLogo({
  width = '2',
  height = '2',
}: {
  width?: string;
  height?: string;
}) {
  return (
    <img
      src="/logo_branding.png"
      alt="Logo"
      className="transition-all duration-300 ease-in-out hover:scale-150"
      style={{ width, height }}
    />
  );
}
