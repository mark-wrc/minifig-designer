import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MinifigDesktopMode } from './components';
import { useDisclosureParam, useMinifigParts } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { MinifigMobileMode } from './components/MinifigMobileMode';
import { useFetchMinifigProducts } from '@/api/hooks';
import { useEffect, useState } from 'react';

const MinifigBuilderSection = () => {
  const { characters, activeCharacterId, selectedCategory } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const { screenSize } = useWindowResize();
  const modalDisclosure = useDisclosureParam();
  const isMobile = screenSize.width <= 767;

  const [currentPage, setCurrentPage] = useState(1);

  // resets to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const { data, isLoading: isMinifigProductLoading } = useFetchMinifigProducts({
    minifig_part_type: selectedCategory || undefined,
    page: currentPage,
  });

  const wardrobeItems = data?.products || [];
  console.log('WardrobeItems:', wardrobeItems);
  const totalPages = data?.totalPages ?? 1;

  const activeCharacter = characters.find((c) => c._id === activeCharacterId);
  const minifigParts = useMinifigParts(activeCharacter);

  const MinifigComponent = isMobile ? MinifigMobileMode : MinifigDesktopMode;

  return (
    <section>
      <MinifigComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        minifigParts={minifigParts}
        minifigData={wardrobeItems}
        modalDisclosure={modalDisclosure}
        minifigProjects={characters}
        isLoading={isMinifigProductLoading}
      />
    </section>
  );
};

export default MinifigBuilderSection;
