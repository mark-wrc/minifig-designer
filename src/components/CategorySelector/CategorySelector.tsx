import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CategorySelectorProps } from './CategorySelector.types';
import { useMinifigCreation } from '@/hooks';
import { CreateMinifigModal } from '../CreateMinifigModal';

const CategorySelector = memo<CategorySelectorProps>(
  ({ className, item, onClick, isCategoryTab = false, isSelected }) => {
    const { characters, modalDisclosure, modalMode, ActiveMinifigProject, handleCloseModal } =
      useMinifigCreation();

    const handleCategoryClick = useCallback(() => {
      if (characters.length === 0) {
        modalDisclosure.onDisclosureOpen();
        return;
      }

      if (item.type) {
        onClick(item.type);
      }
    }, [characters.length, item.type, modalDisclosure, onClick]);

    return (
      <>
        <section
          onClick={handleCategoryClick}
          className={cn(
            ' bg-sunny cursor-pointer hover:bg-minifig-brand-end transition-all duration-200 shadow-lg text-center',
            className,
            isCategoryTab && 'bg-transparent hover:bg-yellow-300 p-0 px-4 py-1',
            isSelected ? 'bg-yellow-300' : 'bg-none',
            isSelected && !isCategoryTab ? 'bg-minifig-brand-end' : '',
          )}
        >
          {!isCategoryTab ? (
            <div>
              <img src={item.image} alt={item.title} className="w-28" />
            </div>
          ) : (
            <div className="py-0">
              <span>{item.title}</span>
            </div>
          )}
        </section>

        {modalDisclosure.open && (
          <CreateMinifigModal
            initialProjectName={modalMode === 'edit' ? ActiveMinifigProject?.name : ''}
            characterId={modalMode === 'edit' ? ActiveMinifigProject?.id : undefined}
            mode={modalMode}
            onClose={handleCloseModal}
          />
        )}
      </>
    );
  },
);
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
