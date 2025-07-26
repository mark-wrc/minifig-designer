import { memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { IGeneralPopoverProps } from './GeneralPopover.types';
import { cn } from '@/lib/utils';

const GeneralPopover = memo<IGeneralPopoverProps>(({ children, content, className, ...props }) => (
  <Popover {...props}>
    <PopoverTrigger>{children}</PopoverTrigger>

    <PopoverContent className={cn('bg-white mr-4', className)}>{content}</PopoverContent>
  </Popover>
));

GeneralPopover.displayName = 'GeneralPopover';
export default GeneralPopover;
