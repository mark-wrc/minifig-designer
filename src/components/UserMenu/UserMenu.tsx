import { memo } from 'react';
import { IUserMenuProps } from './UserMenu.types';
import { LogOut } from 'lucide-react';
import { UserAvatar } from '../UserAvatar';
import { Divider } from '../Divider';
import { useAuth } from '@/hooks';
import { MenuItemNavigation } from '../MenuItemNavigation';

const UserMenu = memo<IUserMenuProps>(({ menuItems, user }) => {
  const { logout } = useAuth();
  return (
    <section className="bg-transparent p-2">
      {/*user details section  */}
      <section className=" flex gap-2 text-white mb-4">
        <UserAvatar user={user} />
        <div className="flex flex-col">
          <h1>{user.userName}</h1>
          <p className=" text-gray-300 text-sm">{user.userEmail}</p>
        </div>
      </section>
      <Divider className="bg-minifig-brand-end/50 h-[1.5px] mb-4" />

      {/*menu items section  */}
      <MenuItemNavigation menuItems={menuItems} />

      <Divider className="bg-minifig-brand-end/50 h-[1.5px] mb-4" />
      <div
        onClick={() => logout()}
        className=" cursor-pointer flex gap-4 text-sm text-red-500 hover:text-black hover:bg-yellow-400 transition-all duration-150 rounded-sm p-1"
      >
        <LogOut size={20} />
        <p>Logout</p>
      </div>
    </section>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;
