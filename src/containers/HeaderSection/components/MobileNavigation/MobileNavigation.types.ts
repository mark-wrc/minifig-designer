import { IUserItems } from '@/components/UserMenu/UserMenu.types';
import { IUser } from '@/types';
import { Dispatch, SetStateAction } from 'react';

export interface IMobileNavigation {
  className?: string;
  user?: IUser;
  menuItems: IUserItems[];
  userItems: IUserItems[];
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
  onclose: () => void;
  isOpen?: boolean;
}
