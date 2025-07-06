import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { Character } from '@/store/minifigBuilder/minifigBuilderSlice';
import { MinifigPartType } from '@/types';

export const createFallbackBuild = (): Character => ({
  id: 'fallback',
  name: 'Deleted Character',
  head: BaseMinifigParts[MinifigPartType.HEAD].image,
  torso: BaseMinifigParts[MinifigPartType.TORSO].image,
  legs: BaseMinifigParts[MinifigPartType.LEGS].image,
  selectedItems: {
    head: undefined,
    torso: undefined,
    legs: undefined,
  },
});
