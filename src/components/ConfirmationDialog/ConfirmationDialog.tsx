import { memo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { IConfirmationDialogProps } from './Snackbar.types';
import { CTAButton } from '../CTAButton';

const ConfirmationDialog = memo<IConfirmationDialogProps>(
  ({
    open,
    onClose,
    onConfirm,
    title,
    emoji,
    description,
    className,
    showClosebtn,
    descriptionContainerStyle,
    actionContainerStyles,
    icon: Icon,
  }) => {
    return (
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent title="test" className={cn(className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {Icon && <Icon />}
            {emoji && <div className={emoji.emojiStyles}>{emoji.text}</div>}
            <DialogDescription className={cn('text-center py-20', descriptionContainerStyle)}>
              {description}
            </DialogDescription>
          </DialogHeader>

          <section className={cn('flex justify-between', actionContainerStyles)}>
            <CTAButton
              className="text-white cursor-pointer"
              variant="destructive"
              onClick={() => onConfirm?.()}
              title="Confirm"
            />

            {showClosebtn && (
              <CTAButton
                className=" cursor-pointer"
                variant="default"
                title="Cancel"
                onClick={() => onClose?.()}
              />
            )}
          </section>
        </DialogContent>
      </Dialog>
    );
  },
);

ConfirmationDialog.displayName = 'ConfirmationDialog';
export default ConfirmationDialog;
