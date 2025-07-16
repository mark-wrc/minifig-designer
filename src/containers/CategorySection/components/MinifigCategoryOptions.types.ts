import { ICategoryItem } from '@/types';
import { IMinifigProject } from '@/types/Minifig';

export interface IMinifigCategoryOptions {
  minifigCategories?: ICategoryItem[];
  activeMinifigProject?: IMinifigProject;
  className?: string;
  categoryContainerStyle?: string;
  isMobileMode?: boolean;
}
