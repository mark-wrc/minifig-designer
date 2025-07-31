import { UseDisclosureReturn } from '@/hooks';
import { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData } from '@/types/Minifig';

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
}
