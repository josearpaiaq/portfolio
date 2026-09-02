'use client';

import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar3D from '@/components/Navbar3D';
import AboutPanel from '@/components/three/AboutPanel';
import CameraRig from '@/components/three/CameraRig';
import ContactPanel from '@/components/three/ContactPanel';
import DetailOverlay, { DetailSelection } from '@/components/three/DetailOverlay';
import ExperienceTimeline from '@/components/three/ExperienceTimeline';
import HeroOrb from '@/components/three/HeroOrb';
import HeroOverlayText from '@/components/three/HeroOverlayText';
import ProjectsField from '@/components/three/ProjectsField';
import { CAMERA_OFFSET } from '@/components/three/sceneLayout';
import TechCluster from '@/components/three/TechCluster';
import useIsLowPower from '@/components/three/useIsLowPower';
import useScrollProgress from '@/components/three/useScrollProgress';

export default function ThreeDPage() {
  const reducedMotion = Boolean(useReducedMotion());
  const isLowPower = useIsLowPower();
  const [selection, setSelection] = useState<DetailSelection>(null);
  const progressTarget = useScrollProgress(selection !== null);

  // R3F's canvas size observer can miss its initial measurement on mount in
  // this Next.js/Turbopack setup, leaving the canvas at the browser's 300x150
  // default until something forces a re-measure. Nudge it once, post-mount.
  useEffect(() => {
    const timeout = setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="dark fixed inset-0 bg-[#0a0a0a] text-foreground">
      <Navbar3D progressTarget={progressTarget} />
      <HeroOverlayText progressTarget={progressTarget} />

      <Canvas
        dpr={isLowPower ? [1, 1] : [1, 1.5]}
        style={{ width: '100vw', height: '100vh' }}
        camera={{ fov: 50, position: [0, 0, CAMERA_OFFSET] }}
      >
        <fog attach="fog" args={['#0a0a0a', 8, 22]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        {!isLowPower && <Environment preset="studio" />}
        <CameraRig progressTarget={progressTarget} reducedMotion={reducedMotion} />

        <HeroOrb reducedMotion={reducedMotion} />
        <AboutPanel />
        <ExperienceTimeline onSelect={(job) => setSelection({ type: 'job', data: job })} />
        <ProjectsField onSelect={(project) => setSelection({ type: 'project', data: project })} />
        <TechCluster reducedMotion={reducedMotion} />
        <ContactPanel />
      </Canvas>

      <DetailOverlay selection={selection} onClose={() => setSelection(null)} />
    </div>
  );
}
