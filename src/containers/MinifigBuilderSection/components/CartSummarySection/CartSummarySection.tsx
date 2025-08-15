import { memo } from 'react';
import { ICartSummarySectionProps } from './CartSummarySection.types';
import { formatCurrency } from '@/utils';
import { StyledText } from '@/components';

const CartSummarySection = memo<ICartSummarySectionProps>(
  ({ totalPrice, validProjects, totalItems }) => (
    <section className="border-t-2 border-gray-300 pt-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <StyledText as="h3" className="font-bold text-lg" text="Total" />
        <StyledText
          as="span"
          className="font-bold text-xl text-green-600"
          text={formatCurrency(totalPrice)}
        />
      </div>
      <div className="text-sm text-gray-600">
        <StyledText text={`${validProjects} Projects • ${totalItems} total items`} />
      </div>
    </section>
  ),
);

CartSummarySection.displayName = 'CartSummarySection';

export default CartSummarySection;
