import { memo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { IConfirmationDialogProps } from './ConfirmationDialog.types';
import { CTAButton } from '../CTAButton';

const ConfirmationDialog = memo<IConfirmationDialogProps>(({ icon: Icon, ...props }) => (
  <Dialog open={props.open} onOpenChange={() => props.onClose?.()}>
    <DialogContent title="test" className={cn(props.className)}>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
        {Icon && <Icon />}
        {props.emoji && (
          <div className={cn('select-none', props.emoji.emojiStyles)}>{props.emoji.text}</div>
        )}
        <DialogDescription className={cn('text-center py-20', props.descriptionContainerStyle)}>
          {props.description}
        </DialogDescription>
      </DialogHeader>

      <section className={cn('flex justify-between', props.actionContainerStyles)}>
        <CTAButton
          className="text-white cursor-pointer"
          variant="destructive"
          onClick={() => props.onConfirm?.()}
          title="Confirm"
        />

        {props.showClosebtn && (
          <CTAButton
            className=" cursor-pointer"
            variant="default"
            title="Cancel"
            onClick={() => props.onClose?.()}
          />
        )}
      </section>
    </DialogContent>
  </Dialog>
));

ConfirmationDialog.displayName = 'ConfirmationDialog';
export default ConfirmationDialog;
