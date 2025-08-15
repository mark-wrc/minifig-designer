import { UseDisclosureReturn } from '@/hooks';
import { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData } from '@/types/Minifig';
import { Dispatch } from 'react';

export interface IMinifigWardrobeBaseProps {
  wardrobeItems: MinifigPartData[];
  selectedCategory: MinifigPartType | null;
  onPartSelect: (part: MinifigPartData) => void;
  onCategoryClick?: (item: MinifigPartData) => void;
  onItemDetailsClick: (item: MinifigPartData) => void;
  isLoading?: boolean;
}

export interface IMinifigWardrobeUIProps {
  ref: HTMLDivElement;
  className?: string;
  selectorComponent?: React.ReactElement | null;
}

export interface IMinifigWardrobeExtras {
  cartModalDisclosure?: UseDisclosureReturn;
  minifigProjects: IMinifigProject[];
}

export interface IMinifigWardrobeProps
  extends IMinifigWardrobeBaseProps,
    IMinifigWardrobeUIProps,
    IMinifigWardrobeExtras {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}
