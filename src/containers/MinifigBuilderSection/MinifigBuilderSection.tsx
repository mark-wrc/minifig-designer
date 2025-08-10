import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MinifigDesktopMode } from './components';
import { useDisclosureParam, useMinifigParts } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { MinifigMobileMode } from './components/MinifigMobileMode';
import { useFetchMinifigProducts } from '@/api/hooks';

const MinifigBuilderSection = () => {
  const { characters, activeCharacterId, selectedCategory } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const { screenSize } = useWindowResize();
  const modalDisclosure = useDisclosureParam();
  const isMobile = screenSize.width <= 767;

  // fetch hook for minifig products
  const { data: wardrobeItems = [], isLoading: isMinifigProductLoading } = useFetchMinifigProducts(
    {
      minifig_part_type: selectedCategory || undefined,
    },
  );
  const activeCharacter = characters.find((c) => c._id === activeCharacterId);
  const minifigParts = useMinifigParts(activeCharacter);

  return (
    <section>
      {isMobile ? (
        <MinifigMobileMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems}
          modalDisclosure={modalDisclosure}
          minifigProjects={characters}
          isLoading={isMinifigProductLoading}
        />
      ) : (
        <MinifigDesktopMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems}
          modalDisclosure={modalDisclosure}
          minifigProjects={characters}
          isLoading={isMinifigProductLoading}
        />
      )}
    </section>
  );
};

export default MinifigBuilderSection;
