import { useMemo } from 'react';
import { MinifigPartType } from '@/types';
import type { IMinifigProject, MinifigPartData, SelectedMinifigItems } from '@/types/Minifig';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { getBuilderImage } from '@/utils';

export interface IMinifigRenderData {
  activeProject?: IMinifigProject | null;
}

export const useMinifigPartRenderData = ({ activeProject }: IMinifigRenderData) => {
  return useMemo(() => {
    return Object.values(MinifigPartType).map((partType) => {
      const partKey = partType.toLowerCase() as keyof SelectedMinifigItems;

      if (partType === MinifigPartType.ACCESSORY) {
        const accessorySlots = activeProject?.selectedItems?.accessory || [];
        const defaultImage = BaseMinifigParts[partType]?.image;

        const slots = Array(4)
          .fill(null)
          .map((_, index) => {
            const slot = accessorySlots[index];
            const builderImage = getBuilderImage(slot?.product_images);
            return {
              slotIndex: index,
              currentImage: builderImage?.url || defaultImage,
              hasMinifigParts: Boolean(slot && builderImage?.url),
              slotData: slot,
            };
          });

        return {
          type: partType,
          slots,
          isArray: true,
        };
      } else {
        // Handle single parts (hair, head, torso, legs)
        const currentPart = activeProject?.selectedItems?.[partKey] as MinifigPartData;
        const defaultImage = BaseMinifigParts[partType]?.image;
        const builderImage = getBuilderImage(currentPart?.product_images);

        return {
          type: partType,
          currentImage: builderImage?.url ?? defaultImage,
          hasMinifigParts: Boolean(currentPart && builderImage?.url),
          isArray: false,
        };
      }
    });
  }, [activeProject]);
};
