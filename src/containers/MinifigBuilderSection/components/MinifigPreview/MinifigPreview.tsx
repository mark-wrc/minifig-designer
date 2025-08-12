import { memo } from 'react';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';
import { SelectedMinifigItems } from '@/types/Minifig';

interface MinifigPreviewProps {
  selectedItems?: SelectedMinifigItems;
  className?: string;
}

const partOrder: MinifigPartType[] = [
  MinifigPartType.HAIR,
  MinifigPartType.HEAD,
  MinifigPartType.TORSO,
  MinifigPartType.LEGS,
];

const MinifigPreview = memo<MinifigPreviewProps>(({ selectedItems, className = '' }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {partOrder.map((part) => {
        const selectedPart = selectedItems?.[part.toLowerCase() as keyof SelectedMinifigItems];
        const src = selectedPart?.product_images?.[0]?.url || BaseMinifigParts[part].image;
        const title = selectedPart?.product_name || `Default ${part}`;
        return (
          <img
            key={part}
            src={src}
            alt={part}
            title={title}
            className="w-12 h-12 rounded border object-contain"
          />
        );
      })}
    </div>
  );
});

MinifigPreview.displayName = 'MinifigPreview';

export default MinifigPreview;
