import { memo } from 'react';
import { IMinifigCanvasProps } from './MinifigCanvas.types';
import { MinifigPartType } from '@/types';
import { MinifigPart } from '../MinifigPart';

const MinifigCanvas = memo<IMinifigCanvasProps>(({ projectTitle, bodyParts }) => (
  <div className="h-full p-6">
    {/* figure section */}

    <section>
      <header className="flex flex-col">
        <h3>{projectTitle ?? null}</h3>

        <button className=" underline">
          <span>Edit Project Title</span>
        </button>
        <button>Change skin tone</button>
      </header>

      <figure>
        {Object.values(MinifigPartType).map((partType) => (
          <MinifigPart key={partType} type={partType} image={bodyParts?.[partType]?.image} />
        ))}
      </figure>
    </section>

    {/* Wardrobe section */}
    <section></section>
  </div>
));

MinifigCanvas.displayName = 'MinifiCanvas';

export default MinifigCanvas;
