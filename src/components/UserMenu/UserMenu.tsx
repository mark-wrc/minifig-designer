import { memo } from 'react';
import { IUserMenuProps } from './UserMenu.types';
import { LogOut } from 'lucide-react';
import { UserAvatar } from '../UserAvatar';
import { Divider } from '../Divider';
import { useAuth } from '@/hooks';

const UserMenu = memo<IUserMenuProps>(({ menuItems, user }) => {
  const { logout } = useAuth();
  return (
    <section className="bg-transparent">
      {/*user details section  */}
      <section className=" flex gap-2 text-white mb-4">
        <UserAvatar user={user} />
        <div className="flex flex-col">
          <h1 className="font-semibold">{user.userName}</h1>
          <p className=" text-gray-300 text-sm">{user.userEmail}</p>
        </div>
      </section>
      <Divider className="bg-minifig-brand-end/50 h-[1.5px]  mb-4" />

      {/*menu items section  */}
      {menuItems.map((item) => (
        <a className="flex gap-4 cursor-pointer mb-2 text-sm" key={item.label} href={item.link}>
          <item.icon size={20} color="white" />
          <h3 className="text-white">{item.label}</h3>
        </a>
      ))}

      <Divider className="bg-minifig-brand-end/50 h-[1.5px] mb-4" />
      <div
        onClick={() => logout()}
        className=" cursor-pointer flex gap-4 font-semibold text-sm text-white"
      >
        <LogOut size={20} />
        <p>Logout</p>
      </div>
    </section>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;
