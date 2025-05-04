import { ICategoryItem, IFigureCategories } from '@/types/FigureCategories';

export interface CategorySelectorProps {
  onClick: (category: IFigureCategories) => void;
  className?: string;
  item: ICategoryItem;
  isSelected?: boolean;
}
