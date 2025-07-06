import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCharacterToCart } from '@/store/CartSlice/CartSlice';
import { getCustomPartsForMinifigProject } from '@/utils';
import { IMinifigProject } from '@/types/Minifig';

export const useMinifigCart = () => {
  const dispatch = useDispatch();

  const addMinifigToCart = useCallback(
    (minifig: IMinifigProject[] | null | undefined, onSuccess?: () => void) => {
      if (!minifig?.length) return;

      minifig.forEach((character) => {
        if (!character) return;

        const customParts = getCustomPartsForMinifigProject(character);

        if (customParts.length === 0) return;

        customParts.forEach((part) => {
          dispatch(
            addCharacterToCart({
              projectName: character.name,
              selectedParts: [part],
              pricePerItem: part.price,
              quantity: 1,
              stock: part.stock,
            }),
          );
        });
      });

      onSuccess?.();
    },
    [dispatch],
  );

  return { addMinifigToCart };
};
