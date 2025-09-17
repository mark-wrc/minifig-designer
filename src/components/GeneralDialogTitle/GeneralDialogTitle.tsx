import { memo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/utils/cn';
import { IGeneralDialogTitleProps } from './GeneralDialogTitle.types';

const GeneralDialogTitle = memo<IGeneralDialogTitleProps>(({ title, className }) => (
  <Dialog.Title className={cn('text-xl font-semibold mb-2 leading-tight', className)}>
    {title}
  </Dialog.Title>
));

GeneralDialogTitle.displayName = 'GeneralDialogTitle';

export default GeneralDialogTitle;
