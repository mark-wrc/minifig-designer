import { memo } from 'react';
import { ILoginMenuProps } from './LoginMenu.types';

const LoginMenu = memo<ILoginMenuProps>(({ userLoginItems }) => (
  <section className="background-transparent p-2">
    {userLoginItems.map((item) => (
      <a href={item.link} key={item.label}>
        <div className="w-full hover:bg-yellow-400 p-1 text-white hover:text-black rounded-sm">
          {item.label}
        </div>
      </a>
    ))}
  </section>
));
LoginMenu.displayName = 'LoginMenu';

export default LoginMenu;
