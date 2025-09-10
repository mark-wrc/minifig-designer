import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MinifigCategoryOptions from './components/MinifigCategoryOptions';
import { useMemo } from 'react';
import { StyledText } from '@/components';

const CategorySection = () => {
  const { activeCharacterId, characters = [] } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const activeMinifigProject = useMemo(() => {
    return characters.find((char) => char._id === activeCharacterId);
  }, [characters, activeCharacterId]);

  return (
    <section className=" hidden md:block container mx-auto my-4 lg:py-12">
      <header className="mb-12 text-center text-black">
        <StyledText
          as="h1"
          className="text-6xl font-black mb-3 text-gray-900"
          text="BUILD YOUR OWN MINIFIG"
        />
        <StyledText as="h3" className="font-bold text-2xl text-gray-900" text="START BUILDING" />
      </header>
      <MinifigCategoryOptions activeMinifigProject={activeMinifigProject} />
    </section>
  );
};

CategorySection.displayName = 'CategorySection';

export default CategorySection;
