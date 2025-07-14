import { memo, useCallback } from 'react';
import { CTAButton } from '../CTAButton';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { setSelectedCategory, removePart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

const MinifigRenderer = memo<IMinifigRendererProps>(
  ({ minifigParts, ActiveMinifigProject, modalDisclosure, setModalMode, className }) => {
    const { characters } = useSelector((state: RootState) => state.minifigBuilder);
    const dispatch = useDispatch();

    const handleMinifigTitleEdit = useCallback(() => {
      if (!ActiveMinifigProject) return;
      setModalMode('edit');
      modalDisclosure.onDisclosureOpen();
    }, [ActiveMinifigProject, modalDisclosure, setModalMode]);

    const handlePartClick = useCallback(
      (type: MinifigPartType) => {
        if (characters.length === 0) {
          modalDisclosure.onDisclosureOpen();

          return;
        }

        dispatch(setSelectedCategory(type));
      },
      [characters.length, dispatch, modalDisclosure],
    );

    const handleRemoveMinifigPart = useCallback(
      (e: React.MouseEvent, type: MinifigPartType) => {
        e.stopPropagation();
        dispatch(removePart(type));
      },
      [dispatch],
    );

    return (
      <section className={cn('flex-1', className)}>
        <header className="flex flex-col mb-10">
          <h3 className="text-center font-black text-xl mb-2">
            {ActiveMinifigProject?.name || 'No Character Selected'}
          </h3>
          {ActiveMinifigProject && (
            <>
              <CTAButton
                className="self-center text-blue-600 bg-transparent cursor-pointer w-fit hover:text-blue-800"
                onClick={handleMinifigTitleEdit}
              >
                <span>Edit Project Title</span>
              </CTAButton>
            </>
          )}
        </header>

        {/* Minifig builder section */}
        <section className="flex flex-col items-center relative ">
          {Object.values(MinifigPartType).map((partType) => {
            const image = minifigParts?.[partType]?.image;
            const totalMinifigParts = minifigParts?.[partType]?.image?.length;
            const hasMinifigParts =
              characters.length > 0 && image && image !== BaseMinifigParts[partType]?.image;

            return (
              <div key={partType} className="text-center w-[180px]">
                {/* Add Minifig Parts  */}
                {(totalMinifigParts ?? 0) > 0 && (
                  <CTAButton
                    className="cursor-pointer left-0 absolute"
                    onClick={() => handlePartClick(partType)}
                  >
                    <Plus size={32} />
                  </CTAButton>
                )}

                {/* Remove minifig Parts  */}
                {hasMinifigParts && (
                  <CTAButton
                    variant="destructive"
                    size="icon"
                    onClick={(e) => handleRemoveMinifigPart(e, partType)}
                    className="h-10 w-10 absolute right-0"
                  >
                    <Trash2 size={20} />
                  </CTAButton>
                )}

                <MinifigPart
                  type={partType}
                  minifigPartsImages={minifigParts?.[partType]?.image}
                />
              </div>
            );
          })}
        </section>
      </section>
    );
  },
);

MinifigRenderer.displayName = 'MinifigRenderer';

export default MinifigRenderer;
