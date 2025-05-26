import { MinifigPartType } from '@/types';
import { ICategoryItem } from '@/types/FigureCategories';

export interface CategorySelectorProps {
  onClick: (category: MinifigPartType) => void;
  className?: string;
  item: ICategoryItem;
  isSelected?: boolean;
  type?: MinifigPartType;
}
