import { useEffect } from 'react';

export const useDisableScroll = (isDisabled: boolean): void => {
  useEffect(() => {
    if (isDisabled) {
      const scrollY = window.scrollY;

      // Apply styles to disable scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isDisabled]);
};
