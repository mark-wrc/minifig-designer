import { JSX } from 'react';

export interface IStyledTextProps {
  text: string;
  className?: string;
  onClick?: () => void;
  showCheckMark?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
