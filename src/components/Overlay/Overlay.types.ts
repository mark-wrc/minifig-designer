import { MotionProps } from 'motion/react';

export interface IOverlayProps extends MotionProps {
  className?: string;
  onClick?: () => void;
}
