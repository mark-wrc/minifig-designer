import { memo } from 'react';
import { IMinifigWardrobeItemProps } from './MinifigWardrobeItem.types';
import { MinifigPartData } from '@/types/Minifig';
import { CTAButton } from '../CTAButton';
import { formatCurrency } from '@/utils';
import { StyledText } from '../StyledText';

const MinifigWardrobeItem = memo<IMinifigWardrobeItemProps>(
  ({ onItemDetailsClick, minifigItem, onPartSelect }) => (
    <section className="flex flex-col h-fit rounded-lg ">
      <div
        key={minifigItem?._id}
        className=" h-full cursor-pointer"
        onClick={() => onItemDetailsClick(minifigItem as MinifigPartData)}
      >
        {minifigItem.product_images.map((item) => (
          <img
            key={item._id}
            className="w-fit mx-auto outline-2 outline-gray-600 bg-white rounded-sm "
            src={item.url}
            alt={minifigItem.product_name}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center py-2 h-fit md:-translate-y-6">
        <CTAButton
          size={null}
          variant="default"
          className=" bg-yellow-300 md:text-lg font-bold hover:bg-yellow-400 hover:border-l-0  active:border-t-transparent active:border-b-transparent hover:border-t-transparent active:border-l-0 active:bg-yellow-400  transition-all duration-75 hover:shadow-md self-center py-3 px-8 rounded-md text-black shadow-lg shadow-yellow-500/50 border-l-8 border-t-6 border-b-6 border-b-transparent border-t-yellow-400  border-l-yellow-600"
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
