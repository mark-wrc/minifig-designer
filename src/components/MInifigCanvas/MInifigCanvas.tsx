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

const MinifigCanvas = memo<IMinifigCanvasProps>(
  ({ minifigParts, wardrobeItems = [], className, wardrobeContainerStyle, selectorComponent }) => {
    const dispatch = useDispatch();
    const wardrobeRef = useRef<HTMLDivElement>(null);
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

    const handleCategoryClick = useCallback(
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

    const handleCloseModal = useCallback(() => {
      const closeModal = modalDisclosure.onDisclosureClose();
      closeModal();
      setModalMode('create');
    }, [modalDisclosure]);

    return (
      <section className={cn('flex h-full w-full p-4 gap-4 flex-col md:flex-row', className)}>
        {/* Minifig renderer section */}
        <MinifigRenderer
          ActiveMinifigProject={ActiveMinifigProject}
          setModalMode={setModalMode}
          minifigParts={minifigParts}
          modalDisclosure={modalDisclosure}
        />

        {/*Minifig Wardrobe section */}
        <MinifigWardrobe
          ref={wardrobeRef}
          wardrobeItems={wardrobeItems}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          className={wardrobeContainerStyle}
          selectorComponent={selectorComponent}
        />

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
