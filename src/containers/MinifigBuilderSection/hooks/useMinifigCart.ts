/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import type { IMinifigProject } from '@/types/Minifig';
import { buildSelectedParts } from '@/types';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export interface IUseMinifigCart {
  minifig: IMinifigProject[] | null | undefined;
  onSuccess?: () => void;
}

export const useMinifigCart = () => {
  const { addCharactersToCartBatch } = useShoppingCart();

  const addMinifigToCart = useCallback(
    ({ minifig, onSuccess }: IUseMinifigCart) => {
      if (!minifig?.length) return;

      try {
        const payloads = minifig
          .filter(Boolean)
          .map((character) => {
            const selectedParts = buildSelectedParts(character.selectedItems);
            if (selectedParts.length === 0) return null;

            return {
              _id: character._id,
              projectName: character.name,
              selectedParts,
              quantity: 1,
              pricePerItem: undefined,
              stock: undefined,
              color: '',
            };
          })
          .filter((p): p is NonNullable<typeof p> => !!p);

        if (payloads.length === 0) {
          onSuccess?.();
          return;
        }

        addCharactersToCartBatch(payloads as any);
        onSuccess?.();
      } catch {
        onSuccess?.();
      }
    },
    [addCharactersToCartBatch],
  );

  return { addMinifigToCart };
};
