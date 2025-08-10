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
              <div className="flex flex-col gap-0  md:gap-4">
                <CTAButton
                  variant="ghost"
                  className="self-end hover:bg-red-500 hover:text-white"
                  onClick={() => handleRemoveCartItem(projectName, item._id)}
                >
                  <Trash2 />
                </CTAButton>
                <div className="flex items-center gap-4 border-2 p-2 rounded-md border-gray-600">
                  <CTAButton
                    className={cn(
                      'cursor-pointer bg-red-500 hover:bg-red-600 hover:text-white',
                      itemQuantity && 'opacity-50',
                    )}
                    onClick={() => updateQuantity(item._id, -1)}
                    disabled={itemQuantity}
                  >
                    <Minus strokeWidth={2.75} />
                  </CTAButton>
                  <span className="min-w-[2rem] text-center">{item.quantity}</span>
                  <CTAButton
                    className="cursor-pointer bg-yellow-300 text-black hover:bg-yellow-400"
                    onClick={() => updateQuantity(item._id, 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus />
                  </CTAButton>
                </div>
                <div className="text-sm text-gray-400 mt-4">Stock: {item.stock}</div>
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
