/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { IMinifigCart } from '@/types/Minifig';

const BASE_CHECKOUT_URL = 'http://localhost:5173/checkout';

export function useSendCartToCheckout() {
  const cart = useSelector((state: RootState) => state.MinifigBuilderCart);

  const itemsToSend = useMemo(() => {
    const collectedItems: IMinifigCart[] = [];
    Object.values(cart.projects).forEach((project: any) => {
      project.items.forEach((item: any) => {
        collectedItems.push({
          _id: item._id,
          minifig_part_type: item.partType,
          product_name: item.partName,
          image: item.partImage,
          price: item.price || 0,
          stock: item.stock || 0,
          discount: item.discount || 0,
          discounted_price: item.discounted_price || item.price || 0,
          color: item.color || 'unavailable',
          includes: item.includes || 'unavailable',
          quantity: item.quantity || 1,
        });
      });
    });
    return collectedItems;
  }, [cart.projects]);

  const cartString = useMemo(() => {
    return encodeURIComponent(JSON.stringify(itemsToSend));
  }, [itemsToSend]);

  const sendToCheckout = useCallback(() => {
    const mode = itemsToSend.length > 1 ? 'cart' : 'buy_now';
    const url = `${BASE_CHECKOUT_URL}?mode=${mode}&externalCart=${cartString}`;

    window.location.href = url;
  }, [itemsToSend, cartString]);

  return { sendToCheckout };
}
