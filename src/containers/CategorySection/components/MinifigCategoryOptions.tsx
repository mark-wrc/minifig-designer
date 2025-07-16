import { memo, useCallback, useMemo, useState } from 'react';
import { IMinifigCategoryOptions } from './MinifigCategoryOptions.types';
import { ICategoryItem, IFigureCategories, MinifigPartType } from '@/types';
import { DefaultHairAndHead, DefaultLegs, DefaultTorso } from '@/assets/images';
import { CategorySelector } from '@/components';
import { setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch } from 'react-redux';
import { cn } from '@/lib/utils';

const MinifigCategoryOptions = memo<IMinifigCategoryOptions>(
  ({ activeMinifigProject, className, categoryContainerStyle, isMobileMode = false }) => {
    const dispatch = useDispatch();
    const [selectedMinifigCategory, setSelectedMinifigCategory] = useState<MinifigPartType | null>(
      null,
    );

    const handleCategorySelect = useCallback(
      (category: MinifigPartType) => {
        setSelectedMinifigCategory(category);
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
        className={cn('flex gap-4 flex-wrap mx-auto justify-center rounded-3xl ', className)}
      >
        {minifigCategories.map((category) => (
          <div
            className={cn(' flex flex-col items-center justify-center', categoryContainerStyle)}
          >
            <CategorySelector
              key={category.id}
              item={category}
              className="rounded-sm w-fit p-4"
              onClick={handleCategorySelect}
              isSelected={
                selectedMinifigCategory === (category.title as unknown as MinifigPartType)
              }
              isCategoryTab={isMobileMode}
            />
            <span className="font-bold  text-white">{category.title}</span>
          </div>
        ))}
      </section>
    );
  },
);

MinifigCategoryOptions.displayName = 'MinifigCategoryOptions';

export default MinifigCategoryOptions;
