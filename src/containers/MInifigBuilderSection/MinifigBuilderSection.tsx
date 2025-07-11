/* eslint-disable @typescript-eslint/no-explicit-any */

import { MinifigCanvas, MinifigTabs } from '@/components';
import { Button } from '@/components/ui/button';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import type { RootState } from '@/store';
import { MinifigPartType } from '@/types';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MinifigBuilderCardPopupModal } from './components/MinifigBuilderCartPopupModal';
import minifigPartsData from '@/api/dummyData.json';

const MinifigBuilderSection = () => {
  const {
    characters = [],
    activeCharacterId,
    selectedCategory,
  } = useSelector(
    (state: RootState) =>
      state.minifigBuilder || { characters: [], activeCharacterId: null, selectedCategory: null },
  );

  const activeCharacter = characters.find((char) => char.id === activeCharacterId);
  const [openModal, setOpenModal] = useState(false);

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
    <section className="bg-soft-gray container mx-auto rounded-2xl p-4">
      <MinifigTabs />

      <MinifigCanvas minifigParts={minifigParts} wardrobeItems={wardrobeItems} />

      <Button
        className="flex justify-self-end cursor-pointer"
        onClick={() => setOpenModal(true)}
        disabled={!characters.length}
      >
        Add to cart ({characters.length} project{characters.length !== 1 ? 's' : ''})
      </Button>

      {openModal && characters && (
        <MinifigBuilderCardPopupModal onclose={() => setOpenModal(false)} minifig={characters} />
      )}
    </section>
  );
};

export default MinifigBuilderSection;
