import { UseDisclosureReturn } from '@/hooks';
import { MinifigPartType } from '@/types';
import { IMinifigProject } from '@/types/Minifig';

export interface IMinifigRendererProps {
  minifigParts: {
    [key in MinifigPartType]?: {
      image: string;
      type: MinifigPartType;
    };
  };
  ActiveMinifigProject?: IMinifigProject;
  modalDisclosure: UseDisclosureReturn;
  setModalMode: (mode: 'create' | 'edit') => void;
  className?: string;
  isMinfigItemDetails?: boolean;
}
