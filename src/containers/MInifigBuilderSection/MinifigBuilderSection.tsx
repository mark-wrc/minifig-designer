import { MinifiCanvas } from '@/components';

const MinifigBuilderSection = () => {
  return (
    <section className=" bg-soft-gray container mx-auto w-sm h-full sm:w-md md:w-lg lg:w-xl xl:w-2xl p-4 rounded-sm">
      <MinifiCanvas />
    </section>
  );
};

export default MinifigBuilderSection;
