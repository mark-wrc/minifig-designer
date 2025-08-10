import { useMemo } from 'react';
import { MinifigPartType } from '@/types';
import { IMinifigProject, SelectedMinifigItems } from '@/types/Minifig';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

export interface IMinifigRenderData {
  activeProject?: IMinifigProject | null; // allow null now
}

export const useMinifigPartRenderData = ({ activeProject }: IMinifigRenderData) => {
  return useMemo(() => {
    return Object.values(MinifigPartType).map((partType) => {
      const partKey = partType.toLowerCase() as keyof SelectedMinifigItems;
      const currentPart = activeProject?.selectedItems?.[partKey];
      const defaultImage = BaseMinifigParts[partType]?.image;
      const currentImage = currentPart?.product_images[0].url ?? defaultImage;

      return {
        type: partType,
        currentImage,
        hasMinifigParts: Boolean(currentPart && currentImage !== defaultImage),
      };
    });
  }, [activeProject]);
};
