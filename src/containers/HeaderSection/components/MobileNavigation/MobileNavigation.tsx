import { memo } from 'react';
import { IMobileNavigation } from './MobileNavigation.types';
import { cn } from '@/lib/utils';
import { CTAButton, Divider, MenuItemNavigation, Overlay, UserContent } from '@/components';
import { motion } from 'motion/react';
import { X, LogOut } from 'lucide-react';
import { useAuth, useDisableScroll } from '@/hooks';
import { MobileMenuAnimation, MobileMenuOverlayAnimation } from '@/animations';
import { SignInButton } from '../SignInButton';

const MobileNavigation = memo<IMobileNavigation>(
  ({ className, user, menuItems, userItems, onclose, isOpen, setOpenMenu }) => {
    const { user: auth, logout } = useAuth();

    useDisableScroll(isOpen === true);

    return (
      <>
        {/* mobile menu overlay */}
        <Overlay variants={MobileMenuOverlayAnimation} onClick={() => setOpenMenu?.(false)} />

        <motion.section
          variants={MobileMenuAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
          className={cn(
            ' bg-minifig-brand-end w-full sm:w-[75%] h-full fixed right-0 top-0 bottom-0 z-[999999] p-4 py-7',
            className,
          )}
        >
          <div className="flex w-full justify-end">
            <X
              color="white"
              size={32}
              className="cursor-pointer hover:bg-red-600 rounded-sm p-1 mb-4"
              onClick={onclose}
            />
          </div>

          {/*user avatar */}
          <section className="mb-2">
            {user ? (
              <UserContent
                user={user}
                className="w-full flex text-base bg-[#28385880] rounded-md p-4 gap-4"
                userAvatarStyles="w-12 h-12 text-md"
              />
            ) : (
              <SignInButton url="https://www.worldofminifigs.com/login" />
            )}
          </section>

          {/* Menu items */}
          <div className="pb-2">
            <MenuItemNavigation className="px-4 py-2 text-lg" menuItems={menuItems} />
          </div>

          {auth && (
            <>
              <Divider className="bg-[#44608080]" />

              <div className="mt-4">
                <MenuItemNavigation className="px-4 py-2 text-lg" menuItems={userItems} />
              </div>
            </>
          )}

          <section className="p-3 w-full flex absolute left-0 bottom-1 border-t-2 border-t-[#44608080]">
            <CTAButton
              variant="default"
              className="w-full bg-red-500 text-lg hover:bg-red-700"
              onClick={logout}
            >
              <span className="flex items-center gap-2">
                Logout
                <LogOut strokeWidth={3} />
              </span>
            </CTAButton>
          </section>
        </motion.section>
      </>
    );
  },
);

MobileNavigation.displayName = 'MobileNavigation';
export default MobileNavigation;
