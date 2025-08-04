import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MinifigCategoryOptions from './components/MinifigCategoryOptions';
import { useMemo } from 'react';

const CategorySection = () => {
  const { activeCharacterId, characters = [] } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const activeMinifigProject = useMemo(() => {
    return characters.find((char) => char._id === activeCharacterId);
  }, [characters, activeCharacterId]);

  return (
    <section className=" hidden md:block container mx-auto m-10 lg:py-12">
      <header className="mb-12 text-center text-black">
        <h1 className="text-6xl font-bold">CREATE YOUR OWN MINIFIG</h1>
        <h3 className="font-bold  text-2xl">START BUILDING</h3>
      </header>
      <MinifigCategoryOptions activeMinifigProject={activeMinifigProject} />
    </section>
  );
};

CategorySection.displayName = 'CategorySection';

export default CategorySection;
