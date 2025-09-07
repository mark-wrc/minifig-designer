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
                  className="self-end bg-red-700 hover:bg-red-600 shadow-md shadow-red-500/50"
                  onClick={() => handleRemoveCartItem(projectName, item._id)}
                >
                  <Trash2 color="white" />
                </CTAButton>

                {/* Quantity control section */}

                <div className=" mt-4 flex items-center gap-4 justify-end self-end p-2 border-2 border-gray-600/30 w-fit rounded-md ">
                  <CTAButton
                    className={cn(itemQuantity && 'opacity-50')}
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
                    className="cursor-pointer  "
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
