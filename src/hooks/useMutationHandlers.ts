import { useCallback } from 'react';

interface MutationHandlersProps {
  setProjectName: (name: string) => void;
  setError: (error: string | undefined) => void;
  onClose?: () => void;
}

export const useMutationHandlers = ({
  setProjectName,
  setError,
  onClose,
}: MutationHandlersProps) => {
  const handleSuccess = useCallback(() => {
    setProjectName('');
    setError(undefined);
    onClose?.();
  }, [setProjectName, setError, onClose]);

  const handleError = useCallback(
    (message: string) => {
      setError(`${message}. Please try again.`);
    },
    [setError],
  );

  return { handleSuccess, handleError };
};
