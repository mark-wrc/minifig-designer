import { memo, useCallback, useEffect } from 'react';
import type { ICartContainerProps } from './CartContainer.types';
import { CartItem, CTAButton, Divider, Overlay, StyledText } from '@/components';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { motion } from 'motion/react';
import { CartContainerAnimation, CartOverlayAnimation } from '@/animations';
import { CheckoutButton } from '../CheckoutButton';
import { formatCurrency } from '@/utils';
import { CartHeader } from '../CartHeader';

const CartContainer = memo<ICartContainerProps>(({ onclose, setOpenCart }) => {
  const { projects, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.MinifigBuilderCart,
  );

  const { removeProjectFromCart, initializeCart } = useShoppingCart();

  // Initialize cart from localStorage on mount
  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const handleRemoveProject = useCallback(
    (projectName: string) => {
      removeProjectFromCart(projectName);
    },
    [removeProjectFromCart],
  );

  const projectEntries = Object.entries(projects);

  return (
    <>
      {/* Overlay */}
      <Overlay variants={CartOverlayAnimation} onClick={() => setOpenCart?.(false)} />

      {/* Cart Container */}
      <motion.section
        variants={CartContainerAnimation}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full bg-minifig-brand-end sm:w-[55%] md:w-[60%] lg:w-[80%] xl:w-[40%] fixed right-0 top-0 bottom-0 z-[99999] p-2 flex flex-col"
      >
        <div className="mb-4">
          <CartHeader items={{ totalItems, totalPrice }} onClose={onclose} />
          <Divider className="mt-2 border border-gray-600" />
        </div>

        {/*Empty state UI */}

        <div className="flex-1 overflow-y-auto minifig-scrollbar ">
          {projectEntries.length === 0 && (
            <div className="text-center text-white h-full flex flex-col align-middle justify-center">
              <StyledText
                as="h1"
                className="text-5xl md:text-4xl mb-4 font-bold"
                text="Your cart is empty"
              />
              <StyledText text="Add some minifigs to your cart to get started!" />
            </div>
          )}

          {/* Grouped list rendering section  */}

          {projectEntries.map(([projectName, project]) => (
            <section key={projectName} className="mb-6  px-2">
              <div className="flex justify-between items-center mb-2 ">
                <div className="text-white pb-4">
                  <StyledText
                    as="h3"
                    className="text-2xl font-bold text-gray-300"
                    text={projectName}
                  />
                  <StyledText
                    className="text-md font-semibold text-green-400"
                    text={formatCurrency(project.totalPrice)}
                  />
                </div>
                <CTAButton
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveProject(projectName)}
                  className="text-sm shadow-md shadow-red-500/50 "
                >
                  Remove All
                </CTAButton>
              </div>

              <CartItem data={project.items} projectName={projectName} />

              <Divider className="bg-gray-600 my-4" />
            </section>
          ))}
        </div>

        {/* Cart summary and checkout section  */}

        {projectEntries.length > 0 && (
          <section className="pt-4 px-2">
            <div className="text-white mb-2">
              <StyledText
                className="text-sm font-semibold"
                text={`
                ${projectEntries.length} Minifig project${projectEntries.length !== 1 ? 's' : ''} •
                ${totalItems} total items`}
              />
            </div>
            <CheckoutButton className="p-3 bg-yellow-300 text-black font-semiBold text-md w-full hover:bg-yellow-400 active:bg-yellow-400 hover:scale-102 transition-all duration-75" />
          </section>
        )}
      </motion.section>
    </>
  );
});

CartContainer.displayName = 'CartContainer';

export default CartContainer;
