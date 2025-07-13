import { memo, useCallback } from 'react';
import { CTAButton } from '../CTAButton';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/lib/utils';

const MinifigRenderer = memo<IMinifigRendererProps>(
  ({ minifigParts, ActiveMinifigProject, modalDisclosure, setModalMode, className }) => {
    const handleMinifigTitleEdit = useCallback(() => {
      if (!ActiveMinifigProject) return;
      setModalMode('edit');
      modalDisclosure.onDisclosureOpen();
    }, [ActiveMinifigProject, modalDisclosure, setModalMode]);

    return (
      <section className={cn('flex-1', className)}>
        <header className="flex flex-col mb-10">
          <h3 className="text-center font-black text-xl mb-2">
            {ActiveMinifigProject?.name || 'No Character Selected'}
          </h3>
          {ActiveMinifigProject && (
            <>
              <CTAButton
                className=" self-center text-blue-600 bg-transparent cursor-pointer w-fit hover:text-blue-800"
                onClick={handleMinifigTitleEdit}
              >
                <span>Edit Project Title</span>
              </CTAButton>
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
    );
  },
);

MinifigRenderer.displayName = 'MinifigRenderer';

export default MinifigRenderer;
