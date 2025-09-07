import { StyledText } from '@/components';
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
      {/* Header section for project list */}

      <div className="flex justify-between mb-2 sticky top-0 bg-[#f6f6f6] border-b-3 border-gray-950 z-10 pb-2">
        <StyledText className="font-black" text="Project Name" as="h3" />
        <StyledText className="font-black " text="Price" as="h3" />
      </div>

      {/* Project cards list section */}

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

      {/* Cart summary section */}

      <CartSummarySection
        validProjects={validProjects}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />

      {/* Warning message if no valid minifig projects */}

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
