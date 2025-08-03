import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MinifigDesktopMode } from './components';
import { useDisclosureParam, useMinifigParts } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { MinifigMobileMode } from './components/MinifigMobileMode';
import { useFetchMinifigProducts } from '@/api/hooks';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';

const MinifigBuilderSection = () => {
  const {
    characters = [],
    activeCharacterId,
    selectedCategory,
  } = useSelector(
    (state: RootState) =>
      state.minifigBuilder || { characters: [], activeCharacterId: null, selectedCategory: null },
  );

  const { screenSize } = useWindowResize();

  const activeCharacter = characters.find((char) => char.id === activeCharacterId);
  const modalDisclosure = useDisclosureParam();

  const isMobile = screenSize.width <= 767;

  // fetch hook for minifig products
  const { data: wardrobeItems } = useFetchMinifigProducts({
    minifig_part_type: selectedCategory || undefined,
  });

  // needs to refactor later
  const { data: project } = useFetchMinifigProjects();

  // const wardrobeItems = useMemo(() => {
  //   if (!selectedCategory) return [];
  //   return (minifigPartsData[selectedCategory] || []).map((item: any) => ({
  //     ...item,
  //     type: item.type as MinifigPartType,
  //   }));
  // }, [selectedCategory]);

  // TODO: needs to refactor this logic
  const minifigParts = useMinifigParts(activeCharacter);

  return (
    <section>
      {isMobile ? (
        <MinifigMobileMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems ?? []}
          modalDisclosure={modalDisclosure}
          minifigProjects={project ?? []}
        />
      ) : (
        <MinifigDesktopMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems ?? []}
          modalDisclosure={modalDisclosure}
          minifigProjects={project ?? []}
        />
      )}
    </section>
  );
};

export default MinifigBuilderSection;
