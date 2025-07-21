import { Variants } from 'framer-motion';

export const CategorySelectiorAnimation: Variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: [0.55, 1, 0.68, 1],
    },
  },

  enter: (idx) => ({
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: 0.5 + idx * 0.1,
      ease: [0.55, 1, 0.68, 1],
    },
  }),
};
