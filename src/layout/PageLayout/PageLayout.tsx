import { FooterSection, HeaderSection } from '@/containers';
import { CartContainer } from '@/containers/HeaderSection/components/CartContainer';
import { CustomErrorPage } from '@/pages';
import { AnimatePresence } from 'motion/react';
import { useCallback, useState } from 'react';
import { Outlet, useRouteError } from 'react-router-dom';

const PageLayout = () => {
  const [openShoppingCart, setOpenShoppingCart] = useState(false);
  const error = useRouteError();

  const handleToggleCart = useCallback(() => {
    setOpenShoppingCart((prev) => !prev);
  }, []);

  if (error) {
    return <CustomErrorPage />;
  }

  return (
    <>
      <HeaderSection />
      <main>
        <Outlet />
      </main>
      <FooterSection onClick={handleToggleCart} />
      <AnimatePresence>
        {openShoppingCart && (
          <CartContainer setOpenCart={setOpenShoppingCart} onclose={handleToggleCart} />
        )}
      </AnimatePresence>
    </>
  );
};

PageLayout.displayName = 'PageLayout';

export default PageLayout;
