import { CTAButton, MinifigCanvas, MinifigTabs } from '@/components';
import { memo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigMobileModeProps } from './MinifigModalMode.types';

const MinifigMobileMode = memo<IMinifigMobileModeProps>(
  ({ minifigParts, minifigData, modalDisclosure, minifigProjects }) => (
    <section className="">
      <MinifigTabs />

      <MinifigCanvas
        wardrobeContainerStyle="bg-soft-gray rounded-2xl p-4"
        minifigParts={minifigParts}
        wardrobeItems={minifigData}
      />

      <CTAButton
        className="flex justify-self-end cursor-pointer"
        onClick={() => modalDisclosure.onDisclosureOpen()}
        disabled={!minifigProjects.length}
      >
        Add to cart ({minifigProjects.length} project{minifigProjects.length !== 1 ? 's' : ''})
      </CTAButton>

      {modalDisclosure.open && minifigProjects && (
        <MinifigBuilderCardPopupModal
          onclose={modalDisclosure.onDisclosureClose()}
          minifig={minifigProjects}
        />
      )}
    </section>
  ),
);

MinifigMobileMode.displayName = 'MinifigMobileMode';

export default MinifigMobileMode;
