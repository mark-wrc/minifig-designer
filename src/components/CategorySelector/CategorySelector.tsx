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
          ' bg-sunny cursor-pointer hover:bg-minifig-brand-end transition-all duration-200 shadow-lg text-center',
          className,
          isCategoryTab && 'bg-transparent hover:bg-yellow-300 p-0 px-4 py-1',
          isSelected ? 'bg-yellow-300' : 'bg-none',
          isSelected && !isCategoryTab ? 'bg-minifig-brand-end' : '',
        )}
      >
        {!isCategoryTab ? (
          <div>
            <img src={item.image} alt={item.title} className="w-28" />
          </div>
        ) : (
          <div className="py-0">
            <span>{item.title}</span>
          </div>
        )}
      </section>
    );
  },
);
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
