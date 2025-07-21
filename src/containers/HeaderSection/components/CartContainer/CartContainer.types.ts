import { Dispatch, SetStateAction } from 'react';

export interface ICartContainerProps {
  className?: string;
  onclose: () => void;
  setOpenCart?: Dispatch<SetStateAction<boolean>>;
}
