import { MinifiCanvas } from '@/components';
import { MinifigTabs } from '@/components/MinifigTabs';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { RootState } from '@/store';
import { MinifigPartType } from '@/types';
import { useSelector } from 'react-redux';

const MinifigBuilderSection = () => {
  const { characters, activeCharacterId } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );
  const activeCharacter = characters.find((char) => char.id === activeCharacterId);

  // Map active character parts to the bodyParts format

  // will modify this later with an optimized version of the coge logic
  const bodyParts = {
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
  };

  return (
    <section className=" bg-soft-gray container mx-auto rounded-2xl">
      <MinifigTabs />
      <MinifiCanvas bodyParts={bodyParts} />
    </section>
  );
};

export default MinifigBuilderSection;
