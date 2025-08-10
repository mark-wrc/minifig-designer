import { memo, useCallback, useRef } from 'react';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { removePart, setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CTAButton } from '../CTAButton';
import { useMinifigPartRenderData, useScrollIntoView } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import { RootState } from '@/store';
import { formatCurrency, createCartSummary } from '@/utils';

const MinifigRenderer = memo<IMinifigRendererProps>(
  ({ minifigParts, modalDisclosure, setModalMode, className }) => {
    const dispatch = useDispatch();
    const { screenSize } = useWindowResize();
    const isMobile = screenSize.width <= 767;
    const minifigPartRef = useRef<HTMLDivElement>(null);

    const { characters, activeCharacterId } = useSelector(
      (state: RootState) => state.minifigBuilder,
    );

    const activeCharacter = characters.find((c) => c._id === activeCharacterId) || null;

    const cartSummary = createCartSummary(characters);
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

    // Rename character
    const handleMinifigTitleEdit = useCallback(() => {
      if (!activeCharacter) return; // Ensure an active character exists
      setModalMode('edit'); // Set the mode to 'edit'
      modalDisclosure.onDisclosureOpen(); // Open the modal
    }, [activeCharacter, modalDisclosure, setModalMode]); // Dependencies are correct

    // Add/change part
    const handlePartClick = useCallback(
      (type: MinifigPartType) => {
        if (!activeCharacter) {
          modalDisclosure.onDisclosureOpen();
          setModalMode('create'); // If no active character, open modal in 'create' mode
          return;
        }
        dispatch(setSelectedCategory(type));
      },
      [dispatch, modalDisclosure, activeCharacter, setModalMode], // Add setModalMode to dependencies
    );

    // Remove part
    const handleRemoveMinifigPart = useCallback(
      (e: React.MouseEvent, type: MinifigPartType) => {
        e.stopPropagation();
        if (!activeCharacter) return;

        dispatch(removePart(type)); // Dispatch the correct action here
      },
      [dispatch, activeCharacter],
    );

    const parts = useMinifigPartRenderData({ activeProject: activeCharacter });

    return (
      <section className={cn('flex-1', className)}>
        <header className="flex flex-col mb-10">
          <h3 className="text-center font-black mb-2 text-4xl md:text-3xl">
            {activeCharacter?.name || 'No Project Selected'}
          </h3>
          {activeCharacter && (
            <span
              className="self-center text-lg md:text-base underline bg-transparent cursor-pointer w-fit hover:text-yellow-500"
              onClick={handleMinifigTitleEdit}
            >
              Edit Project Title
            </span>
          )}
        </header>

        <section className="flex flex-col items-center relative mx-auto sm:max-w-sm md:w-[350px]">
          {parts.map(({ type, currentImage, hasMinifigParts }) => (
            <div
              key={type}
              className="text-center flex flex-col w-full justify-center items-center relative"
            >
              {activeCharacter && (
                <CTAButton
                  variant="ghost"
                  className="cursor-pointer left-5 absolute bg-yellow-500 rounded-md hover:bg-gray-950"
                  onClick={() => handlePartClick(type)}
                >
                  <Plus size={22} strokeWidth={2.75} color="white" />
                </CTAButton>
              )}

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
                  isloading={false}
                  key={currentImage}
                  type={type}
                  imageSrc={currentImage}
                />
              </div>
            </div>
          ))}

          <p className="mt-5 text-2xl font-bold">Total: {formatCurrency(totalPrice)}</p>
        </section>
      </section>
    );
  },
);

MinifigRenderer.displayName = 'MinifigRenderer';
export default MinifigRenderer;
