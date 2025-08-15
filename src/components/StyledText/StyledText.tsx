import { memo } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IStyledTextProps } from './StyledText.types';

const StyledText = memo<IStyledTextProps>(
  ({ className, text, showCheckMark = false, as: Tag = 'p', onClick }) => (
    <section className={cn('flex gap-2 items-start mb-3', className)} onClick={() => onClick?.()}>
      {showCheckMark && <CircleCheckBig width={22} className="text-green-500" />}

      <div className="flex-1">
        <Tag>{text}</Tag>
      </div>
    </section>
  ),
);

StyledText.displayName = 'StyledText';

export default StyledText;
