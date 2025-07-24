import { Variants } from 'motion/react';

export const MinifigPartAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
};
