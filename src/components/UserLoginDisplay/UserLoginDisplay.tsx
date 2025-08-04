import { memo } from 'react';
import { GeneralPopover } from '../GeneralPopover';
import { CircleUserRound } from 'lucide-react';
import { LoginMenu } from '../LoginMenu';
import { UserLoginData } from '@/constants/UserMenuData';

const UserLoginDisplay = memo(() => (
  <GeneralPopover
    className="bg-[#283858] border-minifig-brand-end/55 w-fit p-1 cursor-pointer"
    content={<LoginMenu userLoginItems={UserLoginData} />}
  >
    <div className="hover:bg-white/10 rounded-sm p-1">
      <CircleUserRound size={24} color="white" />
    </div>
  </GeneralPopover>
));

UserLoginDisplay.displayName = 'UserLoginDisplay';
export default UserLoginDisplay;
