import { memo } from 'react';
import { IMinifigWardrobeItemProps } from './MinifigWardrobeItem.types';
import { MinifigPartData } from '@/types/Minifig';
import { CTAButton } from '../CTAButton';

const MinifigWardrobeItem = memo<IMinifigWardrobeItemProps>(
  ({ onItemDetailsClick, minifigItem, onPartSelect }) => (
    <section className="flex flex-col h-full bg-minifig-brand-end shadow-sm rounded-lg ">
      <div
        key={minifigItem?._id}
        className=" h-full cursor-pointer"
        onClick={() => onItemDetailsClick(minifigItem as MinifigPartData)}
      >
        {minifigItem.product_images.map((item) => (
          <img className="w-[200px] rounded-t-lg " src={item.url} alt={minifigItem.product_name} />
        ))}

        {/* <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-sm">${item.price}</p> */}
      </div>

      <div className="bg-[#28385880] flex justify-center py-2 rounded-b-lg ">
        <CTAButton
          variant="default"
          className="bg-yellow-300 text-md w-fit self-center px-6 hover:text-white rounded-sm text-black"
          onClick={() => onPartSelect(minifigItem)}
        >
          Add
        </CTAButton>
      </div>
    </section>
  ),
);

MinifigWardrobeItem.displayName = 'MinifigWardrobeItem';
export default MinifigWardrobeItem;
