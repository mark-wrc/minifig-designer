import { DialogContentProps } from '@radix-ui/react-dialog';

export interface ICreateMinifigModalProps extends DialogContentProps {
  initialProjectName?: string;
  onClose?: () => void;
  mode?: 'create' | 'edit';
  characterId?: string;
  isOpen?: boolean;
}
