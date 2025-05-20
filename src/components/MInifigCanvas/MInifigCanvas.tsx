import { memo, useCallback } from 'react';
import { IMinifigCanvasProps } from './MinifigCanvas.types';
import { MinifigPartType } from '@/types';
import { MinifigPart } from '../MinifigPart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { renameCharacter } from '@/store/minifigBuilder/minifigBuilderSlice';

const MinifigCanvas = memo<IMinifigCanvasProps>(({ bodyParts }) => {
  const dispatch = useDispatch();

  const { characters, activeCharacterId } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const activeCharacter = characters.find((char) => char.id === activeCharacterId);

  const handleTitleEdit = useCallback(() => {
    const newTitle = prompt('Enter new title:', activeCharacter?.name);
    if (newTitle?.trim() && activeCharacter?.id) {
      dispatch(renameCharacter({ id: activeCharacter.id, name: newTitle.trim() }));
    }
  }, [activeCharacter?.id, activeCharacter?.name, dispatch]);

  if (!activeCharacter) {
    return <div>Create a new Project to start Building</div>;
  }

  return (
    <div className=" flex  h-full w-full p-6 gap-4">
      {/* figure section */}

      <section className="flex-1/2">
        <header className="flex flex-col mb-10 ">
          <h3 className=' text-center font-black'>{activeCharacter.name}</h3>

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
      <section className="w-full border-solid border-blue-300 border-2">test</section>
    </div>
  );
});

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
