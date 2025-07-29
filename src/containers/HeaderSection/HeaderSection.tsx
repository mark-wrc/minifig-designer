import { memo, useCallback, useState } from 'react';
import { WOFLogo } from '@/assets/images';
import { useAuth } from '@/hooks';
import { ShoppingCart, Menu } from 'lucide-react';
import { CartContainer } from './components/CartContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserDisplay } from '@/components/UserDisplay';
import { AnimatePresence } from 'motion/react';
import { UserLoginDisplay } from '@/components';
import { MobileNavigation } from './components';
import { MenuItems, UserMenuData } from '@/constants/UserMenuData';
import useWindowResize from '@/hooks/useWindowResize';

const HeaderSection = memo(() => {
  const { user } = useAuth();
  const { projects } = useSelector((state: RootState) => state.MinifigBuilderCart);
  const { screenSize } = useWindowResize();
  const isMobile = screenSize.width <= 767;
  const projectEntries = Object.entries(projects);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleCart = useCallback(() => {
    setOpenCart((prev) => !prev);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  return (
    <section className="py-6">
      <div className="w-full px-4 fixed z-50 bg-minifig-brand-end top-0 py-4">
        <div className="lg:container mx-auto flex justify-between  align-middle">
          <img src={WOFLogo} className="w-[100px] md:w-1/12" alt="world of minifigs logo" />
          <section className="flex items-center gap-2">
            <div
              className=" cursor-pointer relative  bg-transparent hover:bg-white/10 rounded-sm p-1"
              onClick={handleToggleCart}
            >
              <div className=" bg-red-500 rounded-full w-5 h-5 text-center flex flex-col align-middle justify-center text-white absolute -top-2 -right-2">
                {projectEntries.length}
              </div>
              <ShoppingCart color="white" size={24} />
            </div>

            {/* User Menu  */}
            <section className="hidden md:block">
              {user ? <UserDisplay user={user} /> : <UserLoginDisplay />}
            </section>

            {isMobile && (
              <section>
                <div
                  onClick={handleToggleMenu}
                  className="hover:bg-white/10 rounded-sm p-1 cursor-pointer"
                >
                  <Menu color="white" />
                </div>
              </section>
            )}
          </section>
        </div>
      </div>
      <AnimatePresence>
        {openMenu && isMobile && (
          <MobileNavigation
            user={user}
            menuItems={MenuItems}
            userItems={UserMenuData}
            onclose={handleToggleMenu}
            isOpen={openMenu}
            setOpenMenu={setOpenMenu}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openCart && <CartContainer setOpenCart={setOpenCart} onclose={handleToggleCart} />}
      </AnimatePresence>
    </section>
  );
});

HeaderSection.displayName = 'HeaderSection';

export default HeaderSection;
