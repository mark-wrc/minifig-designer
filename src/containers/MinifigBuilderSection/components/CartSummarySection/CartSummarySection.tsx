import { memo } from 'react';
import { ICartSummarySectionProps } from './CartSummarySection.types';
import { formatCurrency } from '@/utils';

const CartSummarySection = memo<ICartSummarySectionProps>(
  ({ totalPrice, validProjects, totalItems }) => (
    <div className="border-t-2 border-gray-300 pt-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Total</h3>
        <span className="font-bold text-xl text-green-600">{formatCurrency(totalPrice)}</span>
      </div>
      <div className="text-sm text-gray-600">
        <p>
          {validProjects} Projects • {totalItems} total items
        </p>
      </div>
    </div>
  ),
);

CartSummarySection.displayName = 'CartSummarySection';

export default CartSummarySection;
