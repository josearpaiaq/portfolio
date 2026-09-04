'use client';

import { Html } from '@react-three/drei';
import { aboutCopy, aboutFacts, sectionsConfig } from '@/constants';
import useStore from '@/store';
import { beatZ } from './sceneLayout';

export default function AboutPanel() {
  const isActive = useStore((state) => state.activeSection === sectionsConfig.about.id);

  return (
    <group position={[0, 0, beatZ(1)]}>
      <mesh position={[2.4, 1.2, -1.5]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#9ee62c" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[2.8, -0.8, -2.2]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#4f7a17" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Mounted only while active: drei's Html wrapper div is a real,
          always-interactive absolutely-positioned element that opacity/
          pointer-events on our own inner div can't reach — leaving it
          mounted (even invisible) can block clicks meant for whatever else
          is at that screen position. Unmounting is the only reliable fix. */}
      {isActive && (
        <Html center zIndexRange={[100, 0]} position={[0, 0, 0]}>
          <div className="max-h-[70vh] w-[420px] overflow-y-auto rounded-xl border border-white/10 bg-black/80 p-6 text-foreground backdrop-blur-xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              About
            </p>
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
              {aboutCopy.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.lead}
                  {paragraph.link && (
                    <>
                      {' '}
                      <a
                        href={paragraph.link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-highlight underline-offset-4 hover:underline"
                      >
                        {paragraph.link.text}
                      </a>
                    </>
                  )}
                  {paragraph.tail}
                </p>
              ))}
            </div>

            <dl className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              {aboutFacts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="text-sm text-foreground">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Html>
      )}
    </group>
  );
}
