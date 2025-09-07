import { memo } from 'react';
import { IColorBadgeprops } from './ColorBadge.types';
import { getColorHex } from '@/utils';

const ColorBadge = memo<IColorBadgeprops>(({ colorName }) => {
  const hexColor = getColorHex(colorName);
  return (
    <div
      className="rounded-full w-5 h-5 mb-4 border-2 border-yellow-300"
      style={{ backgroundColor: hexColor }}
    />
  );
});
ColorBadge.displayName = 'ColorBadge';

export default ColorBadge;
