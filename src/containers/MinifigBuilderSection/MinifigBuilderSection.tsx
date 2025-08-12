import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MinifigDesktopMode } from './components';
import { useDisclosureParam, useMinifigParts } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { MinifigMobileMode } from './components/MinifigMobileMode';
import { useFetchMinifigProducts } from '@/api/hooks';
import { useState } from 'react';
import { GeneralPagination } from '@/components/GeneralPagination';

const MinifigBuilderSection = () => {
  const { characters, activeCharacterId, selectedCategory } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const { screenSize } = useWindowResize();
  const modalDisclosure = useDisclosureParam();
  const isMobile = screenSize.width <= 767;

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading: isMinifigProductLoading } = useFetchMinifigProducts({
    minifig_part_type: selectedCategory || undefined,
    page: currentPage,
  });

  const wardrobeItems = data?.products || [];
  const totalPages = data?.totalPages ?? 1;

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

      <GeneralPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default MinifigBuilderSection;
