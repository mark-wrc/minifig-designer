import { DefaultHairAndHead, DefaultHead, DefaultLegs, DefaultTorso } from '@/assets/images';
import { MinifigPartType, IMinifigProject } from '@/types';

export const CATEGORY_CONFIG: Array<{
  type: MinifigPartType;
  defaultImage: string;
  key: keyof IMinifigProject;
}> = [
  { type: MinifigPartType.HAIR, defaultImage: DefaultHairAndHead, key: 'hair' },
  { type: MinifigPartType.HEAD, defaultImage: DefaultHead, key: 'head' },
  { type: MinifigPartType.TORSO, defaultImage: DefaultTorso, key: 'torso' },
  { type: MinifigPartType.LEGS, defaultImage: DefaultLegs, key: 'legs' },
  { type: MinifigPartType.ACCESSORY, defaultImage: DefaultLegs, key: 'legs' },
];
