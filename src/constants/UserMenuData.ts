import { IUserLoginItems } from '@/components/LoginMenu/LoginMenu.types';
import { IUserItems } from '@/components/UserMenu/UserMenu.types';
import { Box, User, Settings } from 'lucide-react';

export const UserMenuData: IUserItems[] = [
  {
    icon: Box,
    label: 'My Orders',
    link: 'https://www.worldofminifigs.com/my-orders?status=all',
  },
  {
    icon: User,
    label: 'Profile',
    link: 'https://www.worldofminifigs.com/profile',
  },
  {
    icon: Settings,
    label: 'Settings',
    link: 'https://www.worldofminifigs.com/settings',
  },
];

export const UserLoginData: IUserLoginItems[] = [
  { label: 'Login', link: 'https://www.worldofminifigs.com/login' },
  { label: 'Register', link: 'https://www.worldofminifigs.com/register' },
];
