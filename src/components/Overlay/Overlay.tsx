import { motion } from 'motion/react';
import { memo } from 'react';
import { IOverlayProps } from './Overlay.types';
import { cn } from '@/lib/utils';

const Overlay = memo<IOverlayProps>(({ className, onClick, ...props }) => (
  <motion.div
    variants={props.variants}
    initial="initial"
    animate="enter"
    exit="exit"
    className={cn('bg-black/90 fixed w-full top-0 left-0 z-50 bottom-0 h-full', className)}
    onClick={() => onClick?.()}
  />
));

Overlay.displayName = 'Overlay';

export default Overlay;
