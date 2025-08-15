import { CTAButton, MinifigCanvas, MinifigTabs } from '@/components';
import { memo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigDesktopModeProps } from './MinifigDesktopMode.types';
import { CategorySection } from '@/containers/CategorySection';

const MinifigDesktopMode = memo<IMinifigDesktopModeProps>(({ ...props }) => (
  <section className="container mx-auto p-4 mb-4 w-fit xl:w-6xl  ">
    <CategorySection />
    <MinifigTabs />

    <MinifigCanvas
      setCurrentPage={props.setCurrentPage}
      totalPages={props.totalPages}
      currentPage={props.currentPage}
      minifigParts={props.minifigParts}
      wardrobeItems={props.minifigData}
      isLoading={props.isLoading}
    />

    <div className="px-2 py-3 flex justify-end h-fit">
      <CTAButton
        variant="default"
        className=" bg-yellow-300 border-t-8 border-l-8 box-border border-l-yellow-600 border-t-yellow-400 shadow-lg  border-b-6 border-b-transparent shadow-yellow-500/40 hover:border-l-0 transition-all duration-75 hover:-translate-x-0.5 hover:shadow-md py-6 text-black font-bold hover:bg-yellow-400 text-base"
        onClick={() => props.modalDisclosure.onDisclosureOpen()}
        disabled={!props.minifigProjects.length}
      >
        Add to cart ({props.minifigProjects.length} project
        {props.minifigProjects.length !== 1 ? 's' : ''})
      </CTAButton>
    </div>

    {props.modalDisclosure.open && props.minifigProjects && (
      <MinifigBuilderCardPopupModal
        onclose={props.modalDisclosure.onDisclosureClose()}
        minifig={props.minifigProjects}
      />
    )}
  </section>
));

MinifigDesktopMode.displayName = 'MinifigDesktopMode';

export default MinifigDesktopMode;
