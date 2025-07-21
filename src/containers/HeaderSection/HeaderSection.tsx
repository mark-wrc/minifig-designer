import { memo, useCallback, useState } from 'react';
import { WOFLogo } from '@/assets/images';
import { useAuth } from '@/hooks';
import { ShoppingCart } from 'lucide-react';
import { CartContainer } from './components/CartContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CircleUserRound } from 'lucide-react';
import { UserDisplay } from '@/components/UserDisplay';
import { AnimatePresence } from 'motion/react';

const HeaderSection = memo(() => {
  const { user } = useAuth();
  const { projects } = useSelector((state: RootState) => state.MinifigBuilderCart);

  const projectEntries = Object.entries(projects);
  const [openCart, setOpenCart] = useState(false);

  const handleToggleCart = useCallback(() => {
    setOpenCart((prev) => !prev);
  }, []);

  return (
    <section className="py-6">
      <div className="w-full px-4 fixed z-50 bg-minifig-brand-end top-0 py-4">
        <div className="lg:container  mx-auto flex justify-between  align-middle">
          <img src={WOFLogo} className=" w-[100px] md:w-1/12 " alt="world of minifigs logo" />
          <section className="flex items-center gap-4">
            <div
              className=" cursor-pointer relative  bg-transparent hover:bg-white/10"
              onClick={handleToggleCart}
            >
              <div className=" bg-red-500 rounded-full w-5 h-5 text-center flex flex-col align-middle justify-center text-white absolute -top-2 -right-2">
                {projectEntries.length}
              </div>
              <ShoppingCart color="white" size={24} />
            </div>
            <div className=" cursor-pointer">
              {user ? <UserDisplay user={user} /> : <CircleUserRound size={24} color="white" />}
            </div>
          </section>
        </div>
      </div>
      <AnimatePresence>
        {openCart && <CartContainer setOpenCart={setOpenCart} onclose={handleToggleCart} />}
      </AnimatePresence>
    </section>
  );
});

HeaderSection.displayName = 'HeaderSection';

export default HeaderSection;
