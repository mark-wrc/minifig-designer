import { memo, useCallback, useRef } from 'react';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { setSelectedCategory, removePart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { CTAButton } from '../CTAButton';
import { useScrollIntoView } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { useMinifigProjectById, usePutMinifigProject } from '@/api/hooks';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';
import { RootState } from '@/store';
import { IMinifigProject, SelectedMinifigItems } from '@/types/Minifig';

const MinifigRenderer = memo<IMinifigRendererProps>(
  ({ minifigParts, modalDisclosure, setModalMode, className }) => {
    const dispatch = useDispatch();
    const { screenSize } = useWindowResize();
    const isMobile = screenSize.width <= 767;
    const minifigPartRef = useRef<HTMLDivElement>(null);
    const { activeCharacterId } = useSelector((state: RootState) => state.minifigBuilder);

    const { data: ActiveMinifigProject } = useMinifigProjectById(activeCharacterId || '');
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

        // Create the updated selectedItems object with the specific part set to its default
        const updatedSelectedItems: IMinifigProject['selectedItems'] = {
          ...ActiveMinifigProject.project.selectedItems,
          [type.toLowerCase()]: BaseMinifigParts[type], // Set the part to its default object
        };

        dispatch(removePart(type)); // This updates the Redux state

        updateProject({
          id: ActiveMinifigProject.project._id,
          payload: { selectedItems: updatedSelectedItems }, // Send the full updated selectedItems object
        });
      },
      [ActiveMinifigProject, dispatch, updateProject],
    );

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
          {Object.values(MinifigPartType).map((partType) => {
            // Access the current part data from ActiveMinifigProject.selectedItems
            const currentPart =
              ActiveMinifigProject?.project.selectedItems?.[
                partType.toLowerCase() as keyof SelectedMinifigItems
              ]; // Access directly using lowercase string
            const currentImage = currentPart?.image; // This is how we access the image URL

            // Determine if a custom part is selected (i.e., not the default placeholder)
            const isCustomPartSelected =
              !!currentPart &&
              !!currentImage &&
              currentImage !== BaseMinifigParts[partType]?.image;

            return (
              <div
                key={partType}
                className="text-center flex flex-col w-full justify-center items-center relative"
              >
                {/* Add/Change Minifig Parts */}
                {projects.length > 0 && ( // Show Plus button if a project is active
                  <CTAButton
                    variant="ghost"
                    className="cursor-pointer left-5 absolute bg-yellow-500 rounded-md hover:bg-gray-950"
                    onClick={() => handlePartClick(partType)}
                  >
                    <Plus size={22} strokeWidth={2.75} color="white" />
                  </CTAButton>
                )}
                {/* Remove minifig Parts */}
                {isCustomPartSelected && ( // Only show trash if a custom part is selected
                  <CTAButton
                    variant="ghost"
                    onClick={(e) => handleRemoveMinifigPart(e, partType)}
                    className="absolute right-5 bg-red-700 rounded-md hover:bg-red-600 cursor-pointer p-2"
                  >
                    <Trash2 size={22} color="white" />
                  </CTAButton>
                )}
                <div ref={minifigPartRef}>
                  <MinifigPart
                    type={partType}
                    // Pass the current image or fallback to the default placeholder image
                    imageSrc={currentImage || BaseMinifigParts[partType]?.image}
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
