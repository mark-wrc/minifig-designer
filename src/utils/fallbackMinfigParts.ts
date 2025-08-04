import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

import { MinifigPartType } from '@/types';
import { IMinifigProject } from '@/types/Minifig';

export const createFallbackBuild = (): IMinifigProject => ({
  _id: 'fallback',
  name: 'Deleted Character',
  head: BaseMinifigParts[MinifigPartType.HEAD].image,
  torso: BaseMinifigParts[MinifigPartType.TORSO].image,
  leg: BaseMinifigParts[MinifigPartType.LEGS].image,
  selectedItems: {
    head: undefined,
    torso: undefined,
    leg: undefined,
  },
});
