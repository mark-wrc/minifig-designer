import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { WOFLogo } from '@/assets/images';
import { useAuth, useDisableScroll } from '@/hooks';
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
import { cn } from '@/utils/cn';
import Config from '@/Config';

const HeaderSection = memo(() => {
  const { user } = useAuth();
  const { projects } = useSelector((state: RootState) => state.MinifigBuilderCart);

  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { screenSize } = useWindowResize();
  const isMobile = screenSize.width <= 767;

  useDisableScroll(openCart === true);

  const handleToggleCart = useCallback(() => {
    setOpenCart((prev) => !prev);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  const handleLogoClick = useCallback(() => {
    window.location.href = Config.websiteUrl;
  }, []);

  const totalCartItems = useMemo(() => {
    return Object.values(projects).reduce((acc, project) => {
      // Only count unique items, not their quantity
      return acc + project.items.length;
    }, 0);
  }, [projects]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-5 ">
      <section
        className={cn(
          'w-full px-4 fixed z-50 bg-minifig-brand-end top-0 shadow-lg shadow-minifig-brand-end/50 ',
          isScrolled && 'border-b-2 border-b-gray-800 transition-all duration-75',
        )}
      >
        <div className="lg:container mx-auto flex justify-between  align-middle">
          {/* LOGO */}
          <span onClick={handleLogoClick}>
            <img
              src={WOFLogo}
              className="h-21 cursor-pointer"
              alt="world of minifigs logo"
            />
          </span>

          <section className="flex items-center gap-4">
            <div
              className="cursor-pointer relative hover:bg-black/50 p-1 rounded-sm"
              onClick={handleToggleCart}
            >
              {/* shopping cart icon */}

              <div className="text-xs bg-yellow-300 font-semibold rounded-full w-5 h-5 text-center flex flex-col align-middle justify-center text-black absolute -top-2 -right-2">
                {totalCartItems}
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
      </section>
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
