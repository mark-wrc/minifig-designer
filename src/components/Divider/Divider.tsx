import { memo } from 'react';
import type { IDividerProps } from './Divider.types';
import { cn } from '@/utils/cn';

const Divider = memo<IDividerProps>(({ className }) => (
  <div className={cn('w-full h-[1px] bg-white', className)} />
));

Divider.displayName = 'Divider';

export default Divider;
