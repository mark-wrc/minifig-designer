import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CategorySelectorProps } from './CategorySelector.types';

const CategorySelector = memo<CategorySelectorProps>(
  ({ className, onClick, item, isCategoryTab = false, isSelected }) => {
    const handleCategoryClick = useCallback(() => {
      if (item.type) {
        onClick(item.type);
      }
    }, [item.type, onClick]);

    return (
      <section
        onClick={handleCategoryClick}
        className={cn(
          ' bg-sunny cursor-pointer  hover:bg-gray-950 transition-all duration-200 shadow-black/20 text-center shadow-lg ',
          className,
          isCategoryTab && 'bg-transparent hover:bg-yellow-300  p-0 px-4 py-1',
          isSelected ? 'bg-yellow-300' : 'bg-none',
          isSelected && !isCategoryTab ? 'bg-gray-950 border-2 border-white/45' : '',
        )}
      >
        {!isCategoryTab ? (
          <div>
            <img src={item.image} alt={item.title} className="w-28" />
          </div>
        ) : (
          <span className="py-0">{item.title}</span>
        )}
      </section>
    );
  },
);
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
