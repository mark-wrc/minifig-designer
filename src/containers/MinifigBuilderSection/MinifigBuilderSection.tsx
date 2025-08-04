import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { MinifigDesktopMode } from './components';
import { useDisclosureParam, useMinifigParts } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { MinifigMobileMode } from './components/MinifigMobileMode';
import { useFetchMinifigProducts, useMinifigProjectById } from '@/api/hooks';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';

const MinifigBuilderSection = () => {
  const { activeCharacterId, selectedCategory } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const { screenSize } = useWindowResize();
  const modalDisclosure = useDisclosureParam();
  const isMobile = screenSize.width <= 767;

  // fetch hook for minifig products
  const { data: wardrobeItems = [] } = useFetchMinifigProducts({
    minifig_part_type: selectedCategory || undefined,
  });
  const { data: projects = [] } = useFetchMinifigProjects();
  const { data: activeProject } = useMinifigProjectById(activeCharacterId || '');

  const activeCharacter =
    activeProject?.project || projects.find((proj) => proj._id === activeCharacterId);

  const minifigParts = useMinifigParts(activeCharacter);

  return (
    <section>
      {isMobile ? (
        <MinifigMobileMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems}
          modalDisclosure={modalDisclosure}
          minifigProjects={projects}
        />
      ) : (
        <MinifigDesktopMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems}
          modalDisclosure={modalDisclosure}
          minifigProjects={projects}
        />
      )}
    </section>
  );
};

export default MinifigBuilderSection;
