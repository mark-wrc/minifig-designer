import { MinifigPartData } from '@/types/Minifig';
import { IMinifigWardrobeBaseProps } from '../MinifigWardrobe/MinifigWardrobe.types';

export interface IMinifigWardrobeItemProps
  extends Omit<IMinifigWardrobeBaseProps, 'wardrobeItems' | 'selectedCategory'> {
  minifigItem: MinifigPartData;
  className?: string;
}
