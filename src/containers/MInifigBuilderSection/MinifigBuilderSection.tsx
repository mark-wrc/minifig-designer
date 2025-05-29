import { MinifiCanvas } from '@/components';
import { MinifigTabs } from '@/components/MinifigTabs';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { RootState } from '@/store';
import { MinifigPartType } from '@/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const MinifigBuilderSection = () => {
  const {
    characters = [],
    activeCharacterId,
    wardrobeItems = [],
  } = useSelector(
    (state: RootState) => state.minifigBuilder || { characters: [], activeCharacterId: null },
  );

  const activeCharacter = characters.find((char) => char.id === activeCharacterId);

  const bodyParts = useMemo(
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
      [MinifigPartType.ACCESSORIES]: {
        image: activeCharacter?.accessories || BaseMinifigParts[MinifigPartType.ACCESSORIES].image,
        type: MinifigPartType.ACCESSORIES,
      },
    }),
    [activeCharacter],
  );

  return (
    <section className=" bg-soft-gray container mx-auto rounded-2xl">
      <MinifigTabs />
      <MinifiCanvas bodyParts={bodyParts} wardrobeItems={wardrobeItems} />
    </section>
  );
};

export default MinifigBuilderSection;
