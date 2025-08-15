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
        className=" cursor-pointer border-l-10 rounded-md hover:border-l-0 active:border-l-0 active:border-t-transparent px-1 shadow-lg hover:shadow-md shadow-red-500/50 transition-all duration-75 hover:-translate-x-0.5 active:-translate-x-0.5 h-fit border-b-6 border-t-6 bg-red-600 border-l-red-700 border-b-transparent border-t-red-500"
      >
        <X color="white" size={32} className="p-1" />
      </div>
    </div>
    <Divider className="mt-2 border border-gray-600" />
  </section>
));

CartHeader.displayName = 'CartHeader';

export default CartHeader;
