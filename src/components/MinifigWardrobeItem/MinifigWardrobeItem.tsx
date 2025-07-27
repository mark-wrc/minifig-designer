import { memo } from 'react';
import { IMinifigWardrobeItemProps } from './MinifigWardrobeItem.types';
import { MinifigPartData } from '@/types/Minifig';
import { CTAButton } from '../CTAButton';

const MinifigWardrobeItem = memo<IMinifigWardrobeItemProps>(
  ({ onItemDetailsClick, minifigItem, onCategoryClick }) => (
    <section className="flex flex-col h-full">
      <div
        key={minifigItem?.id}
        className="bg-gray-100 rounded-sm p-1 h-full cursor-pointer"
        onClick={() => onItemDetailsClick(minifigItem as MinifigPartData)}
      >
        <img className="w-[100px] rounded-sm" src={minifigItem.image} alt={minifigItem.name} />
        {/* <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-sm">${item.price}</p> */}
      </div>

      <CTAButton
        variant="ghost"
        className="bg-yellow-400 text-md w-fit self-center px-6 -translate-y-2 rounded-sm text-black border border-gray-950"
        onClick={() => onCategoryClick(minifigItem as MinifigPartData)}
      >
        Add
      </CTAButton>
    </section>
  ),
);

MinifigWardrobeItem.displayName = 'MinifigWardrobeItem';
export default MinifigWardrobeItem;
