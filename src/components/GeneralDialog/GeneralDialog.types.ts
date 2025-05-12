import { ReactNode } from 'react';

export interface IGeneralDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  disableClickOutside?: boolean;
  disableEscapeKey?: boolean;
}
