import { CTAButton } from '@/components';
import { memo } from 'react';
import { ICheckoutButtonProps } from './CheckoutButton.types';
import { useSendCartToCheckout } from '@/hooks';

const CheckoutButton = memo<ICheckoutButtonProps>(({ className, totalPrice }) => {
  const { sendToCheckout, isAuthenticated } = useSendCartToCheckout();

  return (
    <CTAButton
      onClick={sendToCheckout}
      disabled={isAuthenticated}
      className={className}
      title={`Checkout ${totalPrice}`}
    />
  );
});

CheckoutButton.displayName = 'CheckoutButton';

export default CheckoutButton;
