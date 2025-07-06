import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { IMinifigCanvasProps } from './MinifigCanvas.types';
import { MinifigPartType } from '@/types';
import { MinifigPart } from '../MinifigPart';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { setSelectedPart } from '@/store/minifigBuilder/minifigBuilderSlice';

import { CreateMinifigModal } from '../CreateMinifigModal';
import { MinifigPartData } from '@/types/Minifig';

const MinifigCanvas = memo<IMinifigCanvasProps>(({ minifigParts, wardrobeItems = [] }) => {
  const dispatch = useDispatch();
  const wardrobeRef = useRef<HTMLDivElement>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [showModal, setShowModal] = useState(false);

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

  const handleTitleEdit = useCallback(() => {
    if (!activeCharacter) return;
    setModalMode('edit');
    setShowModal(true);
  }, [activeCharacter]);

  const handleCategoryClick = useCallback(
    (item: MinifigPartData) => {
      if (characters.length === 0) {
        setShowModal(true);
        setModalMode('create');
        return;
      }
      dispatch(setSelectedPart(item));
    },
    [characters.length, dispatch],
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setModalMode('create');
  }, []);

  return (
    <div className="flex h-full w-full p-6 gap-4 flex-col md:flex-row">
      {/* Figure section */}
      <section className="flex-1">
        <header className="flex flex-col mb-10">
          <h3 className="text-center font-black text-xl mb-2">
            {activeCharacter?.name || 'No Character Selected'}
          </h3>
          {activeCharacter && (
            <>
              <button
                className="underline text-blue-600 hover:text-blue-800"
                onClick={handleTitleEdit}
              >
                <span>Edit Project Title</span>
              </button>
              <button className="text-gray-600 hover:text-gray-800">Change skin tone</button>
            </>
          )}
        </header>

        <figure className="flex flex-col items-center gap-4">
          {Object.values(MinifigPartType).map((partType) => (
            <div key={partType} className="text-center w-1/2">
              <MinifigPart
                totalImages={minifigParts?.[partType]?.image?.length || 0}
                type={partType}
                image={minifigParts?.[partType]?.image}
              />
              <p className="text-sm text-gray-600 mt-1">{partType}</p>
            </div>
          ))}
        </figure>
      </section>

      {/* Wardrobe section */}

      <section ref={wardrobeRef}>
        <h3 className="text-lg font-bold mb-4">
          {selectedCategory ? `${selectedCategory} Parts` : 'Select a Category'}
        </h3>

        {/* TODO: add Tabs when its mobile view */}

        {wardrobeItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
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
          </div>
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
        {showModal && (
          <CreateMinifigModal
            initialProjectName={modalMode === 'edit' ? activeCharacter?.name : ''}
            characterId={modalMode === 'edit' ? activeCharacter?.id : undefined}
            mode={modalMode}
            onClose={handleCloseModal}
          />
        )}
      </section>
    </div>
  );
});

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
