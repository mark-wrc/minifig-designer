import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { IMinifigCanvasProps } from './MinifigCanvas.types';
import { MinifigPartType } from '@/types';
import { MinifigPart } from '../MinifigPart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedPart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { MinifigPartData } from '@/constants/DummyParts';
import { CreateMinifigModal } from '../CreateMinifigModal';

const MinifigCanvas = memo<IMinifigCanvasProps>(({ bodyParts }) => {
  const dispatch = useDispatch();
  const wardrobeRef = useRef<HTMLDivElement>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [showModal, setShowModal] = useState(false);
  const { characters, activeCharacterId, wardrobeItems, selectedCategory } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const activeCharacter = characters.find((char) => char.id === activeCharacterId);

  // ref: https://www.javascripttutorial.net/javascript-dom/javascript-scrollintoview/
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
    <div className=" flex  h-full w-full p-6 gap-4">
      {/* figure section */}

      <section className="flex-1/2">
        <header className="flex flex-col mb-10 ">
          <h3 className=" text-center font-black">{activeCharacter?.name}</h3>

          <button className=" underline" onClick={handleTitleEdit}>
            <span>Edit Project Title</span>
          </button>
          <button>Change skin tone</button>
        </header>

        <figure>
          {Object.values(MinifigPartType).map((partType) => (
            <MinifigPart
              totalImages={bodyParts?.[partType]?.image.length}
              key={partType}
              type={partType}
              image={bodyParts?.[partType]?.image}
            />
          ))}
        </figure>
      </section>

      {/* Wardrobe section */}
      <section ref={wardrobeRef} className="w-full border-solid border-blue-300 border-2">
        {
          <div className="flex flex-col gap-4">
            {wardrobeItems?.map((item) => (
              <div
                key={item.id}
                className="w-fit p-4 cursor-pointer"
                onClick={() => handleCategoryClick(item)}
              >
                <img className=" w-28" src={item.image} alt={item.name} />
                <p>{item.name} </p>
              </div>
            ))}
          </div>
        }

        {/* Modal section */}

        {showModal && (
          <CreateMinifigModal
            initialProjectName={modalMode === 'edit' ? activeCharacter?.name : ''}
            characterId={modalMode == 'edit' ? activeCharacter?.id : undefined}
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
