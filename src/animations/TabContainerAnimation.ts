import { Variants } from 'framer-motion';

// export const TabContainerAnimation: Variants = {
//   initial: {
//     opacity: 0,
//   },
//   enter: {
//     opacity: 1,
//     transition: {
//       when: 'beforeChildren',
//       staggerChildren: 0.1,
//     },
//   },
//   exit: {
//     opacity: 0,
//   },
// };

export const TabItemAnimation: Variants = {
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

export const TabButtonAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delay: 0.5,
      damping: 20,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};
