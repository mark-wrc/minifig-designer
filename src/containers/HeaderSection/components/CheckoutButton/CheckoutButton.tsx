import { CTAButton } from '@/components';
import { memo } from 'react';
import { ICheckoutButtonProps } from './CheckoutButton.types';
import { useSendCartToCheckout } from '@/hooks';
import { formatCurrency } from '@/utils';

const CheckoutButton = memo<ICheckoutButtonProps>(({ className, totalPrice }) => {
  const { sendToCheckout, isAuthenticated } = useSendCartToCheckout();

  return (
    <CTAButton
      onClick={sendToCheckout}
      disabled={isAuthenticated}
      className={className}
      title={`Checkout ${formatCurrency(totalPrice)}`}
    />
  );
});

CheckoutButton.displayName = 'CheckoutButton';

export default CheckoutButton;
