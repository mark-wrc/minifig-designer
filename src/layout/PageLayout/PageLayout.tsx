import { FooterSection, HeaderSection } from '@/containers';
import { CartContainer } from '@/containers/HeaderSection/components/CartContainer';
import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  const [openShoppingCart, setOpenShoppingCart] = useState(false);

  const handleToggleCart = useCallback(() => {
    setOpenShoppingCart((prev) => !prev);
  }, []);

  return (
    <>
      <HeaderSection />
      <main>
        <Outlet />
      </main>
      <FooterSection onClick={handleToggleCart} />

      {openShoppingCart && <CartContainer onclose={handleToggleCart} />}
    </>
  );
};

PageLayout.displayName = 'PageLayout';

export default PageLayout;
