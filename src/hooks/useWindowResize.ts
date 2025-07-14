import { useEffect, useState } from 'react';

export interface IWindowScreenSize {
  width: number;
  height: number;
}

const useWindowResize = () => {
  const [screenSize, setScreenSize] = useState<IWindowScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screenSize };
};

export default useWindowResize;
