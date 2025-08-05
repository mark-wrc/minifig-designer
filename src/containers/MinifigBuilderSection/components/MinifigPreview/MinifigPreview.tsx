import { memo, useCallback } from 'react';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigPreviewProps } from './MinifigPreview.types';
import { cn } from '@/lib/utils';

const MinifigPreview = memo<IMinifigPreviewProps>(({ selectedItems, className }) => {
  const partTypes = [MinifigPartType.HEAD, MinifigPartType.TORSO, MinifigPartType.LEGS];

  const getPartImage = useCallback(
    (partType: MinifigPartType) => {
      switch (partType) {
        case MinifigPartType.HEAD:
          return selectedItems?.head?.image || BaseMinifigParts[MinifigPartType.HEAD].image;
        case MinifigPartType.TORSO:
          return selectedItems?.torso?.image || BaseMinifigParts[MinifigPartType.TORSO].image;
        case MinifigPartType.LEGS:
          return selectedItems?.legs?.image || BaseMinifigParts[MinifigPartType.LEGS].image;
        default:
          return null;
      }
    },
    [selectedItems?.head?.image, selectedItems?.torso?.image, selectedItems?.legs?.image],
  );

  const getPartTitle = useCallback(
    (partType: MinifigPartType) => {
      switch (partType) {
        case MinifigPartType.HEAD:
          return selectedItems?.head?.product_name || 'Default Head';
        case MinifigPartType.TORSO:
          return selectedItems?.torso?.product_name || 'Default Torso';
        case MinifigPartType.LEGS:
          return selectedItems?.legs?.product_name || 'Default Legs';
        default:
          return `Default ${partType}`;
      }
    },
    [
      selectedItems?.head?.product_name,
      selectedItems?.torso?.product_name,
      selectedItems?.legs?.product_name,
    ],
  );

  return (
    <div className={cn('flex gap-2', className)}>
      {partTypes.map((partType) => (
        <img
          key={partType}
          src={getPartImage(partType) ?? undefined}
          alt={partType}
          className="w-12 h-12 rounded border"
          title={getPartTitle(partType)}
        />
      ))}
    </div>
  );
});

MinifigPreview.displayName = 'MinifigPreview';

export default MinifigPreview;
