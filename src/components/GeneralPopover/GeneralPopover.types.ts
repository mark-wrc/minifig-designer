import { PopoverProps } from '@radix-ui/react-popover';
import React from 'react';

export interface IGeneralPopoverProps extends PopoverProps {
  className?: string;
  content?: React.ReactElement;
}
