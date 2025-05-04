import { CategorySelector } from '@/components';
import { ICategoryItem, IFigureCategories } from '@/types/FigureCategories';
import { useCallback, useMemo, useState } from 'react';

const CategorySection = () => {
  const [selectedCategory, setSelectedCategorry] = useState<IFigureCategories | null>(null);

  const categories = useMemo<ICategoryItem[]>(
    () => [
      {
        id: '1',
        title: IFigureCategories.HatsAndHair,
        image: '/images/categories/hats.png',
      },
      {
        id: '2',
        title: IFigureCategories.Head,
        image: '/images/categories/head.png',
      },
      {
        id: '3',
        title: IFigureCategories.Bodies,
        image: '/images/categories/bodies.png',
      },
      {
        id: '4',
        title: IFigureCategories.Legs,
        image: '/images/categories/legs.png',
      },
      {
        id: '5',
        title: IFigureCategories.Display,
        image: '/images/categories/display.png',
      },
      {
        id: '6',
        title: IFigureCategories.Extras,
        image: '/images/categories/extras.png',
      },
    ],
    [],
  );

  const handleCategorySelect = useCallback((category: IFigureCategories) => {
    setSelectedCategorry(category);

    // api logic/redux dispatch logic
  }, []);

  return (
    <section className=" container mx-auto m-10">
      <div className="flex gap-4 flex-wrap mx-auto justify-center rounded-3xl ">
        {categories.map((category) => (
          <CategorySelector
            key={category.id}
            item={category}
            className="rounded-sm  w-fit p-4  "
            onClick={handleCategorySelect}
            isSelected={selectedCategory === category.title}
          />
        ))}
      </div>
    </section>
  );
};

CategorySection.displayName = 'CategorySection';

export default CategorySection;
