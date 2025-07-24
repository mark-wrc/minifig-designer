import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { IMinifigCanvasProps } from './MinifigCanvas.types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { setSelectedPart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { MinifigPartData } from '@/types/Minifig';
import MinifigRenderer from '../MinifigRenderer/MinifigRenderer';
import { useDisclosureParam } from '@/hooks';
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
    const dispatch = useDispatch();
    const wardrobeRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<MinifigPartData | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const modalDisclosure = useDisclosureParam();

    const {
      characters = [],
      activeCharacterId = null,
      selectedCategory = null,
    } = useSelector((state: RootState) => state.minifigBuilder || {});

    const ActiveMinifigProject = characters.find((char) => char.id === activeCharacterId);

    // Scroll to wardrobe when category changes
    useEffect(() => {
      if (selectedCategory && wardrobeRef.current)
        wardrobeRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, [selectedCategory]);

    // handle select minifig part
    const handleSelectMinifigItem = useCallback(
      (item: MinifigPartData) => {
        if (characters.length === 0) {
          modalDisclosure.onDisclosureOpen();
          setModalMode('create');
          return;
        }

        dispatch(setSelectedPart(item));
      },
      [characters.length, dispatch, modalDisclosure],
    );

    const handleMinifigItemDetailsClick = useCallback((item: MinifigPartData) => {
      setSelectedItem(item);
    }, []);

    const handleBackNavigation = useCallback(() => setSelectedItem(null), []);

    const handleCloseModal = useCallback(() => {
      const closeModal = modalDisclosure.onDisclosureClose();
      closeModal();
      setModalMode('create');
    }, [modalDisclosure]);

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

        <section className="bg-white flex flex-col rounded-sm mx-auto md:mx-0 mt-12 md:mt-0">
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
