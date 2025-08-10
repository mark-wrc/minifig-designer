/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { CartProject, ICartItem, MinifigPartType } from '@/types';

export const calculateProjectTotal = (items: ICartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateGlobalTotals = (projects: Record<string, CartProject>) => {
  const allItems = Object.values(projects).flatMap((project) => project.items);
  return {
    totalItems: allItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: allItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
};

export const findExistingItem = (
  items: ICartItem[],
  partType: string,
  partName: string,
): ICartItem | undefined => {
  return items.find((item) => item.partType === partType && item.partName === partName);
};

type PartInput = {
  _id: string;
  type: string;
  name: string;
  image: string;
  price?: number;
  stock?: number;
  color: string;
};

/**
 * Create a cart item using the REAL product id if available.
 * - Prefers part.id, then part._id
 * - Falls back to crypto.randomUUID() only if neither exists
 */
export const createCartItem = (
  part: PartInput,
  defaultPrice: number,
  quantity: number,
  defaultStock: number,
): ICartItem => {
  const stock = part.stock ?? defaultStock;
  const price = part.price ?? defaultPrice;

  //@ts-expect-error
  return {
    _id: part._id,
    partType: part.type as MinifigPartType,
    partName: part.name,
    images: part.image,
    color: part.color,
    price,
    quantity: Math.min(quantity, stock),
    stock,
    addedAt: Date.now(),
  };
};
