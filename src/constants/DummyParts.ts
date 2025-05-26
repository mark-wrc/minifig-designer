import { MinifigPartType } from '@/types';
import { DefaultHairAndHead, AngryHead } from '@/assets/images';

export interface MinifigPartData {
  id: string;
  type: MinifigPartType;
  image: string;
  name: string;
  category: string;
}

export const DummyParts: Record<MinifigPartType, MinifigPartData[]> = {
  [MinifigPartType.HEAD]: [
    {
      id: 'head1',
      type: MinifigPartType.HEAD,
      image: DefaultHairAndHead,
      name: 'Happy Face',
      category: 'Head',
    },
    {
      id: 'head2',
      type: MinifigPartType.HEAD,
      image: AngryHead,
      name: 'Angry Face',
      category: 'Head',
    },
  ],
  [MinifigPartType.TORSO]: [
    {
      id: 'torso1',
      type: MinifigPartType.TORSO,
      image: '',
      name: 'Blue Shirt',
      category: 'Torso',
    },
    {
      id: 'torso2',
      type: MinifigPartType.TORSO,
      image: '',
      name: 'Red Shirt',
      category: 'Torso',
    },
  ],
  [MinifigPartType.LEGS]: [
    {
      id: 'legs1',
      type: MinifigPartType.LEGS,
      image: '',
      name: 'Blue Pants',
      category: 'Legs',
    },
    {
      id: 'legs2',
      type: MinifigPartType.LEGS,
      image: '',
      name: 'Black Pants',
      category: 'Legs',
    },
  ],
  [MinifigPartType.ACCESSORIES]: [
    {
      id: 'acc1',
      type: MinifigPartType.ACCESSORIES,
      image: '',
      name: 'Sword',
      category: 'Accessories',
    },
    {
      id: 'acc2',
      type: MinifigPartType.ACCESSORIES,
      image: '',
      name: 'Shield',
      category: 'Accessories',
    },
  ],
};
