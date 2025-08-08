import { CTAButton } from '@/components';
import { memo } from 'react';
import { ICheckoutButtonProps } from './CheckoutButton.types';
import { useSendCartToCheckout } from '@/hooks';
import { formatCurrency } from '@/utils';

const CheckoutButton = memo<ICheckoutButtonProps>(({ className, totalPrice }) => {
  const { sendToCheckout } = useSendCartToCheckout();

  return (
    <CTAButton
      size={null}
      onClick={sendToCheckout}
      className={className}
      title={`Checkout ${formatCurrency(totalPrice)}`}
    />
  );
});

CheckoutButton.displayName = 'CheckoutButton';

export default CheckoutButton;
