import { CartProject, ICartItem } from '@/types';

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

export const createCartItem = (
  part: {
    type: string;
    name: string;
    image: string;
    price?: number;
    stock?: number;
  },
  defaultPrice: number,
  quantity: number,
  defaultStock: number,
): ICartItem => {
  return {
    id: crypto.randomUUID(),
    partType: part.type,
    partName: part.name,
    partImage: part.image,
    price: part.price || defaultPrice,
    quantity: Math.min(quantity, part.stock || defaultStock),
    stock: part.stock || defaultStock,
    addedAt: Date.now(),
  };
};
