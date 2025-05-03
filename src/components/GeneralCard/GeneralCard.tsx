import { memo } from 'react';
import { Card, CardContent } from '../ui/card';
import { GeneralCardProps } from './GeneralCard.types';
import { cn } from '@/lib/utils';

const GeneralCard = memo<GeneralCardProps>(({ className, children, onclick }) => (
  <Card onClick={onclick} className={cn('w-fit bg-sunny rounded-sm', className)}>
    <CardContent>{children}</CardContent>
  </Card>
));

GeneralCard.displayName = 'GeneralCard';

export default GeneralCard;
