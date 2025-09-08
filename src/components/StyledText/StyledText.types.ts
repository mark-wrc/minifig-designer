import { JSX, ReactNode } from 'react';

export interface IStyledTextProps {
  text: ReactNode;
  className?: string;
  onClick?: () => void;
  showCheckMark?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
