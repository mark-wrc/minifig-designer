/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from 'react';
import { GeneralCard } from '../GeneralCard';
import type { ICartItemProps } from './CartItem.types';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { CTAButton } from '../CTAButton';
import { CartItemDetails } from '../CartItemDetails';
import { cn } from '@/lib/utils';

const CartItem = memo<ICartItemProps>(({ projectName }) => {
  const { getMinifigProject, removeItemFromCart, updateItemQuantity } = useShoppingCart();

  const project = getMinifigProject(projectName);
  const cartItems = project?.items || [];

  const handleRemoveCartItem = useCallback(
    (projectName: string, itemId: string) => {
      removeItemFromCart(projectName, itemId);
    },
    [removeItemFromCart],
  );

  // Update quantity in Redux store
  const updateQuantity = useCallback(
    (itemId: string, change: number) => {
      const item = cartItems.find((item) => item._id === itemId);
      if (item) {
        const newQuantity = item.quantity + change;
        updateItemQuantity(projectName, itemId, newQuantity);
      }
    },
    [cartItems, projectName, updateItemQuantity],
  );

  return (
    <>
      {cartItems.map((item) => {
        const itemQuantity = item.quantity <= 1;
        return (
          <GeneralCard key={item._id} className="bg-transparent border-none mb-4 w-full">
            <section className="flex flex-col md:flex-row gap-2 text-white justify-between">
              {/* details */}

              <CartItemDetails item={item} />

              {/* actions */}
              <div className="flex flex-col gap-0 md:gap-4 p-2">
                <CTAButton
                  variant="ghost"
                  className="self-end hover:bg-red-500 border-b-6 border-l-6 border-t-6 py-4 bg-red-500 border-l-red-800 border-t-red-500 border-b-transparent shadow-lg hover:shadow-md shadow-red-500/50 hover:border-l-0 hover:border-t-transparent  hover:-translate-x-0.5  active:-translate-x-0.5 active:border-l-0 active:border-t-transparent hover:text-white"
                  onClick={() => handleRemoveCartItem(projectName, item._id)}
                >
                  <Trash2 />
                </CTAButton>
                <div className=" mt-4 flex items-center gap-4 justify-end self-end p-2 border-2 border-gray-600/30 w-fit rounded-md ">
                  <CTAButton
                    className={cn(
                      'cursor-pointer bg-red-500 hover:bg-red-600 py-4 hover:border-l-transparent group active:border-l-transparent active:border-t-transparent hover:border-t-transparent hover:-translate-x-0.5 active:translate-x-0.5  hover:text-white border-l-8 border-b-6 border-t-6 border-l-red-800 border-t-red-400 border-b-transparent transition-all duration-75 shadow-lg hover:shadow-md shadow-red-500/50',
                      itemQuantity && 'opacity-50',
                    )}
                    onClick={() => updateQuantity(item._id, -1)}
                    disabled={itemQuantity}
                  >
                    <Minus
                      strokeWidth={4}
                      className="group-hover:-translate-x-1 transition-all duration-75"
                    />
                  </CTAButton>
                  <span className="min-w-[2rem] text-center">{item.quantity}</span>
                  <CTAButton
                    className="cursor-pointer bg-yellow-300 border-l-8 py-4 border-t-6 border-b-6 group hover:border-l-transparent  hover:border-t-transparent hover:-translate-x-0.5 active:-translate-x-0.5 border-l-yellow-600 border-t-yellow-400 border-b-transparent shadow-lg hover:shadow-md shadow-yellow-400/50 text-black hover:bg-yellow-400"
                    onClick={() => updateQuantity(item._id, 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus
                      strokeWidth={4}
                      className="group-hover:-translate-x-1 transition-all duration-75"
                    />
                  </CTAButton>
                </div>
                <div className="text-md font-semibold text-gray-400 mt-4">Stock: {item.stock}</div>
              </div>
            </section>
          </GeneralCard>
        );
      })}
    </>
  );
});

CartItem.displayName = 'CartItem';
export default CartItem;
