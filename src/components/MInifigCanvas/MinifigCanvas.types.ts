import type { MinifigPartType } from '@/types';
import { MinifigPartData } from '@/types/Minifig';

export interface IMinifigCanvasProps {
  projectTitle?: string;
  minifigParts: {
    [key in MinifigPartType]?: {
      image: string;
      type: MinifigPartType;
    };
  };
  onPartClick?: (type: MinifigPartType) => void;
  onTitleEdit?: () => void;
  onSkinChange?: () => void;
  wardrobeItems?: MinifigPartData[];
  className?: string;
  wardrobeContainerStyle?: string;
  selectorComponent?: React.ReactElement | null;
}
