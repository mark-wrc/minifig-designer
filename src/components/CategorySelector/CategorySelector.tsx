import { memo } from 'react';
import { cn } from '@/lib/utils';
import { CategorySelectorProps } from './CategorySelector.types';

const CategorySelector = memo<CategorySelectorProps>(
  ({ className, onClick, item, isCategoryTab = false }) => {
    return (
      <div
        onClick={() => item.type && onClick(item.type)}
        className={cn(' bg-sunny cursor-pointer hover:bg-yellow-500 text-center', className)}
      >
        {!isCategoryTab ? (
          <div>
            <img src={item.image} alt={item.title} className="w-28" />
          </div>
        ) : (
          <span>{item.title}</span>
        )}
      </div>
    );
  },
);
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
