import { memo, useCallback, useEffect } from 'react';
import type { ICartContainerProps } from './CartContainer.types';
import { CartItem, Divider } from '@/components';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProjectFromCart, initializeCart } from '@/store/CartSlice/CartSlice';
import type { RootState } from '@/store';
import { Button } from '@/components/ui/button';

const CartContainer = memo<ICartContainerProps>(({ onclose }) => {
  const { projects, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.MinifigBuilderCart,
  );
  const dispatch = useDispatch();

  // Initialize cart from localStorage on mount
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const handleRemoveProject = useCallback(
    (projectName: string) => {
      dispatch(removeProjectFromCart(projectName));
    },
    [dispatch],
  );

  const projectEntries = Object.entries(projects);

  return (
    <>
      {/* Overlay */}
      <div
        className="bg-black/90 fixed w-full top-0 left-0 z-50 bottom-0 h-full"
        onClick={onclose}
      />

      {/* Cart Container */}
      <section className="w-full bg-minifig-brand-end sm:w-1/2 lg:w-1/3 fixed right-0 top-0 bottom-0 z-[99999] p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <h2 className="text-2xl font-black">Cart ({totalItems})</h2>
            <p className="text-lg">Total: ${totalPrice}</p>
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
              <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
              <p>Add some minifigs to your cart to get started!</p>
            </div>
          )}

          {projectEntries.map(([projectName, project]) => (
            <div key={projectName} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{projectName}</h3>
                  <p className="text-sm text-gray-300">${project.totalPrice}</p>
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
            </div>
          ))}
        </div>

        {projectEntries.length > 0 && (
          <div className="border-t border-gray-600 pt-4">
            <div className="text-white mb-2">
              <p className="text-sm">
                {projectEntries.length} project{projectEntries.length !== 1 ? 's' : ''} •{' '}
                {totalItems} total items
              </p>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 font-black uppercase">
              Checkout (${totalPrice})
            </Button>
          </div>
        )}
      </section>
    </>
  );
});

CartContainer.displayName = 'CartContainer';

export default CartContainer;
