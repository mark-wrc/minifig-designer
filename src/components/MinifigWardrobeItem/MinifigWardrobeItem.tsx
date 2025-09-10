import { memo } from 'react';
import { IMinifigWardrobeItemProps } from './MinifigWardrobeItem.types';
import { MinifigPartData } from '@/types/Minifig';
import { CTAButton } from '../CTAButton';
import { formatCurrency, getBuilderImage } from '@/utils';
import { StyledText } from '../StyledText';
import { WOFLogo } from '@/assets/images';
import { cn } from '@/lib/utils';

const MinifigWardrobeItem = memo<IMinifigWardrobeItemProps>(
  ({ onItemDetailsClick, minifigItem, onPartSelect }) => {
    const builderImage = getBuilderImage(minifigItem.product_images);

    const isItemClickable = !!builderImage;

    return (
      <section className="flex flex-col h-fit rounded-lg">
        <div
          key={minifigItem?._id}
          className={cn(
            'cursor-pointer w-[80%] mx-auto object-contain outline-3 outline-gray-600 group hover:outline-yellow-600 active:outline-yellow-600 duration-75 transition-all active:outline-4 hover:outline-4 bg-white rounded-sm',
            !builderImage && 'outline-none cursor-auto',
          )}
          onClick={
            isItemClickable ? () => onItemDetailsClick(minifigItem as MinifigPartData) : undefined
          }
        >
          {builderImage ? (
            <img
              key={builderImage._id}
              src={builderImage.url}
              className="w-fit mx-auto rounded-sm aspect-square object-contain hover:scale-110 transition-all duration-75"
              alt={minifigItem.product_name}
            />
          ) : (
            <div className="flex flex-col bg-minifig-brand-end justify-center items-center p-4 rounded-md">
              <img
                className="opacity-30 grayscale rounded-md aspect-square object-contain"
                src={WOFLogo}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center py-2 h-fit md:-translate-y-6">
          <CTAButton
            size={null}
            variant="default"
            disabled={!builderImage}
            className="bg-yellow-300 md:text-lg font-bold hover:bg-yellow-400  py-3 px-8 text-black self-center border-b-8 border-b-yellow-600/50 hover:translate-y-1 active:translate-y-1 border-t-6 border-t-transparent hover:border-b-transparent active:border-b-transparent shadow-lg hover:shadow-md shadow-yellow-600/50 transition-all duration-100 "
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
    );
  },
);

MinifigWardrobeItem.displayName = 'MinifigWardrobeItem';
export default MinifigWardrobeItem;
