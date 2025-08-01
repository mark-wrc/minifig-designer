import { IMinifigProject } from '@/types/Minifig';

export interface IMinifigBuilderCardPopupModalProps {
  onclose: () => void;
  minifig: IMinifigProject[];
}
