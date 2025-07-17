import { forwardRef, memo } from 'react';
import { IMinifigWardrobeItems } from './MinifigWardrobe.types';
import { cn } from '@/lib/utils';
import { CTAButton } from '../CTAButton';

const MinifigWardrobe = memo(
  forwardRef<HTMLDivElement, IMinifigWardrobeItems>(
    (
      {
        wardrobeItems,
        selectedCategory,
        onCategoryClick,
        className,
        selectorComponent,
        onItemClick,
      },
      ref,
    ) => (
      <section className={cn(className)} ref={ref}>
        {selectorComponent && <>{selectorComponent}</>}
        {/* <h3 className="text-lg font-bold mb-4">
          {selectedCategory ? `${selectedCategory} Parts` : 'Select a Category'}
        </h3> */}

        {/* TODO: add Tabs when its mobile view */}
        {wardrobeItems?.length > 0 ? (
          <section className="grid grid-cols-2 gap-4 overflow-y-auto">
            {wardrobeItems.map((item) => (
              <section className="flex flex-col h-full">
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-3 h-full cursor-pointer"
                  onClick={() => onItemClick(item)}
                >
                  <img
                    className="w-full aspect-square rounded  border"
                    src={item.image}
                    alt={item.name}
                  />
                  {/* <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-sm">${item.price}</p> */}
                </div>
                <CTAButton
                  className="bg-yellow-500 font-semibold text-md w-fit self-center px-10 -translate-y-6 rounded-sm"
                  onClick={() => onCategoryClick(item)}
                >
                  Add
                </CTAButton>
              </section>
            ))}
          </section>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {selectedCategory ? (
              <p>No parts available for {selectedCategory}</p>
            ) : (
              <p>Select a category to view parts</p>
            )}
          </div>
        )}
      </section>
    ),
  ),
);

MinifigWardrobe.displayName = 'MinifigWardrobe';

export default MinifigWardrobe;
