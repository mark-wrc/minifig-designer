import { forwardRef, memo } from 'react';
import { IMinifigWardrobeItems } from './MinifigWardrobe.types';
import { cn } from '@/lib/utils';

const MinifigWardrobe = memo(
  forwardRef<HTMLDivElement, IMinifigWardrobeItems>(
    ({ wardrobeItems, selectedCategory, onCategoryClick, className, selectorComponent }, ref) => (
      <section className={cn(className)} ref={ref}>
        {selectorComponent && <>{selectorComponent}</>}
        <h3 className="text-lg font-bold mb-4">
          {selectedCategory ? `${selectedCategory} Parts` : 'Select a Category'}
        </h3>

        {/* TODO: add Tabs when its mobile view */}
        {wardrobeItems?.length > 0 ? (
          <section className="grid grid-cols-2 gap-4">
            {wardrobeItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onCategoryClick(item)}
              >
                <img
                  className="w-full object-cover rounded mb-2"
                  src={item.image}
                  alt={item.name}
                />
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                <p className="text-green-600 font-bold text-sm">${item.price}</p>
              </div>
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
