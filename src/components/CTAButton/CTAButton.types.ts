import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { buttonVariants } from '../ui/button';

export interface ICTAButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ElementType;
  isLoading?: boolean;
}
