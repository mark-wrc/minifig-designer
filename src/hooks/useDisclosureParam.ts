import { useCallback, useState } from 'react';

export interface UseDisclosureReturn {
  open: boolean;
  onDisclosureOpen: () => void;
  onDisclosureClose: <T = void>(callback?: () => T) => () => T | void;
}
export const useDisclosureParam = () => {
  const [open, setOpen] = useState(false);

  const onDisclosureOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onDisclosureClose = useCallback(<T = void>(callback?: () => T) => {
    return () => {
      setOpen(false);
      if (callback) {
        return callback();
      }
    };
  }, []);

  return {
    onDisclosureOpen,
    onDisclosureClose,
    open,
  };
};
