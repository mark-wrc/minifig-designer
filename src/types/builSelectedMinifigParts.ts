/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectedMinifigParts } from './CartDetails';
import { IMinifigProject } from './Minifig';

export type SelectedPartWithId = selectedMinifigParts & { id?: string; _id?: string };

export function buildSelectedMinifigPart(rawMinifigPart: any): SelectedPartWithId | null {
  return rawMinifigPart &&
    typeof rawMinifigPart === 'object' &&
    'id' in rawMinifigPart &&
    'type' in rawMinifigPart
    ? {
        id: rawMinifigPart.id,
        type: rawMinifigPart.type,
        name: rawMinifigPart.name,
        image: rawMinifigPart.image,
        price: rawMinifigPart.price,
        stock: rawMinifigPart.stock,
        color: rawMinifigPart.color,
      }
    : null;
}

export const buildSelectedParts = (
  selectedItems: IMinifigProject['selectedItems'],
): SelectedPartWithId[] => {
  if (!selectedItems) return [];

  const keys: Array<keyof IMinifigProject['selectedItems']> = ['head', 'torso', 'legs'];

  return keys
    .map((key) => buildSelectedMinifigPart(selectedItems[key]))
    .filter((part): part is SelectedPartWithId => !!part);
};
