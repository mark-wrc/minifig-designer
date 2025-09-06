import { ConfirmationDialog, CTAButton, GeneralDialog, GeneralDialogTitle } from '@/components';
import { memo, useCallback } from 'react';
import type { IMinifigBuilderCardPopupModalProps } from './MinifigBuilderCardPopupmodal.types';
import { MinifigEmptyStateDialog } from '../MinifigEmptyStateDialog';
import { useMinifigCart } from '../../hooks/useMinifigCart';
import { createCartSummary, formatCurrency } from '@/utils';
import { useDisclosureParam } from '@/hooks';
import { MinifigCartItemDetails } from '../MinifigCartItemDetails';

const MinifigBuilderCardPopupModal = memo<IMinifigBuilderCardPopupModalProps>(
  ({ onclose, minifig }) => {
    console.log('Minifig data received in modal:', minifig);
    const { addMinifigToCart } = useMinifigCart();
    const authDisclosure = useDisclosureParam();

    const cartSummary = createCartSummary(minifig);

    const handleAddToCart = useCallback(() => {
      const projectsToAdd = minifig;

      addMinifigToCart({ minifig: projectsToAdd, onSuccess: onclose });
    }, [addMinifigToCart, minifig, onclose]);

    const handleClose = () => onclose?.();

    const { validProjects, totalPrice } = cartSummary;
    const hasValidProjects = validProjects > 0;

    const handleRedirectToLogin = useCallback(() => {
      window.location.href = 'https://www.worldofminifigs.com/login';
    }, []);

    if (!minifig?.length) {
      return <MinifigEmptyStateDialog onClose={handleClose} />;
    }

    return (
      <>
        <GeneralDialog
          open={true}
          onOpenChange={handleClose}
          className="sm:w-[80%] md:w-[70%] lg:w-[35%]"
        >
          <GeneralDialogTitle
            title="ADD TO CART"
            className="text-4xl font-black text-center mb-24"
          />
          <section className="flex flex-col max-h-[60vh]">
            {/*Cart Items details  */}

            <MinifigCartItemDetails minifig={minifig} />

            {/* Action Buttons */}
            <div className="flex  items-center justify-between mt-6">
              <CTAButton
                onClick={handleClose}
                className="bg-red-500 font-black py-6 sm:text-lg md:text-sm uppercase cursor-pointer"
              >
                Cancel
              </CTAButton>

              <CTAButton
                className="bg-yellow-500 font-black sm:text-lg py-6 md:text-sm uppercase cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!hasValidProjects}
                onClick={handleAddToCart}
              >
                Add to Cart ({formatCurrency(totalPrice)})
              </CTAButton>
            </div>
          </section>
        </GeneralDialog>

        <ConfirmationDialog
          open={authDisclosure.open}
          onConfirm={authDisclosure.onDisclosureClose(handleRedirectToLogin)}
          onClose={authDisclosure.onDisclosureClose()}
          title="Authentication Required"
          description="Please log in to add items to your cart"
          emoji={{ text: '🔐', emojiStyles: 'text-[80px] text-center' }}
          showClosebtn
          className="md:w-fit"
          descriptionContainerStyle="max-w-[300px] mx-auto p-0 text-md text-black"
          actionContainerStyles="self-center justify-between"
        />
      </>
    );
  },
);

MinifigBuilderCardPopupModal.displayName = 'MinifigBuilderCardPopupModal';

export default MinifigBuilderCardPopupModal;
