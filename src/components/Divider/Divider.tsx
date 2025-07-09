import { memo } from 'react';
import type { IDividerProps } from './Divider.types';
import { cn } from '@/lib/utils';

const Divider = memo<IDividerProps>(({ className }) => (
  <div className={cn('w-full h-[1px] bg-white', className)} />
));

Divider.displayName = 'Divider';

export default Divider;
