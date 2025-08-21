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
        className="w-full bg-minifig-brand-end sm:w-[55%] md:w-[60%] lg:w-1/4 xl:w-[50%] fixed right-0 top-0 bottom-0 z-[99999] p-4 flex flex-col"
      >
        <CartHeader items={{ totalItems, totalPrice }} onClose={onclose} />

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

          {projectEntries.map(([projectName, project]) => (
            <section key={projectName} className="mb-6">
              <div className="flex justify-between items-center mb-2 mx-4">
                <div className="text-white pb-4">
                  <StyledText as="h3" className="text-2xl font-bold" text={projectName} />
                  <StyledText
                    className="text-md font-semibold text-gray-300"
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

        {projectEntries.length > 0 && (
          <section className="pt-4">
            <div className="text-white mb-2">
              <StyledText
                className="text-lg font-semibold"
                text={`
                ${projectEntries.length} Minifig project${projectEntries.length !== 1 ? 's' : ''} •
                ${totalItems} total items`}
              />
            </div>
            <CheckoutButton
              totalPrice={totalPrice}
              className="w-full cursor-pointer active:shadow-md active:border-l-0 active:border-t-transparent active:border-b-transparent bg-yellow-300  text-black shadow-lg shadow-yellow-400/50 hover:border-l-0 hover:border-b-transparent hover:border-t-transparent transition-all duration-75 font-bold hover:shadow-md hover:bg-yellow-400 py-3 text-lg border-b-6 border-l-8 border-t-6 border-t-yellow-400 border-l-yellow-600 border-b-transparent"
            />
          </section>
        )}
      </motion.section>
    </>
  );
});

CartContainer.displayName = 'CartContainer';

export default CartContainer;
