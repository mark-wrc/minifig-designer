/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback } from 'react';
import { GeneralCard } from '../GeneralCard';
import type { ICartItemProps } from './CartItem.types';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { useShoppingCart } from '@/hooks/useShoppingCart';

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
            <section className="flex flex-col gap-4">
              <span
                className="hover:bg-black/50 w-fit h-fit p-2 rounded-sm cursor-pointer self-end"
                onClick={() => handleRemoveCartItem(projectName, item.id)}
              >
                <Trash2 />
              </span>
              <div className="flex items-center gap-4">
                <Button
                  className="cursor-pointer"
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus />
                </Button>
                <span className="min-w-[2rem] text-center">{item.quantity}</span>
                <Button
                  className="cursor-pointer"
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus />
                </Button>
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
