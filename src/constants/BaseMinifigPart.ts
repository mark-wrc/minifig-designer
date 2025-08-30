import { MinifigPartType } from '@/types';
import {
  DefaultHair,
  DefaultTorso,
  DefaultLegs,
  DefaultHead,
  DefaultAccessory,
} from '@/assets/images';

export const BaseMinifigParts = {
  [MinifigPartType.HAIR]: {
    id: 'placeholder_hair',
    type: MinifigPartType.HEAD,
    image: DefaultHair,
    isPlaceholder: true,
  },
  [MinifigPartType.HEAD]: {
    id: 'placeholder_head',
    type: MinifigPartType.HEAD,
    image: DefaultHead,
    isPlaceholder: true,
  },
  [MinifigPartType.TORSO]: {
    id: 'placeholder_torso',
    type: MinifigPartType.TORSO,
    image: DefaultTorso,
    isPlaceholder: true,
  },
  [MinifigPartType.LEGS]: {
    id: 'placeholder_legs',
    type: MinifigPartType.LEGS,
    image: DefaultLegs,
    isPlaceholder: true,
  },
  [MinifigPartType.ACCESSORY]: {
    id: 'placeholder_accessory',
    type: MinifigPartType.ACCESSORY,
    image: DefaultAccessory,
    isPlaceholder: true,
  },
};
