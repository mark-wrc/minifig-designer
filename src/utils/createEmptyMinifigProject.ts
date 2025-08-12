import { IMinifigProject } from '@/types/Minifig';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const createEmptyMinifigProject = (name: string): IMinifigProject => ({
  _id: uuidv4(),
  name,
  hair: BaseMinifigParts[MinifigPartType.HAIR].image,
  head: BaseMinifigParts[MinifigPartType.HEAD].image,
  torso: BaseMinifigParts[MinifigPartType.TORSO].image,
  legs: BaseMinifigParts[MinifigPartType.LEGS].image,
  selectedItems: {},
});
