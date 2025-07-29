import { IUserLoginItems } from '@/components/LoginMenu/LoginMenu.types';
import { IUserItems } from '@/components/UserMenu/UserMenu.types';
import { Box, User, Settings, House, ShoppingBag, Phone, Info } from 'lucide-react';

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

export const MenuItems: IUserItems[] = [
  { icon: House, label: 'Home', link: 'https://www.worldofminifigs.com/' },
  { icon: ShoppingBag, label: 'Product', link: 'https://www.worldofminifigs.com/products' },
  { icon: Phone, label: 'Contact', link: 'https://www.worldofminifigs.com/contact' },
  { icon: Info, label: 'About', link: 'https://www.worldofminifigs.com/about' },
];
