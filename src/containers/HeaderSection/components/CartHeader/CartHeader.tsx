import { Divider, StyledText } from '@/components';
import { X } from 'lucide-react';
import { memo } from 'react';
import { ICartHeaderProps } from './CartHeader.types';
import { formatCurrency } from '@/utils';

const CartHeader = memo<ICartHeaderProps>(({ items, onClose }) => (
  <section className="flex justify-between flex-col items-center mb-6">
    <div className="flex justify-between w-full">
      <div className="text-white">
        <StyledText className="text-2xl mb-0 font-bold" text={`Cart ${items.totalItems}`} />
        <StyledText className="text-lg" text={`Sub total: ${formatCurrency(items.totalPrice)}`} />
      </div>

      <div
        onClick={() => onClose?.()}
        className=" cursor-pointer hover:bg-red-600 h-fit p-1 rounded-sm"
      >
        <X color="white" size={32} className="p-1" />
      </div>
    </div>
    <Divider className="mt-2 border border-gray-600" />
  </section>
));

CartHeader.displayName = 'CartHeader';

export default CartHeader;
