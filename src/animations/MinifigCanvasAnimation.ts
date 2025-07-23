import { Variants } from 'framer-motion';

export const CanvasContainerAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const RendererAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const WardrobeAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};
