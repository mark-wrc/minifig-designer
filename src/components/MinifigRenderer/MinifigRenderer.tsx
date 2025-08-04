import { memo, useCallback, useRef } from 'react';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { setSelectedCategory, removePart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch } from 'react-redux';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { CTAButton } from '../CTAButton';
import { useScrollIntoView } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { usePutMinifigProject } from '@/api/hooks';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';

const MinifigRenderer = memo<IMinifigRendererProps>(
  ({ minifigParts, ActiveMinifigProject, modalDisclosure, setModalMode, className }) => {
    const dispatch = useDispatch();
    const { screenSize } = useWindowResize();
    const isMobile = screenSize.width <= 767;
    const minifigPartRef = useRef<HTMLDivElement>(null);

    const { data: projects = [] } = useFetchMinifigProjects();
    const { mutate: updateProject } = usePutMinifigProject();

    useScrollIntoView({
      ref: minifigPartRef,
      dependencies: [minifigParts],
      options: {
        behavior: 'smooth',
        block: 'end',
        shouldScroll: !!minifigParts && isMobile,
      },
    });

    const handleMinifigTitleEdit = useCallback(() => {
      if (!ActiveMinifigProject) return;
      setModalMode('edit');
      modalDisclosure.onDisclosureOpen();
    }, [ActiveMinifigProject, modalDisclosure, setModalMode]);

    const handlePartClick = useCallback(
      (type: MinifigPartType) => {
        if (projects.length === 0) {
          modalDisclosure.onDisclosureOpen();

          return;
        }

        dispatch(setSelectedCategory(type));
      },
      [dispatch, modalDisclosure, projects.length],
    );

    const handleRemoveMinifigPart = useCallback(
      (e: React.MouseEvent, type: MinifigPartType) => {
        e.stopPropagation();
        if (!ActiveMinifigProject) return;

        dispatch(removePart(type));
        updateProject({
          id: ActiveMinifigProject._id,
          payload: { [type.toLowerCase()]: BaseMinifigParts[type].image },
        });
      },
      [ActiveMinifigProject, dispatch, updateProject],
    );

    return (
      <section className={cn('flex-1', className)}>
        <header className="flex flex-col mb-10 text-black">
          <h3 className="text-center font-black mb-2  text-4xl md:text-3xl">
            {ActiveMinifigProject?.name || 'No Project Selected'}
          </h3>
          {ActiveMinifigProject && (
            <>
              <span
                className="self-center text-lg md:text-base  underline bg-transparent cursor-pointer w-fit hover:text-yellow-500"
                onClick={handleMinifigTitleEdit}
              >
                Edit Project Title
              </span>
            </>
          )}
        </header>

        {/* Minifig builder section */}
        <section className="flex flex-col items-center relative mx-auto  sm:max-w-sm md:w-[350px]">
          {Object.values(MinifigPartType).map((partType) => {
            const image = minifigParts?.[partType]?.image;
            const totalMinifigParts = minifigParts?.[partType]?.image?.length;
            const hasMinifigParts =
              projects.length > 0 && image && image !== BaseMinifigParts[partType]?.image;

            return (
              <div
                key={partType}
                className="text-center flex flex-col w-full justify-center items-center relative"
              >
                {/* Add Minifig Parts  */}

                {(totalMinifigParts ?? 0) > 0 && (
                  <CTAButton
                    variant="ghost"
                    className="cursor-pointer left-5 absolute bg-yellow-500 rounded-md hover:bg-gray-950"
                    onClick={() => handlePartClick(partType)}
                  >
                    <Plus size={22} strokeWidth={2.75} color="white" />
                  </CTAButton>
                )}

                {/* Remove minifig Parts  */}
                {hasMinifigParts && (
                  <CTAButton
                    variant="ghost"
                    onClick={(e) => handleRemoveMinifigPart(e, partType)}
                    className="absolute right-5 bg-red-700 rounded-md  hover:bg-red-600 cursor-pointer p-2"
                  >
                    <Trash2 size={22} color="white" />
                  </CTAButton>
                )}

                <div ref={minifigPartRef}>
                  <MinifigPart
                    type={partType}
                    minifigPartsImages={minifigParts?.[partType]?.image}
                  />
                </div>
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
