'use client';

import { useFrame } from '@react-three/fiber';
import { MutableRefObject, useRef } from 'react';
import { MathUtils, Vector3 } from 'three';
import useStore from '@/store';
import { BEAT_COUNT, BEAT_IDS, CAMERA_OFFSET, beatIndexFromOffset, beatZ } from './sceneLayout';

const tmpPosition = new Vector3();
const tmpLookAt = new Vector3();

export default function CameraRig({
  progressTarget,
  reducedMotion,
}: {
  progressTarget: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const setActiveSection = useStore((state) => state.setActiveSection);
  const displayed = useRef(0);
  const lastBeatId = useRef<string | null>(null);

  useFrame((state) => {
    displayed.current = reducedMotion
      ? progressTarget.current
      : MathUtils.lerp(displayed.current, progressTarget.current, 0.1);

    const beatFloat = beatIndexFromOffset(displayed.current);
    const lowerIndex = Math.floor(beatFloat);
    const upperIndex = Math.min(lowerIndex + 1, BEAT_COUNT - 1);
    const t = beatFloat - lowerIndex;

    const targetZ = MathUtils.lerp(beatZ(lowerIndex), beatZ(upperIndex), t);
    tmpPosition.set(0, 0, targetZ + CAMERA_OFFSET);
    tmpLookAt.set(0, 0, targetZ);

    state.camera.position.copy(tmpPosition);
    state.camera.lookAt(tmpLookAt);

    const nearestBeatId = BEAT_IDS[Math.round(beatFloat)];
    if (nearestBeatId !== lastBeatId.current) {
      lastBeatId.current = nearestBeatId;
      setActiveSection(nearestBeatId);
    }
  });

  return null;
}
