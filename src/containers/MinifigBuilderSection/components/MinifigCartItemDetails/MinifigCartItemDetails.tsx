import { Divider, StyledText } from '@/components';
import { memo } from 'react';
import { CartSummarySection } from '../CartSummarySection';
import { IMinifigCartItemDetailsProps } from './MinifigCartItemDetails.types';
import { createCartSummary, createProjectSummary } from '@/utils';
import { MinifigProjectCard } from '../MinifigProjectCard';

const MinifigCartItemDetails = memo<IMinifigCartItemDetailsProps>(({ minifig }) => {
  const cartSummary = createCartSummary(minifig);
  const { validProjects, totalItems, totalPrice, projectSummaries } = cartSummary;
  const hasValidProjects = validProjects > 0;

  return (
    <section className="overflow-y-auto minifig-scrollbar px-1">
      <div className="flex justify-between mb-2 sticky -top-2 bg-white z-10 pb-2">
        <StyledText className="font-bold" text="Project Name" as="h3" />
        <StyledText className="font-bold " text="Price" as="h3" />
      </div>
      <Divider className="bg-gray-950 h-[2px] mb-4" />
      <div className="space-y-4 mb-6">
        {minifig.map((character, index) => {
          if (!character) return null;
          const summary =
            projectSummaries.find((s) => s.project._id === character._id) ||
            createProjectSummary(character);
          return (
            <MinifigProjectCard key={character._id || index} summary={summary} index={index} />
          );
        })}
      </div>
      <CartSummarySection
        validProjects={validProjects}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      {!hasValidProjects && (
        <div className="text-red-500 text-center mt-4 mb-4 p-3 bg-red-50 rounded">
          <StyledText
            as="h1"
            className="text-base"
            text=" Please customize at least one project before adding to cart"
          />
        </div>
      )}
    </section>
  );
});

MinifigCartItemDetails.displayName = 'MinifigCartItemDetails';

export default MinifigCartItemDetails;
