import { Variants } from 'motion/react';

export const WardrobeItemDetailsAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      delay: 0.25,
      damping: 20,
      stiffness: 200,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
  },
};

export const ProductBackButtonAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      damping: 20,
      stiffness: 200,
    },
  },
};
