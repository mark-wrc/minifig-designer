import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IMinifigCanvasProps } from './MinifigCanvas.types';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { MinifigPartData } from '@/types/Minifig';
import MinifigRenderer from '../MinifigRenderer/MinifigRenderer';
import { useMinifigCreation, useScrollIntoView } from '@/hooks';
import { cn } from '@/lib/utils';
import { MinifigWardrobe } from '../MinifigWardrobe';
import { MinifigWardrobeItemDetails } from '../MinifigWardrobeItemDetails';
import { SearchBox } from '../SearchBox';

const MinifigCanvas = memo<IMinifigCanvasProps>(({ wardrobeItems = [], ...props }) => {
  const {
    modalMode,
    setModalMode,
    modalDisclosure,
    handleSelectMinifigItem,
    handleCloseModal,
    activeCharacter,
  } = useMinifigCreation();

  const wardrobeRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<MinifigPartData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { selectedCategory = null } = useSelector(
    (state: RootState) => state.minifigBuilder || {},
  );

  // Close MinifigWardrobeItemDetails if it's open when another minifig category is selected
  useEffect(() => {
    setSelectedItem(null);
  }, [selectedCategory]);

  useScrollIntoView({
    ref: wardrobeRef,
    dependencies: [selectedCategory],
    options: {
      behavior: 'smooth',
      block: 'start',
      shouldScroll: !!selectedCategory,
    },
  });

  const handleMinifigItemDetailsClick = useCallback((item: MinifigPartData) => {
    setSelectedItem(item);
  }, []);

  const handleBackNavigation = useCallback(() => setSelectedItem(null), []);

  const filteredWardrobeItems = useMemo(() => {
    if (!searchQuery) {
      return wardrobeItems;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();

    return wardrobeItems.filter(
      (item) =>
        item.product_name.toLowerCase().includes(lowerCaseQuery) ||
        item.product_description_1.toLowerCase().includes(lowerCaseQuery) ||
        item.minifig_part_type.toLowerCase().includes(lowerCaseQuery),
    );
  }, [wardrobeItems, searchQuery]);

  return (
    <section
      className={cn(
        'flex h-full w-full flex-col md:flex-row md:border-2 rounded-md border-gray-950',
        props.className,
      )}
    >
      {/* Minifig renderer section */}

      <div className={cn('p-0 mr-0 flex-1/5 h-full text-black')}>
        <MinifigRenderer
          setModalMode={setModalMode}
          minifigParts={props.minifigParts}
          modalDisclosure={modalDisclosure}
        />
      </div>

      <section className="flex-1/2" ref={wardrobeRef}>
        <div
          className={cn(
            'flex flex-col min-h-screen mx-auto md:mx-0 md:mt-0 h-full md:border-l-4 border-dashed border-gray-800',
            wardrobeItems.length === 0 && 'justify-center',
            props.isLoading && 'justify-center w-full h-full bg-[#FFF8E0]',
          )}
        >
          {!selectedItem && !props.isLoading && wardrobeItems.length !== 0 && (
            <section className="bg-none mt-12 md:mt-0 md:bg-gray-800 py-4 flex justify-end">
              <SearchBox
                onSearch={setSearchQuery}
                placeholder="Search minifigs..."
                className="w-fit md:mr-4"
              />
            </section>
          )}
          <div className="mx-auto">
            {selectedItem ? (
              <MinifigWardrobeItemDetails
                wardrobeItems={selectedItem}
                onClick={handleBackNavigation}
                onCategoryClick={handleSelectMinifigItem}
              />
            ) : (
              <MinifigWardrobe
                wardrobeItems={filteredWardrobeItems}
                selectedCategory={selectedCategory}
                onPartSelect={handleSelectMinifigItem}
                className={props.wardrobeContainerStyle}
                minifigProjects={props.minifigProjects ?? []}
                cartModalDisclosure={props.cartModalDisclosure}
                selectorComponent={props.selectorComponent}
                onItemDetailsClick={handleMinifigItemDetailsClick}
                isLoading={props.isLoading}
                setCurrentPage={props.setCurrentPage}
                currentPage={props.currentPage}
                totalPages={props.totalPages}
              />
            )}
          </div>
        </div>
      </section>

      {/* Modal section */}

      <CreateMinifigModal
        initialProjectName={modalMode === 'edit' ? activeCharacter?.name : ''}
        characterId={modalMode === 'edit' ? activeCharacter?._id : undefined}
        mode={modalMode}
        onClose={handleCloseModal}
        isOpen={modalDisclosure.open}
      />
    </section>
  );
});

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
