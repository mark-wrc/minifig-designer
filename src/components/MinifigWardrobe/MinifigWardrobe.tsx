import { forwardRef, memo } from 'react';
import { IMinifigWardrobeProps } from './MinifigWardrobe.types';
import { cn } from '@/lib/utils';
import { MinifigWardrobeItem } from '../MinifigWardrobeItem';
import { EmptyStateComponent } from '../EmptyStateComponent';
import { Blocks } from 'react-loader-spinner';

const MinifigWardrobe = memo(
  forwardRef<HTMLDivElement, IMinifigWardrobeProps>(
    (
      {
        wardrobeItems,
        selectedCategory,
        onCategoryClick,
        className,
        selectorComponent,
        onItemDetailsClick,
        onPartSelect,
        isLoading,
      },
      ref,
    ) => {
      if (!selectedCategory) {
        return (
          <EmptyStateComponent
            className="px-4 text-xl text-center"
            message=" Start by exploring the different options e.g. Heads and Torso!"
          />
        );
      }

      if (isLoading) {
        return <Blocks width="100" height="100" />;
      }

      return (
        <section
          className={cn(
            className,
            'w-full h-full border-2 border-gray-950 rounded-md md:border-0 md:rounded-none ',
          )}
          ref={ref}
        >
          {selectorComponent && <div className="md:hidden">{selectorComponent}</div>}
          {wardrobeItems?.length > 0 && (
            <section className="grid grid-cols-3 lg:grid-cols-3 gap-4 max-h-[300px] md:max-h-[600px] overflow-y-auto p-2 mt-10 md:mt-0 minifig-scrollbar">
              {wardrobeItems.map((item) => (
                <MinifigWardrobeItem
                  onPartSelect={onPartSelect}
                  minifigItem={item}
                  onCategoryClick={onCategoryClick}
                  onItemDetailsClick={onItemDetailsClick}
                />
              ))}
            </section>
          )}
        </section>
      );
    },
  ),
);

MinifigWardrobe.displayName = 'MinifigWardrobe';

export default MinifigWardrobe;
