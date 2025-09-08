import { StyledText } from '@/components';
import { X } from 'lucide-react';
import { memo } from 'react';
import { ICartHeaderProps } from './CartHeader.types';
import { formatCurrency } from '@/utils';

const CartHeader = memo<ICartHeaderProps>(({ items, onClose }) => (
  <section className="flex justify-between flex-col items-center py-1 p-2">
    <div className="flex justify-between w-full">
      <StyledText
        className="text-md text-white font-semibold flex"
        text={
          <span className="flex gap-1">
            Sub total:
            <StyledText
              as="span"
              className="text-green-400 mb-0"
              text={formatCurrency(items.totalPrice)}
            />
          </span>
        }
      />

      <div
        onClick={() => onClose?.()}
        className=" cursor-pointer hover:bg-red-600 h-fit rounded-sm"
      >
        <X color="white" size={32} className="p-1" />
      </div>
    </div>
  </section>
));

CartHeader.displayName = 'CartHeader';

export default CartHeader;
