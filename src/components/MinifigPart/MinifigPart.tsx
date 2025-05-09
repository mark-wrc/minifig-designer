import { memo } from 'react';
import { MinifigPartType } from '@/types/MinifigActions';
import { cn } from '@/lib/utils';

interface MinifigPartProps {
  type: MinifigPartType;
  image?: string;
  className?: string;
}

// const partDimensions = {
//   [MinifigPartType.HATS_AND_HAIR]: 'w-12 h-12',
//   [MinifigPartType.HEAD]: 'w-12 h-12',
//   [MinifigPartType.TORSO]: 'w-12 h-12',
//   [MinifigPartType.LEGS]: 'w-12 h-12',
//   [MinifigPartType.ACCESSORIES]: 'w-12 h-12',
// };

const MinifigPart = memo<MinifigPartProps>(({ type, image, className }) => (
  <div className={cn('relative', className)}>
    {image && (
      <img src={image} alt={type.toLowerCase()} className="w-full h-full object-contain" />
    )}
  </div>
));

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
