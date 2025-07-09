import { CategorySection, MinifigBuilderSection } from '@/containers';

const Home = () => {
  return (
    <section className="min-h-full w-full flex flex-col p-8">
      {/*TODO: hide Category section when its mobile view*/}
      <CategorySection />
      <MinifigBuilderSection />
    </section>
  );
};

export default Home;
