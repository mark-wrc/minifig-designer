import { memo, useCallback, useMemo } from 'react';
import { IMinifigCategoryOptions } from './MinifigCategoryOptions.types';
import { ICategoryItem, IFigureCategories, MinifigPartType } from '@/types';
import { DefaultHairAndHead, DefaultLegs, DefaultTorso } from '@/assets/images';
import { CategorySelector } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { CategorySelectiorAnimation } from '@/animations/CategorySelectorAnimation';
import { RootState } from '@/store';
import { setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';

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
      () => [
        {
          id: 1,
          title: IFigureCategories.Head,
          image: activeMinifigProject?.head || DefaultHairAndHead,
          type: MinifigPartType.HEAD,
        },
        {
          id: 2,
          title: IFigureCategories.Torso,
          image: activeMinifigProject?.torso || DefaultTorso,
          type: MinifigPartType.TORSO,
        },
        {
          id: 3,
          title: IFigureCategories.Legs,
          image: activeMinifigProject?.legs || DefaultLegs,
          type: MinifigPartType.LEGS,
        },
      ],
      [activeMinifigProject?.head, activeMinifigProject?.legs, activeMinifigProject?.torso],
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
              className="rounded-sm w-full p-2"
              onClick={handleCategorySelect}
              isSelected={selectedCategory === category.type}
              isCategoryTab={isMobileMode}
            />
          </motion.div>
        ))}
      </section>
    );
  },
);

MinifigCategoryOptions.displayName = 'MinifigCategoryOptions';

export default MinifigCategoryOptions;
