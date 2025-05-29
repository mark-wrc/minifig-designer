import { MinifigPartType } from '@/types';
import { DefaultHairAndHead, DefaultTorso, DefaultLegs } from '@/assets/images';

export const BaseMinifigParts = {
  [MinifigPartType.HEAD]: {
    id: 'placeholder',
    type: MinifigPartType.HEAD,
    image: DefaultHairAndHead,
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
