import { selectedMinifigParts } from '../types/CartDetails';
import { IMinifigProject } from '../types/Minifig';

export type SelectedPartWithId = selectedMinifigParts & { id?: string; _id?: string };

type RawMinifigPart = Partial<SelectedPartWithId> & { id?: string; type?: string };

export function buildSelectedMinifigPart(
  raw: RawMinifigPart | null | undefined,
): SelectedPartWithId | null {
  if (!raw?.id || !raw?.type) return null;

  const { id, type, name, image, price, stock, color } = raw;

  return {
    id,
    _id: id,
    type,
    name: name ?? '',
    image: image ?? '',
    price,
    stock,
    color,
  };
}

export const buildSelectedParts = (
  selectedItems: IMinifigProject['selectedItems'] | null | undefined,
): SelectedPartWithId[] => {
  if (!selectedItems) return [];

  const keys: Array<keyof IMinifigProject['selectedItems']> = ['head', 'torso', 'legs'];

  return keys
    .map((key) => buildSelectedMinifigPart(selectedItems[key] as RawMinifigPart))
    .filter((part): part is SelectedPartWithId => Boolean(part));
};
