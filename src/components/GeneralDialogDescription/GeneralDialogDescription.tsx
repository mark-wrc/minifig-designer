import { memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { IGeneralDialogDescriptionProps } from './GeneralDescription.types';

// TODO -  pending default styles

const GeneralDialogDescription = memo<IGeneralDialogDescriptionProps>(
  ({ description, className }) => (
    <Dialog.Description className={cn('text-sm text-gray-500 leading-normal mb-4', className)}>
      {description}
    </Dialog.Description>
  ),
);

GeneralDialogDescription.displayName = 'GeneralDialogDescription';

export default GeneralDialogDescription;
