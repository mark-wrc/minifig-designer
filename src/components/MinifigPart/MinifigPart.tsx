import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { IMinifigPartProps } from './MinifigPart.types';
import { useDisclosureParam } from '@/hooks';
import { MinifigPartType } from '@/types';

const MinifigPart = memo<IMinifigPartProps>(({ type, imageSrc, className }) => {
  const modalDisclosure = useDisclosureParam();
  const handleCloseModal = useCallback(() => {
    modalDisclosure.onDisclosureClose();
  }, [modalDisclosure]);

  return (
    <section className="flex justify-center w-[130px] md:w-[130px] ">
      <div className={cn('flex items-center relative', className)}>
        <figure>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={type.toLowerCase()}
              className={cn(
                'object-contain block w-full h-full -mt-4 relative z-10 ',
                type === MinifigPartType.HAIR && ' z-20 -mb-18',
                type === MinifigPartType.HEAD && 'relative z-40 scale-65 translate-y-5.5',
                type === MinifigPartType.TORSO && 'z-30 scale-150',
                type === MinifigPartType.LEGS && ' z-10 -mt-10 ',
                type === MinifigPartType.ACCESSORY && 'mt-0 rounded-md border-2 border-gray-800',
              )}
            />
          )}
        </figure>
      </div>
      {modalDisclosure.open && <CreateMinifigModal mode="create" onClose={handleCloseModal} />}
    </section>
  );
});

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
