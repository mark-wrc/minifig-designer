import { UseDisclosureReturn } from '@/hooks';
import { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData } from '@/types/Minifig';
import { Dispatch } from 'react';

export interface IMinifigDesktopModeProps {
  modalDisclosure: UseDisclosureReturn;
  minifigProjects: IMinifigProject[];
  minifigParts: {
    [key in MinifigPartType]?: {
      image: string;
      type: MinifigPartType;
    };
  };
  minifigData: MinifigPartData[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}
