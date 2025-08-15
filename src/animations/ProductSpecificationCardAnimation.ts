import { Variants } from 'motion/react';

export const ProductSpecificationCardAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  enter: (idx) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5 + idx * 0.1,
      damping: 20,
      stiffness: 200,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};
