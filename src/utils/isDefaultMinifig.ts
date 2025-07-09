import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { IMinifigProject } from '@/types/Minifig';
import { MinifigPartType } from '@/types/MinifigActions';

export function isDefaultMinifig(minifig: IMinifigProject): boolean {
  const partTypes = [MinifigPartType.HEAD, MinifigPartType.TORSO, MinifigPartType.LEGS];
  return partTypes.every(
    (type) =>
      minifig[type.toLowerCase() as keyof IMinifigProject] === BaseMinifigParts[type].image,
  );
}
