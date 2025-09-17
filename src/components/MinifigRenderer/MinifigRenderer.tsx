import type React from 'react';
import { memo, useCallback, useRef } from 'react';
import { MinifigPart } from '../MinifigPart';
import { MinifigPartType } from '@/types';
import type { IMinifigRendererProps } from './MinifigRenderer.types';
import { cn } from '@/utils/cn';
import { Trash2, Plus } from 'lucide-react';
import { removePart, setSelectedCategory } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CTAButton } from '../CTAButton';
import { useMinifigPartRenderData, useScrollIntoView } from '@/hooks';
import useWindowResize from '@/hooks/useWindowResize';
import type { RootState } from '@/store';
import { formatCurrency, createCartSummary } from '@/utils';
import { StyledText } from '../StyledText';

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
      if (!activeCharacter) return;
      setModalMode('edit');
      modalDisclosure.onDisclosureOpen();
    }, [activeCharacter, modalDisclosure, setModalMode]);

    const handlePartClick = useCallback(
      (type: MinifigPartType) => {
        if (!activeCharacter) {
          modalDisclosure.onDisclosureOpen();
          setModalMode('create');
          return;
        }
        dispatch(setSelectedCategory(type));
      },
      [dispatch, modalDisclosure, activeCharacter, setModalMode],
    );

    // Remove part
    const handleRemoveMinifigPart = useCallback(
      (e: React.MouseEvent, type: MinifigPartType, slotIndex?: number) => {
        e.stopPropagation();
        if (!activeCharacter) return;

        dispatch(
          removePart({
            partType: type,
            slotIndex: type === MinifigPartType.ACCESSORY ? slotIndex : undefined,
          }),
        );
      },
      [dispatch, activeCharacter],
    );

    const parts = useMinifigPartRenderData({ activeProject: activeCharacter });

    return (
      <section className={cn(' h-full', className)}>
        <header className="flex flex-col mb-10">
          <StyledText
            as="h3"
            className="text-center font-black mt-4 text-4xl md:text-3xl"
            text={activeCharacter?.name || 'No Project Selected'}
          />

          {activeCharacter && (
            <StyledText
              className="self-center text-lg md:text-base underline bg-transparent cursor-pointer w-fit hover:text-yellow-500"
              onClick={handleMinifigTitleEdit}
              text="Edit Project Title"
            />
          )}
        </header>

        <section className="flex flex-col items-center relative mx-auto sm:max-w-sm md:w-[350px]">
          {/* Minifig Accessory section */}
          {parts.map((part) => {
            if (part.isArray && part.slots) {
              return (
                <section key={part.type} className="w-fit mb-4 ">
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {part.slots.map((slot) => (
                      <div
                        key={slot.slotIndex}
                        className="text-center flex flex-col-reverse justify-center items-center relative border-2 border-dashed border-gray-300 rounded-lg p-4"
                      >
                        {slot.hasMinifigParts && (
                          <CTAButton
                            variant="ghost"
                            onClick={(e) => handleRemoveMinifigPart(e, part.type, slot.slotIndex)}
                            className=" bg-red-700 rounded-md hover:bg-red-600 active:bg-red-600"
                          >
                            <Trash2 size={16} color="white" />
                          </CTAButton>
                        )}

                        <div className="flex flex-col">
                          {!slot.hasMinifigParts ? (
                            <CTAButton
                              variant="ghost"
                              className="cursor-pointer hover:bg-gray-600 active:bg-gray-600  bg-gray-800"
                              onClick={() => handlePartClick(part.type)}
                            >
                              <Plus size={16} strokeWidth={2.75} color="white" />
                            </CTAButton>
                          ) : (
                            <MinifigPart
                              key={slot.currentImage}
                              type={part.type}
                              imageSrc={slot.currentImage}
                              className="w-[50%]"
                            />
                          )}
                          <StyledText
                            className="text-xs font-bold mt-2"
                            text={`Slot ${slot.slotIndex + 1}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            } else {
              {
                /* Minifig Body Parts section */
              }
              return (
                <section
                  key={part.type}
                  className="text-center flex flex-col w-full justify-center items-center relative"
                >
                  {activeCharacter && (
                    <CTAButton
                      variant="ghost"
                      className="left-5 absolute hover:bg-gray-600 active:bg-gray-600 bg-gray-700 "
                      onClick={() => handlePartClick(part.type)}
                    >
                      <Plus size={22} strokeWidth={2.75} color="white" />
                    </CTAButton>
                  )}

                  {part.hasMinifigParts && (
                    <CTAButton
                      variant="ghost"
                      onClick={(e) => handleRemoveMinifigPart(e, part.type)}
                      className="absolute right-5 bg-red-700 rounded-md hover:bg-red-600 active:bg-red-600 "
                    >
                      <Trash2 size={22} color="white" />
                    </CTAButton>
                  )}

                  <div ref={minifigPartRef}>
                    <MinifigPart
                      key={part.currentImage}
                      type={part.type}
                      imageSrc={part.currentImage ?? ''}
                    />
                  </div>
                </section>
              );
            }
          })}
          <span className=" my-5 text-2xl font-bold flex gap-1">
            Total: <p className="text-green-700">{formatCurrency(totalPrice)}</p>
          </span>
        </section>
      </section>
    );
  },
);

MinifigRenderer.displayName = 'MinifigRenderer';
export default MinifigRenderer;
