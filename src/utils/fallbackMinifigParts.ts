import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

import { MinifigPartType } from '@/types';
import { IMinifigProject } from '@/types/Minifig';

export const createFallbackBuild = (): IMinifigProject => ({
  _id: 'fallback',
  name: 'Deleted Character',
  hair: BaseMinifigParts[MinifigPartType.HAIR].image,
  head: BaseMinifigParts[MinifigPartType.HEAD].image,
  torso: BaseMinifigParts[MinifigPartType.TORSO].image,
  legs: BaseMinifigParts[MinifigPartType.LEGS].image,
  selectedItems: {
    hair: undefined,
    head: undefined,
    torso: undefined,
    legs: undefined,
  },
  accessory: [],
});
