import { memo } from 'react';
import { LoginMenu } from '../LoginMenu';

const UserLoginDisplay = memo(() => <LoginMenu />);

UserLoginDisplay.displayName = 'UserLoginDisplay';
export default UserLoginDisplay;
