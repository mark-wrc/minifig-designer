import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigProject } from '@/types/Minifig';

export const getMinifigPartImage = (
  character: IMinifigProject | undefined,
  partType: MinifigPartType,
): string => {
  const selectedItem =
    character?.selectedItems?.[partType.toLowerCase() as keyof typeof character.selectedItems];
  return typeof selectedItem === 'string' ? selectedItem : BaseMinifigParts[partType].image;
};
