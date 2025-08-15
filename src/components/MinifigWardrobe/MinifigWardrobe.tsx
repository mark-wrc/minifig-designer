import { forwardRef, memo } from 'react';
import { IMinifigWardrobeProps } from './MinifigWardrobe.types';
import { cn } from '@/lib/utils';
import { MinifigWardrobeItem } from '../MinifigWardrobeItem';
import { EmptyStateComponent } from '../EmptyStateComponent';
import { MinifigLoader } from '../MinifigLoader';
import { GeneralPagination } from '../GeneralPagination';

const MinifigWardrobe = memo(
  forwardRef<HTMLDivElement, IMinifigWardrobeProps>(({ ...props }, ref) => {
    if (!props.selectedCategory) {
      return (
        <EmptyStateComponent
          className="px-4 text-xl text-center font-bold"
          message=" Start by exploring the different options e.g. Heads and Torso!"
        />
      );
    }

    if (props.isLoading) {
      return <MinifigLoader size={200} />;
    }

    return (
      <>
        <section
          className={cn(
            props.className,
            'w-full md:h-dvh py-4 overflow-y-auto minifig-scrollbar rounded-md md:border-0 md:rounded-none  bg-[#FFF8E0]',
          )}
          ref={ref}
        >
          {props.selectorComponent && <div className=" md:hidden">{props.selectorComponent}</div>}
          {props.wardrobeItems?.length > 0 && (
            <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] md:max-h-none overflow-y-auto p-2 mt-10 md:mt-0 minifig-scrollbar">
              {props.wardrobeItems.map((item) => (
                <MinifigWardrobeItem
                  key={item._id}
                  onPartSelect={props.onPartSelect}
                  minifigItem={item}
                  onCategoryClick={props.onCategoryClick}
                  onItemDetailsClick={props.onItemDetailsClick}
                />
              ))}
            </section>
          )}
        </section>
        <section className="py-4">
          <GeneralPagination
            currentPage={props.currentPage}
            totalPages={props.totalPages}
            onPageChange={props.setCurrentPage}
          />
        </section>
      </>
    );
  }),
);

MinifigWardrobe.displayName = 'MinifigWardrobe';

export default MinifigWardrobe;
