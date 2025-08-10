import { Divider } from '@/components';
import { X } from 'lucide-react';
import { memo } from 'react';
import { ICartHeaderProps } from './CartHeader.types';
import { formatCurrency } from '@/utils';

const CartHeader = memo<ICartHeaderProps>(({ items, onClose }) => (
  <section className="flex justify-between flex-col items-center mb-6">
    <div className="flex justify-between w-full">
      <div className="text-white">
        <h2 className="text-2xl">Cart ({items.totalItems})</h2>
        <p className="text-lg">Sub total: {formatCurrency(items.totalPrice)}</p>
      </div>
      <X
        color="white"
        size={32}
        className="cursor-pointer hover:bg-red-600 rounded-sm p-1"
        onClick={() => onClose?.()}
      />
    </div>
    <Divider className="mt-2 border border-gray-600" />
  </section>
));

CartHeader.displayName = 'CartHeader';

export default CartHeader;
