import { Variants } from 'motion/react';

export const CartContainerAnimation: Variants = {
  initial: {
    x: '100%',
    transition: {
      damping: 30,
      stiffness: 300,
    },
  },
  enter: {
    x: 0,
    transition: {
      damping: 30,
      stiffness: 300,
      duration: 0.3,
    },
  },
  exit: {
    x: '100%',
    transition: {
      damping: 30,
      stiffness: 300,
      duration: 0.3,
    },
  },
};

export const CartOverlayAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
