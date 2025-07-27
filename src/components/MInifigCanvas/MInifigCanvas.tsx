import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { IMinifigCanvasProps } from './MinifigCanvas.types';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { MinifigPartData } from '@/types/Minifig';
import MinifigRenderer from '../MinifigRenderer/MinifigRenderer';
import { useMinifigCreation } from '@/hooks';
import { cn } from '@/lib/utils';
import { MinifigWardrobe } from '../MinifigWardrobe';
import { MinifigWardrobeItemDetails } from '../MinifigWardrobeItemDetails';

const MinifigCanvas = memo<IMinifigCanvasProps>(
  ({
    minifigParts,
    wardrobeItems = [],
    className,
    wardrobeContainerStyle,
    selectorComponent,
    minifigProjects,
    cartModalDisclosure,
  }) => {
    const {
      modalMode,
      setModalMode,
      modalDisclosure,
      ActiveMinifigProject,
      handleSelectMinifigItem,
      handleCloseModal,
    } = useMinifigCreation();

    const wardrobeRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<MinifigPartData | null>(null);

    const { selectedCategory = null } = useSelector(
      (state: RootState) => state.minifigBuilder || {},
    );

    useEffect(() => {
      if (selectedCategory && wardrobeRef.current)
        wardrobeRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, [selectedCategory]);

    const handleMinifigItemDetailsClick = useCallback((item: MinifigPartData) => {
      setSelectedItem(item);
    }, []);

    const handleBackNavigation = useCallback(() => setSelectedItem(null), []);

    return (
      <section
        className={cn(
          'flex h-full w-full flex-col md:flex-row md:border-3 md:rounded-t-md md:border-black/50',
          className,
        )}
      >
        {/* Minifig renderer section */}

        <div className="md:border-r-3 border-r-black/50 p-0 mr-0 lg:py-8">
          <MinifigRenderer
            ActiveMinifigProject={ActiveMinifigProject}
            setModalMode={setModalMode}
            minifigParts={minifigParts}
            modalDisclosure={modalDisclosure}
          />
        </div>

        {/*Minifig Wardrobe section */}

        <section className="bg-white flex flex-col justify-center mx-auto md:mx-0 mt-12 md:mt-0">
          <div className="mx-auto">
            {selectedItem ? (
              <MinifigWardrobeItemDetails
                wardrobeItems={selectedItem}
                onClick={handleBackNavigation}
                onCategoryClick={handleSelectMinifigItem}
              />
            ) : (
              <MinifigWardrobe
                ref={wardrobeRef}
                wardrobeItems={wardrobeItems}
                selectedCategory={selectedCategory}
                onCategoryClick={handleSelectMinifigItem}
                className={wardrobeContainerStyle}
                minifigProjects={minifigProjects ?? []}
                cartModalDisclosure={cartModalDisclosure}
                selectorComponent={selectorComponent}
                onItemDetailsClick={handleMinifigItemDetailsClick}
              />
            )}
          </div>
        </section>

        {/* Modal section */}
        {modalDisclosure.open && (
          <CreateMinifigModal
            initialProjectName={modalMode === 'edit' ? ActiveMinifigProject?.name : ''}
            characterId={modalMode === 'edit' ? ActiveMinifigProject?.id : undefined}
            mode={modalMode}
            onClose={handleCloseModal}
          />
        )}
      </section>
    );
  },
);

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
