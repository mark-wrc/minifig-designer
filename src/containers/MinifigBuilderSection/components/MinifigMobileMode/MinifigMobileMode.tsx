import { CTAButton, MinifigCanvas, MinifigTabs, StyledText } from '@/components';
import { memo, useMemo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigMobileModeProps } from './MinifigModalMode.types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MinifigCategoryOptions from '@/containers/CategorySection/components/MinifigCategoryOptions';

const MinifigMobileMode = memo<IMinifigMobileModeProps>(
  ({ minifigParts, minifigData, modalDisclosure, minifigProjects, isLoading }) => {
    const { activeCharacterId, characters = [] } = useSelector(
      (state: RootState) => state.minifigBuilder,
    );

    const activeMinifigProject = useMemo(
      () => characters.find((char) => char._id === activeCharacterId),
      [activeCharacterId, characters],
    );

    return (
      <section className="">
        <header className="mb-10 text-black text-center pt-12 md:hidden">
          <StyledText
            className=" text-[2.5em] font-bold leading-none mx-0.5 mb-3"
            text=" BUILD YOUR OWN MINIFIG"
            as="h1"
          />
          <StyledText className="font-bold text-md" as="h3" text="START BUILDING" />
        </header>

        <MinifigCategoryOptions activeMinifigProject={activeMinifigProject} />

        <section className="p-4">
          <MinifigTabs />

          <>
            <MinifigCanvas
              minifigParts={minifigParts}
              wardrobeItems={minifigData}
              minifigProjects={minifigProjects}
              cartModalDisclosure={modalDisclosure}
              isLoading={isLoading}
              selectorComponent={
                <MinifigCategoryOptions activeMinifigProject={activeMinifigProject} isMobileMode />
              }
            />
            <CTAButton
              variant="ghost"
              className="flex justify-self-center text-xl cursor-pointer bg-yellow-500 py-6 border border-gray-950 mt-6"
              onClick={() => modalDisclosure?.onDisclosureOpen()}
              disabled={!minifigProjects?.length}
            >
              {/* Add to cart ({minifigProjects.length} project{minifigProjects.length !== 1 ? 's' : ''}) */}
              Add to cart
            </CTAButton>
          </>
        </section>

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
