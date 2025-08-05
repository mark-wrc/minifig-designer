import { memo } from 'react';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';
import { SelectedMinifigItems } from '@/types/Minifig';

interface MinifigPreviewProps {
  selectedItems?: SelectedMinifigItems;
  className?: string;
}

const MinifigPreview = memo<MinifigPreviewProps>(({ selectedItems, className = '' }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <img
        src={selectedItems?.head?.image || BaseMinifigParts[MinifigPartType.HEAD].image}
        alt="Head"
        className="w-12 h-12 rounded border"
        title={selectedItems?.head?.name || 'Default Head'}
      />
      <img
        src={selectedItems?.torso?.image || BaseMinifigParts[MinifigPartType.TORSO].image}
        alt="Torso"
        className="w-12 h-12 rounded border"
        title={selectedItems?.torso?.name || 'Default Torso'}
      />
      <img
        src={selectedItems?.leg?.image || BaseMinifigParts[MinifigPartType.LEGS].image}
        alt="Legs"
        className="w-12 h-12 rounded border"
        title={selectedItems?.leg?.name || 'Default Legs'}
      />
    </div>
  );
});

MinifigPreview.displayName = 'MinifigPreview';

export default MinifigPreview;
