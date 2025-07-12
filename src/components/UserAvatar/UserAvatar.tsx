import { memo } from 'react';
import { IUserAvatarProps } from './UserAvatar.types';
import { CTAButton } from '../CTAButton';
import { cn } from '@/lib/utils';

const UserAvatar = memo<IUserAvatarProps>(({ user, className }) => (
  <section>
    {user?.imageUrl === undefined ? (
      <img src={user?.imageUrl} alt={user?.userName} />
    ) : (
      <CTAButton
        className={cn('rounded-full cursor-pointer p-0 font-bold w-8 h-8', className)}
        variant="accent"
      >
        {user.userName.charAt(0).toUpperCase()}
      </CTAButton>
    )}
  </section>
));

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
