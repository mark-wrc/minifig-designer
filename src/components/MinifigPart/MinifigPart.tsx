import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { IMinifigPartProps } from './MinifigPart.types';
import { useDisclosureParam } from '@/hooks';
import { motion } from 'motion/react';
import { MinifigPartAnimation } from '@/animations';
import { MinifigPartType } from '@/types';

const MinifigPart = memo<IMinifigPartProps>(({ type, imageSrc, className }) => {
  const modalDisclosure = useDisclosureParam();
  const handleCloseModal = useCallback(() => {
    modalDisclosure.onDisclosureClose();
  }, [modalDisclosure]);

  return (
    <section className="flex justify-center w-[130px] md:w-[130px] ">
      <div className={cn('flex items-center relative', className)}>
        <motion.figure
          variants={MinifigPartAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt={type.toLowerCase()}
              className={cn(
                'object-contain block w-full h-full -mt-2 ',
                type === MinifigPartType.HEAD ? 'relative z-50' : 'relative z-10',
                type === MinifigPartType.HAIR && 'translate-y-4',
                type === MinifigPartType.LEGS && '-mt-4',
              )}
            />
          )}
        </motion.figure>
      </div>
      {modalDisclosure.open && <CreateMinifigModal mode="create" onClose={handleCloseModal} />}
    </section>
  );
});

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
