import { CTAButton, MinifigCanvas, MinifigTabs } from '@/components';
import { memo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigMobileModeProps } from './MinifigModalMode.types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MinifigCategoryOptions from '@/containers/CategorySection/components/MinifigCategoryOptions';

const MinifigMobileMode = memo<IMinifigMobileModeProps>(
  ({ minifigParts, minifigData, modalDisclosure, minifigProjects }) => {
    const { activeCharacterId, characters = [] } = useSelector(
      (state: RootState) => state.minifigBuilder,
    );

    const activeMinifigProject = characters.find((char) => char.id === activeCharacterId);
    return (
      <section className="">
        <header className="mb-10 text-center pt-12">
          <h1 className="text-6xl text-white font-bold">CREATE YOUR OWN</h1>
          <h3 className="font-bold text-white text-2xl">START BUILDING</h3>
        </header>
        <MinifigTabs />

        <MinifigCanvas
          wardrobeContainerStyle=" "
          minifigParts={minifigParts}
          wardrobeItems={minifigData}
          selectorComponent={
            <MinifigCategoryOptions
              activeMinifigProject={activeMinifigProject}
              className=" flex flex-nowrap bg-frosted-white py-2"
              isMobileMode
            />
          }
        />

        <CTAButton
          className="flex justify-self-end cursor-pointer mt-4 bg-yellow-500 text-lg p-6"
          onClick={() => modalDisclosure.onDisclosureOpen()}
          disabled={!minifigProjects.length}
        >
          {/* Add to cart ({minifigProjects.length} project{minifigProjects.length !== 1 ? 's' : ''}) */}
          Add to cart
        </CTAButton>

        {modalDisclosure.open && minifigProjects && (
          <MinifigBuilderCardPopupModal
            onclose={modalDisclosure.onDisclosureClose()}
            minifig={minifigProjects}
          />
        )}
      </section>
    );
  },
);

MinifigMobileMode.displayName = 'MinifigMobileMode';

export default MinifigMobileMode;
