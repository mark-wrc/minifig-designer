import { MinifigPartData } from '@/types/Minifig';

type MinifigSlot = MinifigPartData | null;

const createEmptySlots = (count = 4): MinifigSlot[] => Array(count).fill(null);

export const createEmptyMinifigSlots = (name: string) => ({
  _id: crypto.randomUUID(),
  name,
  slots: createEmptySlots(),
});
