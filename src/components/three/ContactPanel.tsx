'use client';

import { Html } from '@react-three/drei';
import ContactForm from '@/components/ContactForm';
import { sectionsConfig } from '@/constants';
import useStore from '@/store';
import { beatZ } from './sceneLayout';

export default function ContactPanel() {
  const isActive = useStore((state) => state.activeSection === sectionsConfig.contact.id);

  return (
    <group position={[0, 0, beatZ(5)]}>
      {/* Mounted only while active — see AboutPanel for why: drei's Html
          wrapper stays a real, clickable element even when our own content
          is faded out, and can block clicks meant for whatever's behind it.
          Trade-off: switching away from Contact and back clears any
          in-progress message, which is preferable to the form being
          unusable. */}
      {isActive && (
        <Html center zIndexRange={[100, 0]} position={[0, 0, 0]}>
          <div className="max-h-[70vh] w-[420px] overflow-y-auto rounded-xl border border-white/10 bg-black/80 p-6 text-foreground backdrop-blur-xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Send me a message
            </p>
            <ContactForm />
          </div>
        </Html>
      )}
    </group>
  );
}
