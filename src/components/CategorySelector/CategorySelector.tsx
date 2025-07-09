import { memo } from 'react';
import { CategorySelectorProps } from './CategorySelector.types';
import { cn } from '@/lib/utils';

const CategorySelector = memo<CategorySelectorProps>(({ className, onClick, item }) => {
  return (
    <div
      onClick={() => item.type && onClick(item.type)}
      className={cn(' bg-sunny cursor-pointer hover:bg-yellow-500 text-center', className)}
    >
      <div>
        <img src={item.image} alt={item.title} className="w-28" />
      </div>
    </div>
  );
});
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
