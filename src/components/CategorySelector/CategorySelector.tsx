import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CategorySelectorProps } from './CategorySelector.types';
import { useMinifigCreation } from '@/hooks';
import { CreateMinifigModal } from '../CreateMinifigModal';

const CategorySelector = memo<CategorySelectorProps>(
  ({ className, item, onClick, isCategoryTab = false, isSelected }) => {
    const { characters, modalDisclosure, modalMode, activeCharacter, handleCloseModal } =
      useMinifigCreation();

    const handleCategoryClick = useCallback(() => {
      if (characters.length === 0) {
        modalDisclosure.onDisclosureOpen();
        return;
      }

      if (item.type) {
        onClick(item.type);
      }
    }, [item.type, modalDisclosure, onClick, characters.length]);

    return (
      <>
        <section
          onClick={handleCategoryClick}
          className={cn(
            ' bg-sunny w-ful h-full flex  items-center cursor-pointer hover:bg-minifig-brand-end transition-all duration-200 shadow-lg text-center',
            className,
            isCategoryTab && 'bg-transparent hover:bg-yellow-300 p-0 px-4 py-1',
            isSelected ? 'bg-yellow-300' : 'bg-none',
            isSelected && !isCategoryTab ? 'bg-minifig-brand-end' : '',
          )}
        >
          {!isCategoryTab ? (
            <div>
              <img src={item.image} alt={item.title} className="w-20 md:w-28 object-contain" />
            </div>
          ) : (
            <div className="py-0 px-3">
              <span>{item.title}</span>
            </div>
          )}
        </section>

        <CreateMinifigModal
          isOpen={modalDisclosure.open}
          initialProjectName={modalMode === 'edit' ? activeCharacter?.name : ''}
          characterId={modalMode === 'edit' ? activeCharacter?._id : undefined}
          mode={modalMode}
          onClose={handleCloseModal}
        />
      </>
    );
  },
);
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
