import { MinifigPartType } from '@/types';

export interface IMinifigPartProps {
  type: MinifigPartType;
  minifigPartsImages?: string;
  className?: string;
  totalMinifigParts?: number;
  title?: string;
  imageSrc: string;
}
