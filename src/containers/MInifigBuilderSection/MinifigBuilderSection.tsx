/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import type { RootState } from '@/store';
import { MinifigPartType } from '@/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import minifigPartsData from '@/api/dummyData.json';
import { MinifigDesktopMode } from './components';
import { useDisclosureParam } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { MinifigMobileMode } from './components/MinifigMobileMode';

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

  const isMobile = screenSize.width <= 600;

  const wardrobeItems = useMemo(() => {
    if (!selectedCategory) return [];
    return (minifigPartsData[selectedCategory] || []).map((item: any) => ({
      ...item,
      type: item.type as MinifigPartType,
    }));
  }, [selectedCategory]);

  // TODO: needs to refactor this logic

  const minifigParts = useMemo(
    () => ({
      [MinifigPartType.HEAD]: {
        image: activeCharacter?.head || BaseMinifigParts[MinifigPartType.HEAD].image,
        type: MinifigPartType.HEAD,
      },
      [MinifigPartType.TORSO]: {
        image: activeCharacter?.torso || BaseMinifigParts[MinifigPartType.TORSO].image,
        type: MinifigPartType.TORSO,
      },
      [MinifigPartType.LEGS]: {
        image: activeCharacter?.legs || BaseMinifigParts[MinifigPartType.LEGS].image,
        type: MinifigPartType.LEGS,
      },
    }),
    [activeCharacter],
  );

  return (
    <section>
      {isMobile && (
        <MinifigMobileMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems}
          modalDisclosure={modalDisclosure}
          minifigProjects={characters}
        />
      )}

      {!isMobile && (
        <MinifigDesktopMode
          minifigParts={minifigParts}
          minifigData={wardrobeItems}
          modalDisclosure={modalDisclosure}
          minifigProjects={characters}
        />
      )}
    </section>
  );
};

export default MinifigBuilderSection;
