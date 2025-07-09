import { memo, useCallback, useState } from 'react';
import { GeneralCard } from '../GeneralCard';
import type { ICartItemProps } from './CartItem.types';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '@/store/CartSlice/CartSlice';
import type { CartItem } from '@/store/CartSlice/CartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';

const CartItem = memo<ICartItemProps>(({ projectName, data }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(data);
  const dispatch = useDispatch();

  const handleRemoveCartItem = useCallback(
    (projectName: string, itemId: string) => {
      dispatch(removeItemFromCart({ projectName, itemId }));
    },
    [dispatch],
  );

  // https://www.shadcn-ui-blocks.com/blocks/shopping-cart
  const updateQuantity = useCallback((id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + change));
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  }, []);

  return (
    <>
      {cartItems.map((item) => (
        <GeneralCard key={item.id} className="bg-transparent border-none mb-4 w-full">
          <section className="flex gap-2 text-white justify-between">
            <div className=" flex gap-2">
              <img src={item.partImage} className="w-32 rounded-sm" alt={item.partName} />
              <div className="flex flex-col">
                <h3>{item.partName}</h3>
                <p>{item.partType}</p>
                <p>{item.price}</p>
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
                <Button className="cursor-pointer" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus />
                </Button>
                {item.quantity}
                <Button className="cursor-pointer" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus />
                </Button>
              </div>
            </section>
          </section>
        </GeneralCard>
      ))}
    </>
  );
});

CartItem.displayName = 'Cart';

export default CartItem;
