/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect } from 'react';

interface IScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  shouldScroll?: boolean;
}

interface IUseScrollIntoViewProps {
  ref: RefObject<HTMLElement | null>;
  dependencies?: any[];
  options?: IScrollOptions;
}

export const useScrollIntoView = ({
  ref,
  dependencies = [],
  options = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    shouldScroll: true,
  },
}: IUseScrollIntoViewProps) => {
  useEffect(() => {
    const element = ref.current;
    const { shouldScroll, ...scrollOptions } = options;

    if (element && shouldScroll) {
      element.scrollIntoView(scrollOptions);
    }
  }, [...dependencies]);
};
