import { memo, useCallback, useMemo } from 'react';
import { IMinifigCategoryOptions } from './MinifigCategoryOptions.types';
import { ICategoryItem, MinifigPartType } from '@/types';

import { CategorySelector, StyledText } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { CategorySelectiorAnimation } from '@/animations/CategorySelectorAnimation';
import { RootState } from '@/store';
import { setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CATEGORY_CONFIG } from './config/CategoryConfig';
import { getBuilderImage } from '@/utils';

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
        CATEGORY_CONFIG.map((config, idx) => {
          let imageSrc = config.defaultImage;

          if (activeMinifigProject?.selectedItems) {
            if (config.type === MinifigPartType.ACCESSORY) {
              //Accessories (array of MinifigSlot)
              const accessories = activeMinifigProject.selectedItems.accessory;
              if (accessories && accessories.length > 0 && accessories[0]) {
                imageSrc =
                  getBuilderImage(accessories[0].product_images)?.url || config.defaultImage;
              }
            } else {
              const part =
                activeMinifigProject.selectedItems[
                  config.key.toLowerCase() as keyof typeof activeMinifigProject.selectedItems
                ];
              if (part && !Array.isArray(part)) {
                imageSrc = getBuilderImage(part.product_images)?.url || config.defaultImage;
              }
            }
          }

          return {
            id: idx + 1,
            title: config.type,
            image: imageSrc,
            type: config.type,
          };
        }),
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

            {!isMobileMode && (
              <StyledText className="text-md mt-2 font-bold mb-0" text={category.title} />
            )}
          </motion.div>
        ))}
      </section>
    );
  },
);

MinifigCategoryOptions.displayName = 'MinifigCategoryOptions';

export default MinifigCategoryOptions;
