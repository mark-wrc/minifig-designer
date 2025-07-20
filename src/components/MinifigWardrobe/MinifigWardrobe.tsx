import { forwardRef, memo } from 'react';
import { IMinifigWardrobeProps } from './MinifigWardrobe.types';
import { cn } from '@/lib/utils';
import { CTAButton } from '../CTAButton';

const MinifigWardrobe = memo(
  forwardRef<HTMLDivElement, IMinifigWardrobeProps>(
    (
      {
        wardrobeItems,
        selectedCategory,
        onCategoryClick,
        className,
        selectorComponent,
        onItemDetailsClick,
      },
      ref,
    ) => {
      if (wardrobeItems.length === 0 || !selectedCategory) {
        return (
          <div className="border-2 w-full p-4 flex h-[300px]  justify-center flex-col items-center">
            <p className="text-xl text-center">
              Start by exploring the different options e.g. Heads and Torso!
            </p>
          </div>
        );
      }
      return (
        <section
          className={cn(
            className,
            'w-full h-full border-2 border-gray-950 rounded-md md:border-0 md:rounded-none',
          )}
          ref={ref}
        >
          {selectorComponent && <div className="md:hidden">{selectorComponent}</div>}
          {/* <h3 className="text-lg font-bold mb-4">
          {selectedCategory ? `${selectedCategory} Parts` : 'Select a Category'}
        </h3> */}

          {/* TODO: add Tabs when its mobile view */}
          {wardrobeItems?.length > 0 && (
            <section className="grid grid-cols-3 lg:grid-cols-4 gap-4 max-h-[300px] md:max-h-[480px] overflow-y-auto p-2 mt-10 md:mt-0 minifig-scrollbar">
              {wardrobeItems.map((item) => (
                <section className="flex flex-col h-full">
                  <div
                    key={item?.id}
                    className="bg-gray-100 rounded-sm p-1 h-full cursor-pointer"
                    onClick={() => onItemDetailsClick(item)}
                  >
                    <img className="w-[100px] rounded-sm" src={item.image} alt={item.name} />
                    {/* <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-sm">${item.price}</p> */}
                  </div>

                  <CTAButton
                    variant="ghost"
                    className="bg-yellow-400 text-md w-fit self-center px-6 -translate-y-2 rounded-sm text-black border border-gray-950"
                    onClick={() => onCategoryClick(item)}
                  >
                    Add
                  </CTAButton>
                </section>
              ))}
            </section>
          )}
        </section>
      );
    },
  ),
);

MinifigWardrobe.displayName = 'MinifigWardrobe';

export default MinifigWardrobe;
