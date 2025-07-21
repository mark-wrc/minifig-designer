/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from 'react';
import { GeneralCard } from '../GeneralCard';
import type { ICartItemProps } from './CartItem.types';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { CTAButton } from '../CTAButton';

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
      const item = cartItems.find((item) => item.id === itemId);
      if (item) {
        const newQuantity = item.quantity + change;
        updateItemQuantity(projectName, itemId, newQuantity);
      }
    },
    [cartItems, projectName, updateItemQuantity],
  );

  return (
    <>
      {cartItems.map((item) => (
        <GeneralCard key={item.id} className="bg-transparent border-none mb-4 w-full">
          <section className="flex gap-2 text-white justify-between">
            <div className="flex gap-2">
              <img
                src={item.partImage || '/placeholder.svg'}
                className="w-32 rounded-sm"
                alt={item.partName}
              />
              <div className="flex flex-col">
                <h3>{item.partName}</h3>
                <p>{item.partType}</p>
                <p>${item.price}</p>
              </div>
            </div>

            {/* actions */}
            <section className="flex flex-col gap-4">
              <CTAButton
                variant="ghost"
                className="self-end hover:bg-red-500 hover:text-white"
                onClick={() => handleRemoveCartItem(projectName, item.id)}
              >
                <Trash2 />
              </CTAButton>
              <div className="flex items-center gap-4">
                <CTAButton
                  variant="default"
                  className="cursor-pointer hover:bg-red-600 hover:text-white"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus strokeWidth={2.75} />
                </CTAButton>
                <span className="min-w-[2rem] text-center">{item.quantity}</span>
                <CTAButton
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus />
                </CTAButton>
              </div>
              <div className="text-xs text-gray-400">Stock: {item.stock}</div>
            </section>
          </section>
        </GeneralCard>
      ))}
    </>
  );
});

CartItem.displayName = 'CartItem';
export default CartItem;
