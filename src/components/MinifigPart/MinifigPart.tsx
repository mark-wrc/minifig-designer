import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { IMinifigPartProps } from './MinifigPart.types';
import { useDisclosureParam } from '@/hooks';
import { motion } from 'motion/react';
import { MinifigPartAnimation } from '@/animations';

const MinifigPart = memo<IMinifigPartProps>(({ type, minifigPartsImages, className }) => {
  const modalDisclosure = useDisclosureParam();

  const handleCloseModal = useCallback(() => {
    modalDisclosure.onDisclosureClose();
  }, [modalDisclosure]);

  return (
    <section className="flex justify-center w-[130px] md:w-[130px]">
      <div className={cn('flex items-center', className)}>
        <motion.figure
          variants={MinifigPartAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {minifigPartsImages && (
            <img src={minifigPartsImages} alt={type.toLowerCase()} className="object-contain" />
          )}
        </motion.figure>
      </div>

      {modalDisclosure.open && <CreateMinifigModal mode="create" onClose={handleCloseModal} />}
    </section>
  );
});

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
