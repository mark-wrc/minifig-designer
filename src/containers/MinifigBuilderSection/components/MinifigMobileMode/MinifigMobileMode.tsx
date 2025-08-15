import { CTAButton, MinifigCanvas, MinifigTabs, StyledText } from '@/components';
import { memo, useMemo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigMobileModeProps } from './MinifigModalMode.types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MinifigCategoryOptions from '@/containers/CategorySection/components/MinifigCategoryOptions';

const MinifigMobileMode = memo<IMinifigMobileModeProps>(({ ...props }) => {
  const { activeCharacterId, characters = [] } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const activeMinifigProject = useMemo(
    () => characters.find((char) => char._id === activeCharacterId),
    [activeCharacterId, characters],
  );

  return (
    <>
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
            minifigParts={props.minifigParts}
            wardrobeItems={props.minifigData}
            minifigProjects={props.minifigProjects}
            cartModalDisclosure={props.modalDisclosure}
            isLoading={props.isLoading}
            selectorComponent={
              <MinifigCategoryOptions activeMinifigProject={activeMinifigProject} isMobileMode />
            }
            setCurrentPage={props.setCurrentPage}
            currentPage={props.currentPage}
            totalPages={props.totalPages}
          />
          <CTAButton
            variant="ghost"
            className="flex justify-self-center mt-4 bg-yellow-300 border-t-8 border-l-8 border-l-yellow-600 border-t-yellow-400 shadow-lg shadow-yellow-500/40 hover:border-l-0 active:border-l-0 transition-all duration-75  hover:-translate-x-0.5  active:-translate-x-0.5 hover:shadow-md py-6 text-black  font-bold hover:bg-yellow-400 active:bg-yellow-400 text-base"
            onClick={() => props.modalDisclosure?.onDisclosureOpen()}
            disabled={!props.minifigProjects?.length}
          >
            Add to cart
          </CTAButton>
        </>
      </section>

      {props.modalDisclosure.open && props.minifigProjects && (
        <MinifigBuilderCardPopupModal
          onclose={props.modalDisclosure.onDisclosureClose()}
          minifig={props.minifigProjects}
        />
      )}
    </>
  );
});

MinifigMobileMode.displayName = 'MinifigMobileMode';

export default MinifigMobileMode;
