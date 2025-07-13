import { IUserItems } from '@/components/UserMenu/UserMenu.types';
import { Box, User, Settings } from 'lucide-react';

export const UserMenuData: IUserItems[] = [
  {
    icon: Box,
    label: 'My Orders',
    link: '/',
  },
  {
    icon: User,
    label: 'Profile',
    link: '/',
  },
  {
    icon: Settings,
    label: 'Settings',
    link: '/',
  },
];
