import { MinifigPart, MinifigPartType } from '@/types';

export interface IMinifigCanvasProps {
  projectTitle?: string;
  bodyParts?: Partial<Record<MinifigPartType, MinifigPart>>;
  onPartClick?: (type: MinifigPartType) => void;
  onTitleEdit?: () => void;
  onSkinChange?: () => void;
}
