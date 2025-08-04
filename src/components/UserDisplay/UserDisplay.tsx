import { memo } from 'react';
import { IUserDisplayProps } from './UserDisplay.types';
import { GeneralPopover } from '../GeneralPopover';
import { UserMenu } from '../UserMenu';
import { UserMenuData } from '@/constants/UserMenuData';
import { UserAvatar } from '../UserAvatar';

const UserDisplay = memo<IUserDisplayProps>(({ user }) => (
  <GeneralPopover
    className="bg-[#283858] border-minifig-brand-end/55 w-fit p-1 cursor-pointer "
    content={<UserMenu user={user} menuItems={UserMenuData} />}
  >
    <div className="hover:bg-white/10 rounded-sm p-1">
      <UserAvatar user={user} />
    </div>
  </GeneralPopover>
));

UserDisplay.displayName = 'UserDisplay';

export default UserDisplay;
