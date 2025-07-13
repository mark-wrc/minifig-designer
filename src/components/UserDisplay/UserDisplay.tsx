import { memo } from 'react';
import { IUserDisplayProps } from './UserDisplay.types';
import { GeneralPopover } from '../GeneralPopover';
import { UserMenu } from '../UserMenu';
import { UserMenuData } from '@/constants/UserMenuData';
import { UserAvatar } from '../UserAvatar';

const UserDisplay = memo<IUserDisplayProps>(({ user }) => (
  <section>
    <GeneralPopover
      className="bg-minifig-lavander-blue border-minifig-brand-end/55 w-fit mr-4"
      content={<UserMenu user={user} menuItems={UserMenuData} />}
    >
      <UserAvatar user={user} />
    </GeneralPopover>
  </section>
));

UserDisplay.displayName = 'UserDisplay';

export default UserDisplay;
