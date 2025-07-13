import { CTAButton, MinifigCanvas, MinifigTabs } from '@/components';
import { memo } from 'react';
import { MinifigBuilderCardPopupModal } from '../MinifigBuilderCartPopupModal';
import { IMinifigDesktopModeProps } from './MinifigDesktopMode.types';

const MinifigDesktopMode = memo<IMinifigDesktopModeProps>(
  ({ minifigParts, minifigData, modalDisclosure, minifigProjects }) => (
    <section className="bg-soft-gray container mx-auto rounded-2xl p-4">
      <MinifigTabs />

      <MinifigCanvas minifigParts={minifigParts} wardrobeItems={minifigData} />

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

MinifigDesktopMode.displayName = 'MinifigDesktopMode';

export default MinifigDesktopMode;
