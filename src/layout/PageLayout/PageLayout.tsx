import { FooterSection, HeaderSection } from '@/containers';
import { CartContainer } from '@/containers/HeaderSection/components/CartContainer';
import CustomErrorPage from '@/pages/CustomErrorPage';
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

      {openShoppingCart && <CartContainer onclose={handleToggleCart} />}
    </>
  );
};

PageLayout.displayName = 'PageLayout';

export default PageLayout;
