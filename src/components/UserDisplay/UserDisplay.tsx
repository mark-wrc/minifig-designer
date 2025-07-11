import { memo } from 'react';
import { IUserDisplayProps } from './UserDisplay.types';

const UserDisplay = memo<IUserDisplayProps>(() => <section>user</section>);

UserDisplay.displayName = 'UserDisplay';

export default UserDisplay;
