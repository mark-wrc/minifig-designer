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

const MinifigCanvas = memo<IMinifigCanvasProps>(
  ({ minifigParts, wardrobeItems = [], className, wardrobeContainerStyle }) => {
    const dispatch = useDispatch();
    const wardrobeRef = useRef<HTMLDivElement>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const modalDisclosure = useDisclosureParam();

    const {
      characters = [],
      activeCharacterId = null,
      selectedCategory = null,
    } = useSelector((state: RootState) => state.minifigBuilder || {});

    const activeCharacter = characters.find((char) => char.id === activeCharacterId);

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
      <section className={cn('flex h-full w-full p-6 gap-4 flex-col md:flex-row', className)}>
        {/* Minifig renderer section */}
        <MinifigRenderer
          ActiveMinifigProject={activeCharacter}
          setModalMode={setModalMode}
          minifigParts={minifigParts}
          modalDisclosure={modalDisclosure}
        />

        {/* Wardrobe section */}
        <section ref={wardrobeRef}>
          <h3 className="text-lg font-bold mb-4">
            {selectedCategory ? `${selectedCategory} Parts` : 'Select a Category'}
          </h3>

          {/* TODO: add Tabs when its mobile view */}
          {wardrobeItems.length > 0 ? (
            <section className={cn('grid grid-cols-2 gap-4', wardrobeContainerStyle)}>
              {wardrobeItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleCategoryClick(item)}
                >
                  <img
                    className="w-1/4 object-cover rounded mb-2"
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                  />
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-sm">${item.price}</p>
                </div>
              ))}
            </section>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {selectedCategory ? (
                <p>No parts available for {selectedCategory}</p>
              ) : (
                <p>Select a category to view parts</p>
              )}
            </div>
          )}

          {/* Modal section */}
          {modalDisclosure.open && (
            <CreateMinifigModal
              initialProjectName={modalMode === 'edit' ? activeCharacter?.name : ''}
              characterId={modalMode === 'edit' ? activeCharacter?.id : undefined}
              mode={modalMode}
              onClose={handleCloseModal}
            />
          )}
        </section>
      </section>
    );
  },
);

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
