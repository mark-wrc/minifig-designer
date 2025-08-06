import { memo } from 'react';
import { IMinifigWardrobeItemProps } from './MinifigWardrobeItem.types';
import { MinifigPartData } from '@/types/Minifig';
import { CTAButton } from '../CTAButton';
import { formatCurrency } from '@/utils';

const MinifigWardrobeItem = memo<IMinifigWardrobeItemProps>(
  ({ onItemDetailsClick, minifigItem, onPartSelect }) => (
    <section className="flex flex-col h-full rounded-lg ">
      <div
        key={minifigItem?._id}
        className=" h-full cursor-pointer"
        onClick={() => onItemDetailsClick(minifigItem as MinifigPartData)}
      >
        {minifigItem.product_images.map((item) => (
          <img
            className="w-fit border-2 border-black rounded-sm "
            src={item.url}
            alt={minifigItem.product_name}
          />
        ))}

        {/* <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-sm">${item.price}</p> */}
      </div>

      <div className=" flex  flex-col justify-center py-2  -translate-y-4 ">
        <CTAButton
          variant="default"
          className="bg-yellow-300 text-md  hover:bg-yellow-400 w-fit self-center px-6 rounded-none text-black"
          onClick={() => onPartSelect(minifigItem)}
        >
          Add
        </CTAButton>

        <div className="text-center">
          <p className=" text-sm">{minifigItem.product_name}</p>
          <p>{formatCurrency(minifigItem.price)}</p>
        </div>
      </div>
    </section>
  ),
);

MinifigWardrobeItem.displayName = 'MinifigWardrobeItem';
export default MinifigWardrobeItem;
