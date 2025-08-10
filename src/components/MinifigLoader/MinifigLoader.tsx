import { memo } from 'react';
import Lottie from 'lottie-react';
import minifigLoader from '@/assets/lottie/minifigLoader.json';
import { IMinifigLoaderProps } from './MinifigLoader.types';
import { cn } from '@/lib/utils';

const MinifigLoader = memo<IMinifigLoaderProps>(({ size = 120, className, loop = true }) => (
  <div className={cn('flex items-center justify-center h-full', className)}>
    <Lottie animationData={minifigLoader} loop={loop} style={{ width: size, height: size }} />
  </div>
));

MinifigLoader.displayName = 'MinifigLoader';

export default MinifigLoader;
