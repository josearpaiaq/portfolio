import { sectionsConfig } from '@/constants';

export const BEAT_IDS = [
  sectionsConfig.home.id,
  sectionsConfig.about.id,
  sectionsConfig.experience.id,
  sectionsConfig.projects.id,
  sectionsConfig.techStack.id,
  sectionsConfig.contact.id,
];

export const BEAT_COUNT = BEAT_IDS.length;
export const BEAT_SPACING = 10;
export const CAMERA_OFFSET = 6;
export const BASE_FOV = 50;

// The scene's beats lay content out horizontally (project grid, experience
// orbs), tuned against BASE_FOV at a desktop-like aspect ratio. On a narrow
// portrait viewport, a fixed vertical FOV yields a much narrower horizontal
// FOV, cropping/oversizing that content. Widen the vertical FOV as aspect
// drops below the reference so the horizontal field stays roughly constant,
// capped to avoid fisheye distortion on very narrow phones.
const REFERENCE_ASPECT = 1.5;
const MAX_MOBILE_FOV = 65;

export function computeResponsiveFov(aspect: number) {
  if (aspect >= REFERENCE_ASPECT) return BASE_FOV;
  const baseFovRad = (BASE_FOV * Math.PI) / 180;
  const halfWidth = Math.tan(baseFovRad / 2) * REFERENCE_ASPECT;
  const targetHalfVFov = Math.atan(halfWidth / aspect);
  return Math.min((targetHalfVFov * 2 * 180) / Math.PI, MAX_MOBILE_FOV);
}

export function beatZ(index: number) {
  return -index * BEAT_SPACING;
}

export function beatIndexFromOffset(offset: number) {
  const clamped = Math.min(Math.max(offset, 0), 1);
  return clamped * (BEAT_COUNT - 1);
}
