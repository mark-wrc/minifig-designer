import { IUser } from '@/types';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IUserItems {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  label: string;
  link?: string;
}

export interface IUserMenuProps {
  menuItems: IUserItems[];
  onClick?: () => void;
  className?: string;
  user: IUser;
}
