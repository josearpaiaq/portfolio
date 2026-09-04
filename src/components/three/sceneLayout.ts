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

export function beatZ(index: number) {
  return -index * BEAT_SPACING;
}

export function beatIndexFromOffset(offset: number) {
  const clamped = Math.min(Math.max(offset, 0), 1);
  return clamped * (BEAT_COUNT - 1);
}
