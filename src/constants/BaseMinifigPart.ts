import { MinifigPartType } from '@/types';
import { DefaultHairAndHead, DefaultTorso, DefaultLegs, DefaultHead } from '@/assets/images';

export const BaseMinifigParts = {
  [MinifigPartType.HAIR]: {
    id: 'placeholder',
    type: MinifigPartType.HEAD,
    image: DefaultHairAndHead,
    isPlaceholder: true,
  },
  [MinifigPartType.HEAD]: {
    id: 'placeholder',
    type: MinifigPartType.HEAD,
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
};
