import { memo, useCallback, useRef } from 'react';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { CTAButton } from '../CTAButton';
import { useMinifigPartRenderData, useScrollIntoView } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { useMinifigProjectById, usePutMinifigProject } from '@/api/hooks';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';
import { RootState } from '@/store';
import { IMinifigProject } from '@/types/Minifig';
import { createCartSummary, formatCurrency } from '@/utils';

const MinifigRenderer = memo<IMinifigRendererProps>(
  ({ minifigParts, modalDisclosure, setModalMode, className }) => {
    const dispatch = useDispatch();

    const { screenSize } = useWindowResize();

    const isMobile = screenSize.width <= 767;

    const minifigPartRef = useRef<HTMLDivElement>(null);
    const { activeCharacterId } = useSelector((state: RootState) => state.minifigBuilder);

    // API hooks
    const { data: ActiveMinifigProject } = useMinifigProjectById(activeCharacterId || '');
    const { data: projects = [], isRefetching: isProjectRefetching } = useFetchMinifigProjects();
    const { mutate: updateProject } = usePutMinifigProject();

    const cartSummary = createCartSummary(projects);

    const { totalPrice } = cartSummary;

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

        // Create the updated selectedItems object with the specific part set to its default
        const updatedSelectedItems: IMinifigProject['selectedItems'] = {
          ...ActiveMinifigProject.project.selectedItems,
          [type.toLowerCase()]: BaseMinifigParts[type],
        };

        updateProject({
          id: ActiveMinifigProject.project._id,
          payload: { selectedItems: updatedSelectedItems },
        });
      },
      [ActiveMinifigProject, updateProject],
    );

    const parts = useMinifigPartRenderData({ activeProject: ActiveMinifigProject });

    return (
      <section className={cn('flex-1', className)}>
        <header className="flex flex-col mb-10 text-black">
          <h3 className="text-center font-black mb-2 text-4xl md:text-3xl">
            {ActiveMinifigProject?.project.name || 'No Project Selected'}
          </h3>
          {ActiveMinifigProject && (
            <>
              <span
                className="self-center text-lg md:text-base underline bg-transparent cursor-pointer w-fit hover:text-yellow-500"
                onClick={handleMinifigTitleEdit}
              >
                Edit Project Title
              </span>
            </>
          )}
        </header>
        {/* Minifig builder section */}

        <section className="flex flex-col items-center relative mx-auto sm:max-w-sm md:w-[350px]">
          {parts.map(({ type, currentImage, hasMinifigParts }) => (
            <div
              key={type}
              className="text-center flex flex-col w-full justify-center items-center relative"
            >
              {/* Add/Change Minifig Parts */}
              {projects.length > 0 && ( // Show Plus button if a project is active
                <CTAButton
                  variant="ghost"
                  className="cursor-pointer left-5 absolute bg-yellow-500 rounded-md hover:bg-gray-950"
                  onClick={() => handlePartClick(type)}
                >
                  <Plus size={22} strokeWidth={2.75} color="white" />
                </CTAButton>
              )}

              {/* Remove minifig Parts */}
              {hasMinifigParts && (
                <CTAButton
                  variant="ghost"
                  onClick={(e) => handleRemoveMinifigPart(e, type)}
                  className="absolute right-5 bg-red-700 rounded-md hover:bg-red-600 cursor-pointer p-2"
                >
                  <Trash2 size={22} color="white" />
                </CTAButton>
              )}
              <div ref={minifigPartRef}>
                <MinifigPart
                  isloading={isProjectRefetching}
                  key={currentImage}
                  type={type}
                  // Pass the current image or fallback to the default placeholder image
                  imageSrc={currentImage}
                />
              </div>
            </div>
          ))}

          <p className=" mt-5 text-2xl font-bold"> Total: {formatCurrency(totalPrice)}</p>
        </section>
      </section>
    );
  },
);

MinifigRenderer.displayName = 'MinifigRenderer';

export default MinifigRenderer;
