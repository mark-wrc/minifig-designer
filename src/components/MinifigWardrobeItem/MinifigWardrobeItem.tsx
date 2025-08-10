import { memo } from 'react';
import { IMinifigWardrobeItemProps } from './MinifigWardrobeItem.types';
import { MinifigPartData } from '@/types/Minifig';
import { CTAButton } from '../CTAButton';
import { formatCurrency } from '@/utils';
import { StyledText } from '../StyledText';

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
            key={item._id}
            className="w-fit border-2 border-black rounded-sm "
            src={item.url}
            alt={minifigItem.product_name}
          />
        ))}
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
          <StyledText className=" text-sm" text={minifigItem.product_name} />
          <StyledText text={formatCurrency(minifigItem.price)} />
        </div>
      </div>
    </section>
  ),
);

MinifigWardrobeItem.displayName = 'MinifigWardrobeItem';
export default MinifigWardrobeItem;
