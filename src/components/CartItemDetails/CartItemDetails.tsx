import { memo } from 'react';
import { formatCurrency } from '@/utils';
import { StyledText } from '../StyledText';
import { ICartItemDetailsProps } from './CartItemDetails.types';

const CartItemDetails = memo<ICartItemDetailsProps>(({ item }) => (
  <section className="flex gap-4 flex-col md:flex-row">
    <div className="w-[50%] md:w-[30%] bg-white h-fit rounded-md p-2 aspect-square flex flex-col items-center justify-center">
      <img src={item.images} className="w-full aspect-square object-contain" alt={item.partName} />
    </div>

    <div className="flex flex-col flex-1">
      <StyledText className="font-bold text-lg mb-0.5" text={item.partName} />
      <StyledText className="mb-0.5 text-sm font-semibold text-gray-300" text={item.partType} />
      <StyledText className="mb-0.5 text-sm font-semibold text-gray-300" text={item.color} />
      <StyledText
        className="text-md font-semibold text-green-400"
        text={formatCurrency(item.price)}
      />
    </div>
  </section>
));

CartItemDetails.displayName = 'CartItemDetails';

export default CartItemDetails;
