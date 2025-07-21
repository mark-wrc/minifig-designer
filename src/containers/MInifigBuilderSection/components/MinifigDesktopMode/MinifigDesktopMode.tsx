import { CTAButton, MinifigCanvas, MinifigTabs } from '@/components';
import { memo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigDesktopModeProps } from './MinifigDesktopMode.types';
import { CategorySection } from '@/containers/CategorySection';

const MinifigDesktopMode = memo<IMinifigDesktopModeProps>(
  ({ minifigParts, minifigData, modalDisclosure, minifigProjects }) => (
    <section className="container mx-auto p-4 mb-4 w-fit">
      <CategorySection />
      <MinifigTabs />

      <MinifigCanvas minifigParts={minifigParts} wardrobeItems={minifigData} />
      <div className="bg-minifig-brand-end px-2 py-3 rounded-b-2xl ">
        <CTAButton
          variant="ghost"
          className="flex justify-self-end cursor-pointer bg-yellow-500 border border-gray-950"
          onClick={() => modalDisclosure.onDisclosureOpen()}
          disabled={!minifigProjects.length}
        >
          Add to cart ({minifigProjects.length} project{minifigProjects.length !== 1 ? 's' : ''})
        </CTAButton>
      </div>

      {modalDisclosure.open && minifigProjects && (
        <MinifigBuilderCardPopupModal
          onclose={modalDisclosure.onDisclosureClose()}
          minifig={minifigProjects}
        />
      )}
    </section>
  ),
);

MinifigDesktopMode.displayName = 'MinifigDesktopMode';

export default MinifigDesktopMode;
