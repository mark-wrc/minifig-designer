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

      <div className=" flex  flex-col justify-center py-2  -translate-y-6 ">
        <CTAButton
          size={null}
          variant="default"
          className="bg-yellow-300 text-md  hover:bg-yellow-400 w-fit self-center py-3 px-8 rounded-sm text-black"
          onClick={() => onPartSelect(minifigItem)}
        >
          Add
        </CTAButton>

        <div className="text-center mt-2">
          <StyledText className="text-sm font-medium" text={minifigItem.product_name} />
          <StyledText className="font-medium" text={formatCurrency(minifigItem.price)} />
        </div>
      </div>
    </section>
  ),
);

MinifigWardrobeItem.displayName = 'MinifigWardrobeItem';
export default MinifigWardrobeItem;
