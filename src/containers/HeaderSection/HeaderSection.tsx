import { memo, useCallback, useState } from 'react';
import { WOFLogo } from '@/assets/images';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { CartContainer } from './components/CartContainer';

const HeaderSection = memo(() => {
  const { userName, logout } = useAuth();

  const [openCart, setOpenCart] = useState(false);

  const handleToggleCart = useCallback(() => {
    setOpenCart((prev) => !prev);
  }, []);
  return (
    <div className=" bg-minifig-brand-end py-6 ">
      <div className=" container mx-auto  flex justify-between align-middle px-4">
        <img src={WOFLogo} className="w-1/10" alt="world of minifigs logo" />

        <section>
          <ShoppingCart onClick={handleToggleCart} className=" text-white cursor-pointer" />
        </section>
        {userName && (
          <div className=" flex flex-col gap-4">
            <span className=" text-white font-bold">{userName}</span>

            <Button className=" cursor-pointer" onClick={logout}>
              logout
            </Button>
          </div>
        )}
      </div>

      {openCart && <CartContainer onclose={handleToggleCart} />}
    </div>
  );
});

HeaderSection.displayName = 'HeaderSection';

export default HeaderSection;
