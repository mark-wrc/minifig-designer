/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import type { IMinifigProject, MinifigPartData } from '@/types/Minifig'; // Import MinifigPartData
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { SUB_COLLECTION_TO_PART_TYPE } from '@/constants/MinifigMapping';
import { toast } from 'react-toastify';

export interface IUseMinifigCart {
  minifig: IMinifigProject[] | null | undefined;
  onSuccess?: () => void;
}

export const useMinifigCart = () => {
  const { addCharactersToCartBatch } = useShoppingCart();

  const getModelType = useCallback(
    (part: MinifigPartData) =>
      part.product_sub_collections?.[0]?.name
        ? SUB_COLLECTION_TO_PART_TYPE[part.product_sub_collections[0].name]
        : undefined,
    [],
  );

  const collectSelectedParts = useMemo(
    () =>
      (items: IMinifigProject['selectedItems']): MinifigPartData[] =>
        Object.values(items).flatMap((item) =>
          Array.isArray(item)
            ? item.filter(Boolean).map((slot) => ({ ...slot!, modelType: getModelType(slot!) }))
            : item
              ? [{ ...item, modelType: getModelType(item) }]
              : [],
        ),
    [getModelType],
  );

  const addMinifigToCart = useCallback(
    ({ minifig, onSuccess }: IUseMinifigCart) => {
      if (!minifig?.length) return;

      try {
        const payloads = minifig
          .map((character) => {
            const selectedParts = collectSelectedParts(character.selectedItems);
            if (!selectedParts.length) return null;

            const pricePerItem = selectedParts.reduce((sum, p) => sum + (p.price ?? 0), 0);
            const stock = selectedParts.reduce(
              (min, p) => Math.min(min, p.stock ?? Infinity),
              Infinity,
            );

            return {
              _id: character._id,
              projectName: character.name,
              selectedParts,
              quantity: 1,
              pricePerItem,
              stock,
              color: '',
            };
          })
          .filter(Boolean) as NonNullable<any>[];

        if (payloads.length) {
          addCharactersToCartBatch(payloads);

          toast.success('Added to cart successfully', {
            position: 'top-center',
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        onSuccess?.();
      } catch {
        toast.error('Failed to add to cart', {
          position: 'top-center',
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onSuccess?.();
      }
    },
    [addCharactersToCartBatch, collectSelectedParts],
  );

  return { addMinifigToCart };
};
