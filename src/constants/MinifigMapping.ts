import type { SelectedMinifigItems } from '@/types/Minifig';

export const SUB_COLLECTION_TO_PART_TYPE: Record<string, keyof SelectedMinifigItems> = {
  'Minifigure Hair': 'hair',
  'Minifigure Heads': 'head',
  'Minifigure Torsos': 'torso',
  'Minifigure Legs': 'legs',
  'Minifigure Accessories': 'accessory',
};

// Default fallback part type
export const DEFAULT_PART_TYPE: keyof SelectedMinifigItems = 'accessory';
