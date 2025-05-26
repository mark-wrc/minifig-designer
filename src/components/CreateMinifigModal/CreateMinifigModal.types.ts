export interface ICreateMinifigModalProps {
  initialProjectName?: string;
  onClose?: () => void;
  mode?: 'create' | 'edit';
  characterId?: string;
}
