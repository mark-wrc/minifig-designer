export const MINIFIG_CONFIG = {
  PRICE_PER_ITEM: 100,
  PART_TYPES: ['HEAD', 'TORSO', 'LEGS'] as const,
} as const;

export type MinifigPartTypeKey = (typeof MINIFIG_CONFIG.PART_TYPES)[number];
