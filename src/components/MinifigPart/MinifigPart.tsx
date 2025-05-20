import { memo } from 'react';
import { MinifigPartType } from '@/types/MinifigActions';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface MinifigPartProps {
  type: MinifigPartType;
  image?: string;
  className?: string;
  totalImages?: number;
}

// const partDimensions = {
//   [MinifigPartType.HATS_AND_HAIR]: 'w-12 h-12',
//   [MinifigPartType.HEAD]: 'w-12 h-12',
//   [MinifigPartType.TORSO]: 'w-12 h-12',
//   [MinifigPartType.LEGS]: 'w-12 h-12',
//   [MinifigPartType.ACCESSORIES]: 'w-12 h-12',
// };

const MinifigPart = memo<MinifigPartProps>(({ type, image, className, totalImages }) => (
  <div className="flex justify-center ">
    <div className={cn('flex gap-4 items-center w-full lg:w-1/2 ', className)}>
      {(totalImages ?? 0) > 0 && (
        <Button className="cursor-pointer">
          <Plus size={32} />
        </Button>
      )}

      <figure>
        {image && <img src={image} alt={type.toLowerCase()} className="object-contain" />}
      </figure>
    </div>
  </div>
));

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
