import type { IMinifigProductImage } from '@/types/Minifig';

export const getBuilderImage = (
  images: IMinifigProductImage[] = [],
): IMinifigProductImage | undefined => {
  return (
    images.find((img) => img.usage === 'MINIFIG_BUILDER' || img.usage === 'BOTH') || images[0]
  );
};
