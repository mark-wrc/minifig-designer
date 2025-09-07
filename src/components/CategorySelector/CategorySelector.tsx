import { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CategorySelectorProps } from './CategorySelector.types';
import { useMinifigCreation } from '@/hooks';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { StyledText } from '../StyledText';

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
            ' bg-sunny w-full h-full flex items-center cursor-pointer hover:bg-minifig-brand-end hover:shadow-minifig-brand-end/50 transition-all duration-200 shadow-lg shadow-yellow-500/50 text-center',
            className,
            isCategoryTab &&
              'bg-minifig-brand-end text-white font-bold flex flex-wrap items-center border-l-6 active:border-l-0 transition-all duration-100 border-gray-800 border-t-6 border-t-gray-600 hover:bg-minifig-brand-end/45 shadow-lg shadow-minifig-brand-end/50  mt-4 ',
            isSelected
              ? ' bg-yellow-300 text-black shadow-lg shadow-yellow-500/50 border-l-yellow-600 border-t-yellow-400 active:border-l-0 focus:shadow-md '
              : 'bg-none',
            isSelected && !isCategoryTab
              ? 'bg-minifig-brand-end shadow-lg shadow-minifig-brand-end/50'
              : '',
          )}
        >
          {!isCategoryTab ? (
            <img src={item.image} alt={item.title} className="w-28 aspect-square object-contain" />
          ) : (
            <StyledText as="span" text={item.title} className="mb-0 px-2" />
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
