import { IFigureCategories } from '@/types/FigureCategories';

export interface CategorySelectorProps {
  onClick: (category: string) => void;
  className?: string;
  categories: IFigureCategories;
  selectedCategory: string;
  children?: React.ReactNode;
}
