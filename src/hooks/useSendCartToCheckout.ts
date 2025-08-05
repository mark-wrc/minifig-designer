import { useAuthFromURL } from '@/hooks/useAuthFromURL';
import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import type { RootState } from '@/store';

const CHECKOUT_URL = 'https://www.worldofminifigs.com/checkout?mode=buy_now';

export function useSendCartToCheckout() {
  const { isAuthenticated } = useAuthFromURL();
  const cart = useSelector((state: RootState) => state.MinifigBuilderCart);

  const cartString = useMemo(() => {
    const items = Object.values(cart.projects).flatMap((project) =>
      project.items.map((item) => ({
        id: item.id,
        qty: item.quantity,
      })),
    );

    return encodeURIComponent(JSON.stringify(items));
  }, [cart.projects]);

  const sendToCheckout = useCallback(() => {
    if (!isAuthenticated) {
      alert('Please log in to proceed to checkout.');
      return;
    }

    const url = `${CHECKOUT_URL}&cart=${cartString}`;
    window.location.href = url;
  }, [isAuthenticated, cartString]);

  return { sendToCheckout, isAuthenticated };
}
