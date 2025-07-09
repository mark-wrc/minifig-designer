import { memo, useCallback, useState } from 'react';
import { MinifigPartType } from '@/types/MinifigActions';
import { cn } from '@/lib/utils';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, removePart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { RootState } from '@/store';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

interface MinifigPartProps {
  type: MinifigPartType;
  image?: string;
  className?: string;
  totalImages?: number;
  title?: string;
}

const MinifigPart = memo<MinifigPartProps>(({ type, image, className, totalImages }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { characters } = useSelector((state: RootState) => state.minifigBuilder);

  const handlePartClick = useCallback(() => {
    if (characters.length === 0) {
      setShowModal(true);

      return;
    }

    dispatch(setSelectedCategory(type));
  }, [characters.length, dispatch, type]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleRemoveMinifigPart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(removePart(type));
    },
    [dispatch, type],
  );

  return (
    <div className="flex justify-center ">
      <div className={cn('flex gap-4 items-center w-full lg:w-1/2 ', className)}>
        {(totalImages ?? 0) > 0 && (
          <Button className="cursor-pointer" onClick={handlePartClick}>
            <Plus size={32} />
          </Button>
        )}

        <figure>
          {image && <img src={image} alt={type.toLowerCase()} className="object-contain" />}
        </figure>

        {characters.length > 0 && image && image !== BaseMinifigParts[type].image && (
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemoveMinifigPart}
            className="h-10 w-10"
          >
            <Trash2 size={20} />
          </Button>
        )}
      </div>

      {showModal && <CreateMinifigModal mode="create" onClose={handleCloseModal} />}
    </div>
  );
});

MinifigPart.displayName = 'MinifigPart';

export default MinifigPart;
