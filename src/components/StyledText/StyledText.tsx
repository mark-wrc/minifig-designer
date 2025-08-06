import { memo } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IStyledTextProps } from './Styledtext.types';

const StyledText = memo<IStyledTextProps>(({ className, text, showCheckMark = true }) => (
  <div className={cn('flex gap-2 items-start mb-3', className)}>
    {showCheckMark && <CircleCheckBig width={22} className="text-green-500" />}

    <div className="flex-1">
      <p>{text}</p>
    </div>
  </div>
));

StyledText.displayName = 'StyledText';

export default StyledText;
