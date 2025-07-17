import { memo } from 'react';
import { IMinifigWardrobeItemsDetailsProps } from './MinifigWardrobeItemDetails.types';
import { CTAButton } from '../CTAButton';

const MinifigWardrobeItemDetails = memo<IMinifigWardrobeItemsDetailsProps>(
  ({ wardrobeItems, onClick }) => {
    return (
      <section>
        <CTAButton onClick={onClick}>Back</CTAButton>
        <div className="bg-white rounded-lg p-3 h-full cursor-pointer">
          <img
            className="w-full aspect-square rounded  border"
            src={wardrobeItems.image}
            alt={wardrobeItems.name}
          />
          <p className="font-medium text-sm">{wardrobeItems.name}</p>
          <p className="text-xs text-gray-600 mb-2">{wardrobeItems.description}</p>
          <p className="text-green-600 font-bold text-sm">${wardrobeItems.price}</p>
        </div>
      </section>
    );
  },
);

MinifigWardrobeItemDetails.displayName = 'MinifigWardrobeItemDetails';

export default MinifigWardrobeItemDetails;
