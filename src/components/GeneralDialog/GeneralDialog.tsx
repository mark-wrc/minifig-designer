import { memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/utils/cn';
import { IGeneralDialogProps } from './GeneralDialog.types';

const GeneralDialog = memo<IGeneralDialogProps>(
  ({
    open,
    onOpenChange,
    className,
    children,
    disableClickOutside = false,
    disableEscapeKey = true,
  }) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content
          className={cn(
            'fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'bg-white dark:bg-zinc-900 rounded-md shadow-xl p-6 w-full',
            className,
          )}
          onInteractOutside={(e) => {
            if (disableClickOutside) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (disableEscapeKey) {
              e.preventDefault();
            }
          }}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);

GeneralDialog.displayName = 'GeneralDialog';

export default GeneralDialog;
