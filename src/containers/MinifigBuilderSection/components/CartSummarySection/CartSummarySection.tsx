import { memo } from 'react';
import { ICartSummarySectionProps } from './CartSummarySection.types';
import { formatCurrency } from '@/utils';
import { StyledText } from '@/components';

const CartSummarySection = memo<ICartSummarySectionProps>(
  ({ totalPrice, validProjects, totalItems }) => (
    <section className="border-2 border-gray-300 pt-4 bg-minifig-brand-end p-4 rounded-lg mb-8">
      <div className="flex justify-between items-center mb-2">
        <StyledText as="h3" className="font-bold text-xl sm:text-2xl text-gray-300" text="Total" />
        <StyledText
          as="span"
          className="font-bold text-xl text-gray-300"
          text={formatCurrency(totalPrice)}
        />
      </div>
      <div className="text-lg font-semibold text-gray-300">
        <StyledText text={`${validProjects} Projects • ${totalItems} total items`} />
      </div>
    </section>
  ),
);

CartSummarySection.displayName = 'CartSummarySection';

export default CartSummarySection;
