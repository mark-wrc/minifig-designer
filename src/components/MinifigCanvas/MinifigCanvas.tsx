import { memo, useCallback, useRef, useState } from 'react';
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

const MinifigCanvas = memo<IMinifigCanvasProps>(({ wardrobeItems = [], ...props }) => {
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
  // const { screenSize } = useWindowResize();
  // const isMobile = screenSize.width <= 767;
  const { selectedCategory = null } = useSelector(
    (state: RootState) => state.minifigBuilder || {},
  );

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

  return (
    <section
      className={cn(
        'flex h-full w-full flex-col md:flex-row md:border-3 md:rounded-t-md md:border-black/50',
        props.className,
      )}
    >
      {/* Minifig renderer section */}

      <div className="md:border-r-3 border-r-black/50 p-0 mr-0 lg:py-8 flex-1/5">
        <MinifigRenderer
          ActiveMinifigProject={ActiveMinifigProject}
          setModalMode={setModalMode}
          minifigParts={props.minifigParts}
          modalDisclosure={modalDisclosure}
        />
      </div>

      {/*Minifig Wardrobe section */}

      <section
        className={cn(
          'bg-minifig-brand-end flex flex-col mx-auto md:mx-0 mt-12 md:mt-0 flex-1/2',
          wardrobeItems.length === 0 && 'justify-center',
          props.isLoading && 'justify-center w-full',
        )}
      >
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
              onPartSelect={handleSelectMinifigItem}
              className={props.wardrobeContainerStyle}
              minifigProjects={props.minifigProjects ?? []}
              cartModalDisclosure={props.cartModalDisclosure}
              selectorComponent={props.selectorComponent}
              onItemDetailsClick={handleMinifigItemDetailsClick}
              isLoading={props.isLoading}
            />
          )}
        </div>
      </section>

      {/* Modal section */}
      {modalDisclosure.open && (
        <CreateMinifigModal
          initialProjectName={modalMode === 'edit' ? ActiveMinifigProject?.name : ''}
          characterId={modalMode === 'edit' ? ActiveMinifigProject?._id : undefined}
          mode={modalMode}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
});

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
