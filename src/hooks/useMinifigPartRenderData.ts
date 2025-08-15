/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import { MinifigPartType } from '@/types';
import type { IMinifigProject, SelectedMinifigItems } from '@/types/Minifig';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

export interface IMinifigRenderData {
  activeProject?: IMinifigProject | null; // allow null now
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
            return {
              slotIndex: index,
              currentImage: slot?.product_images?.[0]?.url || defaultImage,
              hasMinifigParts: Boolean(slot && slot.product_images?.[0]?.url),
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
        const currentPart = activeProject?.selectedItems?.[partKey] as any;
        const defaultImage = BaseMinifigParts[partType]?.image;
        const currentImage = currentPart?.product_images?.[0]?.url ?? defaultImage;

        return {
          type: partType,
          currentImage,
          hasMinifigParts: Boolean(currentPart && currentImage !== defaultImage),
          isArray: false,
        };
      }
    });
  }, [activeProject]);
};
