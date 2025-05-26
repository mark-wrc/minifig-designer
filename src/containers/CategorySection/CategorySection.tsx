import { CategorySelector } from '@/components';
import { ICategoryItem, IFigureCategories } from '@/types/FigureCategories';
import { useCallback, useMemo, useState } from 'react';
import { DefaultHairAndHead, DefaultLegs, DefaultTorso } from '@/assets/images';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { MinifigPartType } from '@/types';

const CategorySection = () => {
  const [selectedMinifigCategory, setSelectedMinifigCategory] = useState<MinifigPartType | null>(
    null,
  );
  const dispatch = useDispatch();

  const categories = useMemo<ICategoryItem[]>(
    () => [
      {
        id: '1',
        title: IFigureCategories.Head,
        image: DefaultHairAndHead,
        type: MinifigPartType.HEAD,
      },
      {
        id: '2',
        title: IFigureCategories.Bodies,
        image: DefaultLegs,
        type: MinifigPartType.TORSO,
      },
      {
        id: '3',
        title: IFigureCategories.Legs,
        image: DefaultTorso,
        type: MinifigPartType.LEGS,
      },
      {
        id: '4',
        title: IFigureCategories.Display,
        image: '/images/categories/display.png',
      },
      {
        id: '5',
        title: IFigureCategories.Extras,
        image: '/images/categories/extras.png',
      },
    ],
    [],
  );

  const handleCategorySelect = useCallback(
    (category: MinifigPartType) => {
      setSelectedMinifigCategory(category);
      dispatch(setSelectedCategory(category));
    },

    [dispatch],
  );
  return (
    <section className=" container mx-auto m-10">
      <header className="mb-5 text-center">
        <h1 className="text-4xl text-white font-bold">CREATE YOUR OWN</h1>
        <h3 className="font-bold text-white">START BUILDING</h3>
      </header>
      <div className="flex gap-4 flex-wrap mx-auto justify-center rounded-3xl ">
        {categories.map((category) => (
          <div className=" flex flex-col items-center justify-center">
            <CategorySelector
              key={category.id}
              item={category}
              className="rounded-sm  w-fit p-4  "
              onClick={handleCategorySelect}
              isSelected={
                selectedMinifigCategory === (category.title as unknown as MinifigPartType)
              }
            />
            <span className="font-bold  text-white">{category.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

CategorySection.displayName = 'CategorySection';

export default CategorySection;
