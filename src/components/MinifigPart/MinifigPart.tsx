import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { IMinifigPartProps } from './MinifigPart.types';
import { useDisclosureParam } from '@/hooks';

const MinifigPart = memo<IMinifigPartProps>(({ type, minifigPartsImages, className }) => {
  const modalDisclosure = useDisclosureParam();

  const handleCloseModal = useCallback(() => {
    modalDisclosure.onDisclosureClose();
  }, [modalDisclosure]);

  return (
    <section className="flex justify-center relative w-full ">
      <div className={cn('flex items-center', className)}>
        <figure className="">
          {minifigPartsImages && (
            <img src={minifigPartsImages} alt={type.toLowerCase()} className="object-contain" />
          )}
        </figure>
      </div>

      {modalDisclosure.open && <CreateMinifigModal mode="create" onClose={handleCloseModal} />}
    </section>
  );
});

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
