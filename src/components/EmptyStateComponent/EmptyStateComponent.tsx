import { memo } from 'react';
import { IEmptyStateComponentProps } from './EmptyStateComponent.types';
import { cn } from '@/utils/cn';

const EmptyStateComponent = memo<IEmptyStateComponentProps>(({ className, message }) => (
  <section className={cn('', className)}>
    <p>{message}</p>
  </section>
));

EmptyStateComponent.displayName = 'EmptyStateComponent';
export default EmptyStateComponent;
