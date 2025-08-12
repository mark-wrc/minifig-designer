import { JSX } from 'react';

export interface IStyledTextProps {
  text: string;
  className?: string;
  showCheckMark?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
