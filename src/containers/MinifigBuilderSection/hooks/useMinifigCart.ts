import { useCallback } from 'react';
import { getCustomPartsForMinifigProject } from '@/utils';
import type { IMinifigProject } from '@/types/Minifig';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export interface IUseMinifigCart {
  minifig: IMinifigProject[] | null | undefined;
  onSuccess?: () => void;
}
export const useMinifigCart = () => {
  const { addCharacterToCart } = useShoppingCart();

  const addMinifigToCart = useCallback(
    ({ minifig, onSuccess }: IUseMinifigCart) => {
      if (!minifig?.length) {
        return;
      }

      try {
        minifig.forEach((character, index) => {
          if (!character) {
            console.warn(`Character at index ${index} is null/undefined`);
            return;
          }

          console.log(`Processing character: ${character.name}`, character);

          const customParts = getCustomPartsForMinifigProject(character);
          if (customParts.length === 0) {
            console.warn(`No custom parts found for character: ${character.name}`); //TODO: replace with toast/snackbacr
            return;
          }

          // Transform parts to the expected format
          const selectedParts = customParts.map((part) => ({
            type: part.type,
            name: part.name,
            image: part.image,
            price: part.price,
            stock: part.stock,
          }));

          addCharacterToCart({
            projectName: character.name,
            selectedParts,
            pricePerItem: undefined,
            quantity: 1,
            stock: undefined,
          });
        });

        onSuccess?.();
      } catch {
        onSuccess?.();
      }
    },
    [addCharacterToCart],
  );

  return { addMinifigToCart };
};
