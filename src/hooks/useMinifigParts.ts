import { MinifigPartType } from '@/types';
import { IMinifigProject } from '@/types/Minifig';
import { getMinifigPartImage } from '@/utils';
import { useMemo } from 'react';

interface MinifigPart {
  image: string;
  type: MinifigPartType;
}

export const useMinifigParts = (activeMinifigProject: IMinifigProject | undefined) => {
  return useMemo(
    () =>
      Object.values(MinifigPartType).reduce(
        (acc, type) => ({
          ...acc,
          [type]: {
            image: getMinifigPartImage(activeMinifigProject, type),
            type,
          },
        }),
        {} as Record<MinifigPartType, MinifigPart>,
      ),
    [activeMinifigProject],
  );
};
