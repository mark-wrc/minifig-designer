import { MinifigPartType } from '@/types';
import { MinifigPartData } from '@/types/Minifig';

export interface IMinifigWardrobeItems {
  wardrobeItems: MinifigPartData[];
  selectedCategory: MinifigPartType | null;
  onCategoryClick: (item: MinifigPartData) => void;
  className?: string;
  ref: HTMLDivElement;
  selectorComponent?: React.ReactElement | null;
}
