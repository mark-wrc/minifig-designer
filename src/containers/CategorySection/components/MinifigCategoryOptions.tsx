import { memo, useCallback, useMemo } from 'react';
import { IMinifigCategoryOptions } from './MinifigCategoryOptions.types';
import { ICategoryItem, MinifigPartType } from '@/types';

import { CategorySelector } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { CategorySelectiorAnimation } from '@/animations/CategorySelectorAnimation';
import { RootState } from '@/store';
import { setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CATEGORY_CONFIG } from './config/CategoryConfig';

const MinifigCategoryOptions = memo<IMinifigCategoryOptions>(
  ({ activeMinifigProject, className, categoryContainerStyle, isMobileMode = false }) => {
    const dispatch = useDispatch();
    const { selectedCategory } = useSelector((state: RootState) => state.minifigBuilder);

    const handleCategorySelect = useCallback(
      (category: MinifigPartType) => {
        setSelectedCategory(category);
        dispatch(setSelectedCategory(category));
      },

      [dispatch],
    );

    const minifigCategories = useMemo<ICategoryItem[]>(
      () =>
        CATEGORY_CONFIG.map((config, idx) => ({
          id: idx + 1,
          title: config.type,
          image: (activeMinifigProject?.[config.key] as string) || config.defaultImage,
          type: config.type,
        })),
      [activeMinifigProject],
    );

    return (
      <section
        className={cn('flex gap-4 flex-wrap mx-auto justify-center rounded-3xl', className)}
      >
        {minifigCategories.map((category, idx) => (
          <motion.div
            variants={CategorySelectiorAnimation}
            initial="initial"
            animate="enter"
            custom={idx}
            key={idx}
            className={cn(' flex flex-col items-center justify-center', categoryContainerStyle)}
          >
            <CategorySelector
              key={category.id}
              item={category}
              className="text-sm md:text-base rounded-sm md:mt-0 w-full p-2"
              onClick={handleCategorySelect}
              isSelected={selectedCategory === category.type}
              isCategoryTab={isMobileMode}
            />

            {!isMobileMode && <p className="text-lg font-bold">{category.title}</p>}
          </motion.div>
        ))}
      </section>
    );
  },
);

MinifigCategoryOptions.displayName = 'MinifigCategoryOptions';

export default MinifigCategoryOptions;
