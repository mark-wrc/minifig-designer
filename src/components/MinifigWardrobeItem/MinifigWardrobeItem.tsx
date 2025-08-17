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
          className=" bg-yellow-300 md:text-lg font-bold hover:bg-yellow-400  py-3 px-8 text-black self-center border-b-8 border-b-yellow-600/50 hover:translate-y-1 active:translate-y-1 border-t-6 border-t-transparent hover:border-b-transparent active:border-b-transparent shadow-lg hover:shadow-md shadow-yellow-600/50 transition-all duration-100
          "
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
