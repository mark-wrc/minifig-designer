import { memo } from 'react';
import { IMobileNavigation } from './MobileNavigation.types';
import { cn } from '@/lib/utils';
import { Divider, MenuItemNavigation, UserAvatar } from '@/components';
import { motion } from 'motion/react';
import { X, User as UserIcon, ArrowRight } from 'lucide-react';
import { useAuth, useDisableScroll } from '@/hooks';
import { MobileMenuAnimation, MobileMenuOverlayAnimation } from '@/animations';

const MobileNavigation = memo<IMobileNavigation>(
  ({ className, user, menuItems, userItems, onclose, isOpen, setOpenMenu }) => {
    const { user: auth } = useAuth();

    useDisableScroll(isOpen === true);

    return (
      <>
        {/* mobile menu overlay */}
        <motion.div
          variants={MobileMenuOverlayAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
          className="bg-black/90 fixed w-full top-0 left-0 z-50 bottom-0 h-full"
          onClick={() => setOpenMenu?.(false)}
        />

        <motion.section
          variants={MobileMenuAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
          className={cn(
            ' bg-minifig-brand-end w-full sm:w-[75%] h-full fixed right-0 top-0 bottom-0  z-[999999]  p-4 py-7',
            className,
          )}
        >
          <div className=" flex w-full justify-end">
            <X
              color="white"
              size={32}
              className="cursor-pointer hover:bg-red-600 rounded-sm p-1 mb-4"
              onClick={onclose}
            />
          </div>

          {/*user avatar */}
          <section>
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <div className="text-white p-4 bg-[#28385880] mb-4 rounded-md flex items-center justify-between cursor-pointer hover:text-yellow-300">
                <div className="flex items-center gap-2">
                  <span className="bg-[#283858] rounded-full p-2">
                    <UserIcon color="yellow" />
                  </span>
                  <a href="https://www.worldofminifigs.com/login">Sign in </a>
                </div>

                <ArrowRight />
              </div>
            )}
          </section>

          {/* Menu items */}
          <div className="pb-2">
            <MenuItemNavigation className="px-4 text-lg" menuItems={menuItems} />
          </div>

          {auth && (
            <>
              <Divider />

              <div className="mt-4">
                <MenuItemNavigation className="px-4 text-lg" menuItems={userItems} />
              </div>
            </>
          )}
        </motion.section>
      </>
    );
  },
);

MobileNavigation.displayName = 'MobileNavigation';
export default MobileNavigation;
