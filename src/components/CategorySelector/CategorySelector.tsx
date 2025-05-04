import { memo } from 'react';
import { CategorySelectorProps } from './CategorySelector.types';
import { cn } from '@/lib/utils';

const CategorySelector = memo<CategorySelectorProps>(({ className, onClick, item }) => (
  <div onClick={() => onClick(item.title)} className={cn(' bg-sunny', className)}>
    <div>
      <img src={item.image} className="w-full" />
    </div>
    <span className="text-black">{item.title}</span>
  </div>
));
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
