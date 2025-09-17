import { memo } from 'react';
import { IMenuItemNavigation } from './MenuItemNavigation.types';
import { cn } from '@/utils/cn';

const MenuItemNavigation = memo<IMenuItemNavigation>(({ menuItems, className }) => (
  <>
    {menuItems.map((item) => (
      <a
        className={cn(
          'flex gap-4 w-full cursor-pointer mb-2 items-center text-sm hover:bg-yellow-400 text-white hover:text-black  p-1 rounded-sm',
          className,
        )}
        key={item.label}
        href={item.link}
      >
        <item.icon size={20} />
        <p>{item.label}</p>
      </a>
    ))}
  </>
));

MenuItemNavigation.displayName = 'MenuItemNavigation';
export default MenuItemNavigation;
