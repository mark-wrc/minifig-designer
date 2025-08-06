import { ConfirmationDialog, GeneralDialog, GeneralDialogTitle } from '@/components';
import { memo, useCallback } from 'react';
import type { IMinifigBuilderCardPopupModalProps } from './MinifigBuilderCardPopupmodal.types';
import { Button } from '@/components/ui/button';
import { MinifigEmptyStateDialog } from '../MinifigEmptyStateDialog';
import { useMinifigCart } from '../../hooks/useMinifigCart';
import { createCartSummary, formatCurrency } from '@/utils';
import { useAuth, useDisclosureParam } from '@/hooks';
import { MinifigCartItemDetails } from '../MinifigCartItemDetails';

const MinifigBuilderCardPopupModal = memo<IMinifigBuilderCardPopupModalProps>(
  ({ onclose, minifig }) => {
    const { addMinifigToCart } = useMinifigCart();
    const authDisclosure = useDisclosureParam();
    const { user } = useAuth();
    const cartSummary = createCartSummary(minifig);

    const handleAddToCart = useCallback(() => {
      if (!user) {
        authDisclosure.onDisclosureOpen();
        return;
      }
      addMinifigToCart({ minifig, onSuccess: onclose });
    }, [addMinifigToCart, authDisclosure, minifig, onclose, user]);

    const handleClose = () => onclose?.();

    const { validProjects, totalPrice } = cartSummary;
    const hasValidProjects = validProjects > 0;

    // for testing
    const handleRedirectToLogin = () => {
      window.location.href = 'https://www.worldofminifigs.com/login';
    };

    if (!minifig?.length) {
      return <MinifigEmptyStateDialog onClose={handleClose} />;
    }

    return (
      <>
        <GeneralDialog open={true} onOpenChange={handleClose}>
          <GeneralDialogTitle
            title="ADD TO CART"
            className="text-4xl font-black text-center mb-24"
          />
          <section className="flex flex-col max-h-[60vh]">
            {/*Cart Items details  */}
            <MinifigCartItemDetails minifig={minifig} />

            {/* Action Buttons */}
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
                Add to Cart ({formatCurrency(totalPrice)})
              </Button>
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
