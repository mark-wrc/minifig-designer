import { CTAButton } from '@/components';
import { memo } from 'react';
import { ICheckoutButtonProps } from './CheckoutButton.types';
import { useSendCartToCheckout } from '@/hooks';
import { ShoppingCart } from 'lucide-react';

const CheckoutButton = memo<ICheckoutButtonProps>(({ className }) => {
  const { sendToCheckout } = useSendCartToCheckout();

  return (
    <CTAButton
      size={null}
      onClick={sendToCheckout}
      icon={ShoppingCart}
      className={className}
      title="Proceed to Checkout"
    />
  );
});

CheckoutButton.displayName = 'CheckoutButton';

export default CheckoutButton;
