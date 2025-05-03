import { memo } from 'react';
import { CategorySelectorProps } from './CategorySelector.types';
import { cn } from '@/lib/utils';

const Category = memo<CategorySelectorProps>(({ children, className }) => (
  <div className={cn(' bg-gray-300', className)}>{children}</div>
));
Category.displayName = 'Category';

export default Category;
