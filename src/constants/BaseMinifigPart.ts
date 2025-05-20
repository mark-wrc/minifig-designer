import { MinifigPartType } from '@/types';
import { DefaultHead, DefaultTorso, DefaultLegs } from '@/assets/images';

export const BaseMinifigParts = {
  [MinifigPartType.HEAD]: {
    id: 'placeholder',
    type: MinifigPartType.HATS_AND_HAIR,
    image: DefaultHead,
    isPlaceholder: true,
  },
  [MinifigPartType.TORSO]: {
    id: 'placeholder',
    type: MinifigPartType.TORSO,
    image: DefaultTorso,
    isPlaceholder: true,
  },
  [MinifigPartType.LEGS]: {
    id: 'placeholder',
    type: MinifigPartType.LEGS,
    image: DefaultLegs,
    isPlaceholder: true,
  },
  [MinifigPartType.ACCESSORIES]: {
    id: 'placeholder',
    type: MinifigPartType.ACCESSORIES,
    image: '',
    isPlaceholder: true,
  },
};
