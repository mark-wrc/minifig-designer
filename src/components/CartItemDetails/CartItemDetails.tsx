import { memo } from 'react';
import { ICartItemDetalsProps } from './CartItemDetails.types';
import { formatCurrency } from '@/utils';

const CartItemDetails = memo<ICartItemDetalsProps>(({ item }) => (
  <section className="flex gap-2">
    <img
      src={item.partImage || '/placeholder.svg'}
      className="w-32 rounded-sm"
      alt={item.partName}
    />
    <div className="flex flex-col">
      <h3>{item.partName}</h3>
      <p>{item.partType}</p>
      <p>{item.color}</p>
      <p>{formatCurrency(item.price)}</p>
    </div>
  </section>
));

CartItemDetails.displayName = 'CartItemDetails';

export default CartItemDetails;
