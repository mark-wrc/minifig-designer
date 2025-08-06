import { UseDisclosureReturn } from '@/hooks';
import type { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData } from '@/types/Minifig';

export type IMinifigPartImageMap = {
  [key in MinifigPartType]?: {
    image: string;
    type: MinifigPartType;
  };
};

export interface IMinifigCanvasEventHandlers {
  onPartClick?: (type: MinifigPartType) => void;
  onTitleEdit?: () => void;
  onSkinChange?: () => void;
}

export interface IMinifigCanvasUIProps {
  className?: string;
  wardrobeContainerStyle?: string;
  selectorComponent?: React.ReactElement | null;
}

export interface IMinifigCanvasDataProps {
  projectTitle?: string;
  minifigProjects?: IMinifigProject[];
  wardrobeItems?: MinifigPartData[];
  minifigParts: IMinifigPartImageMap;
  cartModalDisclosure?: UseDisclosureReturn;
  isLoading?: boolean;
}

export interface IMinifigCanvasProps
  extends IMinifigCanvasDataProps,
    IMinifigCanvasEventHandlers,
    IMinifigCanvasUIProps {}
