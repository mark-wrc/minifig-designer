import { IMinifigProject } from '@/types/Minifig';

export interface IMinifigTabContentProps {
  character: IMinifigProject;
  onDelete: (id: string, e: React.MouseEvent) => void;
}
