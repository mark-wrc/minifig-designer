import { GeneralDialog, GeneralDialogTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { memo } from 'react';
import { IMinifigEmptyStateDialogProps } from './MinifigEmptyStateDialog.types';

export const MinifigEmptyStateDialog = memo<IMinifigEmptyStateDialogProps>(({ onClose }) => (
  <GeneralDialog open={true} onOpenChange={onClose}>
    <GeneralDialogTitle title="ADD TO CART" className="text-4xl font-black text-center mb-24" />
    <section className="flex flex-col">
      <p className="text-center text-gray-500 mb-4">No characters available</p>
      <Button onClick={onClose} className="bg-red-500 font-black uppercase cursor-pointer">
        Close
      </Button>
    </section>
  </GeneralDialog>
));

MinifigEmptyStateDialog.displayName = 'MinifigEmptyStateDialog';

export default MinifigEmptyStateDialog;
