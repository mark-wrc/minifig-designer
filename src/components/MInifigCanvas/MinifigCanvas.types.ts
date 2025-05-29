import { MinifigPartData } from '@/constants/DummyParts';
import { MinifigPartType } from '@/types';

export interface IMinifigCanvasProps {
  projectTitle?: string;
  bodyParts: {
    [key in MinifigPartType]?: {
      image: string;
      type: MinifigPartType;
    };
  };
  onPartClick?: (type: MinifigPartType) => void;
  onTitleEdit?: () => void;
  onSkinChange?: () => void;
  wardrobeItems?: MinifigPartData[];
}
