import { memo } from 'react';
import { formatCurrency } from '@/utils';
import { StyledText } from '../StyledText';
import { ICartItemDetailsProps } from './CartItemDetails.types';

const CartItemDetails = memo<ICartItemDetailsProps>(({ item }) => (
  <section className="flex gap-2 flex-col md:flex-row">
    <div className="w-[50%] md:w-[30%]">
      <img
        src={item.images || '/placeholder.svg'}
        className="w-full rounded-md"
        alt={item.partName}
      />
    </div>

    <div className="flex flex-col flex-1">
      <StyledText className="font-bold text-lg mb-2" text={item.partName} />
      <StyledText className="mb-1" text={item.partType} />
      <StyledText className="mb-1" text={item.color} />
      <StyledText text={formatCurrency(item.price)} />
    </div>
  </section>
));

CartItemDetails.displayName = 'CartItemDetails';

export default CartItemDetails;
