import { ImageResponse } from 'next/og';

export const alt = 'Jose Arpaia Quintero — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 75% 20%, rgba(163, 230, 53, 0.15), transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          letterSpacing: 10,
          color: '#a1a1aa',
          textTransform: 'uppercase',
        }}
      >
        Full Stack Developer
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 16,
          fontSize: 80,
          fontWeight: 700,
          color: '#fafafa',
        }}
      >
        Jose Arpaia Quintero
      </div>
      <div style={{ display: 'flex', marginTop: 24, fontSize: 32, color: '#a1a1aa' }}>
        React · Next.js · TypeScript · Node.js · Go
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 48,
          width: 120,
          height: 6,
          backgroundColor: '#a3e635',
          borderRadius: 3,
        }}
      />
    </div>,
    { ...size },
  );
}
