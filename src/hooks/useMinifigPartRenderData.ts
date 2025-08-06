import { useMemo } from 'react';
import { MinifigPartType, IMinifigProjectByIdResponse } from '@/types';
import { SelectedMinifigItems } from '@/types/Minifig';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

export interface IMinifigRenderData {
  activeProject?: IMinifigProjectByIdResponse;
}

export const useMinifigPartRenderData = ({ activeProject }: IMinifigRenderData) => {
  return useMemo(() => {
    return Object.values(MinifigPartType).map((partType) => {
      const partKey = partType.toLowerCase() as keyof SelectedMinifigItems;
      const currentPart = activeProject?.project.selectedItems?.[partKey];
      const defaultImage = BaseMinifigParts[partType]?.image;
      const currentImage = currentPart?.image ?? defaultImage;

      return {
        type: partType,
        currentImage,
        hasMinifigParts: Boolean(currentPart && currentImage !== defaultImage),
      };
    });
  }, [activeProject]);
};
