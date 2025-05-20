import { MinifiCanvas } from '@/components';
import { MinifigTabs } from '@/components/MinifigTabs';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

const MinifigBuilderSection = () => {
  return (
    <section className=" bg-soft-gray container mx-auto rounded-2xl">
      <MinifigTabs/>
      <MinifiCanvas bodyParts={BaseMinifigParts} />
    </section>
  );
};

export default MinifigBuilderSection;
