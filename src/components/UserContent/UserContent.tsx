import { memo } from 'react';
import { IUserContentProps } from './UserContent.types';
import { UserAvatar } from '../UserAvatar';
import { cn } from '@/lib/utils';

const UserContent = memo<IUserContentProps>(({ className, user, userAvatarStyles }) => (
  <section className={cn(' flex gap-2 text-white mb-4', className)}>
    <UserAvatar user={user} className={userAvatarStyles} />
    <div className="flex flex-col">
      <h1>{user.userName}</h1>
      <p className=" text-gray-300 text-sm">{user.userEmail}</p>
    </div>
  </section>
));

UserContent.displayName = 'UserContent';

export default UserContent;
