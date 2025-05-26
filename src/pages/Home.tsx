import { CategorySection, MinifigBuilderSection } from '@/containers';

const Home = () => {
  return (
    <div className="min-h-screen w-full p-8">
      <CategorySection />
      <MinifigBuilderSection />
    </div>
  );
};

export default Home;
