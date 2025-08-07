import { memo, useCallback, useEffect } from 'react';
import type { ICartContainerProps } from './CartContainer.types';
import { CartItem, Divider, Overlay } from '@/components';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { motion } from 'motion/react';
import { CartContainerAnimation, CartOverlayAnimation } from '@/animations';
import { CheckoutButton } from '../CheckoutButton';
import { formatCurrency } from '@/utils';

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
        className="w-full bg-minifig-brand-end sm:w-[55%] md:w-[60%] lg:w-1/4 xl:w-1/3 fixed right-0 top-0 bottom-0 z-[99999] p-4 flex flex-col"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <h2 className="text-2xl">Cart ({totalItems})</h2>
            <p className="text-lg">Sub total: {formatCurrency(totalPrice)}</p>
          </div>
          <X
            color="white"
            size={32}
            className="cursor-pointer hover:bg-red-600 rounded-sm p-1"
            onClick={onclose}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {projectEntries.length === 0 && (
            <div className="text-center text-white h-full flex flex-col align-middle justify-center">
              <h1 className="text-4xl mb-4">Your cart is empty</h1>
              <p>Add some minifigs to your cart to get started!</p>
            </div>
          )}

          {projectEntries.map(([projectName, project]) => (
            <section key={projectName} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-white">
                  <h3 className="text-lg">{projectName}</h3>
                  <p className="text-sm text-gray-300">{formatCurrency(project.totalPrice)}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveProject(projectName)}
                  className="text-sm cursor-pointer"
                >
                  Remove All
                </Button>
              </div>

              <CartItem data={project.items} projectName={projectName} />

              <Divider className="bg-gray-600 my-4" />
            </section>
          ))}
        </div>

        {projectEntries.length > 0 && (
          <section className="pt-4">
            <div className="text-white mb-2">
              <p className="text-sm">
                {projectEntries.length} Minifig project{projectEntries.length !== 1 ? 's' : ''} •{' '}
                {totalItems} total items
              </p>
            </div>
            <CheckoutButton
              totalPrice={totalPrice}
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 uppercase"
            />
          </section>
        )}
      </motion.section>
    </>
  );
});

CartContainer.displayName = 'CartContainer';

export default CartContainer;
