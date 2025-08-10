import { useCallback } from 'react';
import type { IMinifigProject, MinifigPartData } from '@/types/Minifig'; // Import MinifigPartData
// import { buildSelectedParts } from '@/types'; // No longer needed
import { useShoppingCart } from '@/hooks/useShoppingCart';

export interface IUseMinifigCart {
  minifig: IMinifigProject[] | null | undefined;
  onSuccess?: () => void;
}

export const useMinifigCart = () => {
  const { addCharactersToCartBatch } = useShoppingCart();

  // Custom hook function to add multiple characters to the cart at once

  /**
   * Add one or more minifig projects into the shopping cart.
   * This will:
   *  1. Check if `minifig` list exists and has items
   *  2. Extract all parts (head, torso, legs) from each minifig
   *  3. Calculate total price & available stock
   *  4. Prepare a payload for the cart
   *  5. Call `addCharactersToCartBatch` to store it in cart state
   *
   * Example usage:
   * addMinifigToCart({
   *   minifig: [
   *     {
   *       _id: "abc123",
   *       name: "CoolRobot",
   *       selectedItems: {
   *         head: { _id: "h1", product_name: "Robot Head", price: 5, stock: 10, minifig_part_type: "HEAD" },
   *         torso: { _id: "t1", product_name: "Robot Torso", price: 8, stock: 10, minifig_part_type: "TORSO" },
   *         legs: { _id: "l1", product_name: "Robot Legs", price: 7, stock: 10, minifig_part_type: "LEGS" }
   *       }
   *     }
   *   ],
   *   onSuccess: () => console.log("Added to cart!")
   * })
   */

  const addMinifigToCart = useCallback(
    ({ minifig, onSuccess }: IUseMinifigCart) => {
      if (!minifig?.length) return;

      try {
        const payloads = minifig
          .filter(Boolean)
          .map((character) => {
            // Get all part objects from selectedItems (head, torso, legs)
            const selectedParts: MinifigPartData[] = Object.values(character.selectedItems).filter(
              (part): part is MinifigPartData => !!part,
            );

            if (selectedParts.length === 0) return null;

            // Find the lowest stock among all parts (cart quantity can't exceed this)
            const totalPrice = selectedParts.reduce((sum, part) => sum + (part.price ?? 0), 0);
            const totalStock = selectedParts.reduce(
              (min, part) => Math.min(min, part.stock ?? Number.POSITIVE_INFINITY),
              Number.POSITIVE_INFINITY,
            );

            return {
              _id: character._id,
              projectName: character.name,
              selectedParts,
              quantity: 1,
              pricePerItem: totalPrice,
              stock: totalStock,
              color: '',
            };
          })
          .filter((p): p is NonNullable<typeof p> => !!p); // remove null payloads

        if (payloads.length === 0) {
          onSuccess?.();
          return;
        }

        addCharactersToCartBatch(payloads);
        onSuccess?.();
      } catch (e) {
        console.error('Failed to add minifig to cart:', e);
        onSuccess?.();
      }
    },
    [addCharactersToCartBatch],
  );

  return { addMinifigToCart };
};
