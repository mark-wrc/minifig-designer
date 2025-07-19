import { MinifigCanvas, MinifigTabs } from '@/components';
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
        <header className="mb-10 text-black text-center pt-12 md:hidden">
          <h1 className=" text-4xl font-bold">CREATE YOUR OWN</h1>
          <h3 className="font-bold text-2xl">START BUILDING</h3>
        </header>

        <div className="p-4">
          <MinifigTabs />

          <MinifigCanvas
            wardrobeContainerStyle=" "
            minifigParts={minifigParts}
            wardrobeItems={minifigData}
            minifigProjects={minifigProjects}
            cartModalDisclosure={modalDisclosure}
            selectorComponent={
              <MinifigCategoryOptions activeMinifigProject={activeMinifigProject} isMobileMode />
            }
          />
        </div>

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
