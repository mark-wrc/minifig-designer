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
      <p className="font-bold text-md mb-0.5 max-w-[250px] capitalize">{item.partName} </p>
      <StyledText className="mb-0.5 text-sm font-semibold text-gray-300" text={item.color} />
      <StyledText
        className="mb-4 text-sm font-semibold text-gray-300"
        text="Brick Guide and Instructions"
      />
      <StyledText
        className="text-md font-semibold text-green-400"
        text={formatCurrency(item.price)}
      />

      {item.quantity >= item.stock && (
        <StyledText
          className="text-sm font-medium text-yellow-400 mt-1"
          text="Maximum stock reached"
        />
      )}
    </div>
  </section>
));

CartItemDetails.displayName = 'CartItemDetails';

export default CartItemDetails;
