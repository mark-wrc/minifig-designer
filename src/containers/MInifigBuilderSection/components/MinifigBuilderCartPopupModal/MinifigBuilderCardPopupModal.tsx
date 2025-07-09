import { Divider, GeneralDialog, GeneralDialogTitle } from '@/components';
import { memo } from 'react';
import type { IMinifigBuilderCardPopupModalProps } from './MinifigBuilderCardPopupmodal.types';
import { Button } from '@/components/ui/button';
import { MinifigEmptyStateDialog } from '../MinifigEmptyStateDialog';
import { MinifigProjectCard } from '../MinifigProjectCard';
import { CartSummarySection } from '../CartSummarySection';
import { useMinifigCart } from '../../hooks/useMinifigCart';
import { createCartSummary, createProjectSummary } from '@/utils';

const MinifigBuilderCardPopupModal = memo<IMinifigBuilderCardPopupModalProps>(
  ({ onclose, minifig }) => {
    const { addMinifigToCart } = useMinifigCart();
    const cartSummary = createCartSummary(minifig);

    const handleAddToCart = () => {
      addMinifigToCart(minifig, onclose);
    };

    const handleClose = () => onclose?.();

    if (!minifig?.length) {
      return <MinifigEmptyStateDialog onClose={handleClose} />;
    }

    const { validProjects, totalItems, totalPrice, projectSummaries } = cartSummary;
    const hasValidProjects = validProjects > 0;

    return (
      <GeneralDialog open={true} onOpenChange={handleClose}>
        <GeneralDialogTitle
          title="ADD TO CART"
          className="text-4xl font-black text-center mb-24"
        />
        <section className="flex flex-col max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between mb-2 sticky top-0 bg-white z-10 pb-2">
            <h3 className="font-bold">Project Name</h3>
            <h3 className="font-bold">Price</h3>
          </div>
          <Divider className="bg-black mb-4" />

          <div className="space-y-4 mb-6">
            {minifig.map((character, index) => {
              if (!character) return null;

              const summary =
                projectSummaries.find((s) => s.project.id === character.id) ||
                createProjectSummary(character);

              return (
                <MinifigProjectCard key={character.id || index} summary={summary} index={index} />
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
              <h1 className="font-semibold">
                Please customize at least one project before adding to cart
              </h1>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              onClick={handleClose}
              className="bg-red-500 font-black uppercase cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-500 font-black uppercase cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!hasValidProjects}
              onClick={handleAddToCart}
            >
              Add to Cart (${totalPrice})
            </Button>
          </div>
        </section>
      </GeneralDialog>
    );
  },
);

MinifigBuilderCardPopupModal.displayName = 'MinifigBuilderCardPopupModal';

export default MinifigBuilderCardPopupModal;
