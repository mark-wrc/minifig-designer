import { RootState } from '@/store';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsList } from '../ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from '../ui/button';
import { deleteMinifigure, setActiveMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const MinifigTabs = memo(() => {
  const { characters, activeCharacterId } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleDeleteCharacter = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(deleteMinifigure(id));
    },
    [dispatch],
  );

  return (
    <div className=" w-full flex py-4">
      <Tabs
        value={activeCharacterId || undefined}
        onValueChange={(value) => dispatch(setActiveMinifigure(value))}
        className="flex-1"
      >
        <TabsList className="w-full h-full flex overflow-x-auto ">
          {characters.map((character) => (
            <TabsTrigger
              className={cn(
                'flex items-center justify-between px-4 py-2 relative group cursor-pointer',
                activeCharacterId === character.id && 'bg-gray-300',
              )}
              key={character.id}
              value={character.id}
            >
              <span className="mr-6">{character.name}</span>

              <div className="">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-destructive"
                  onClick={(e) => handleDeleteCharacter(character.id, e)}
                >
                  <X className=" h-3 w-3" />
                </Button>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Button className=" cursor-pointer" onClick={() => setShowModal(true)}>
        Create New Project
      </Button>

      {showModal && <CreateMinifigModal mode="create" onClose={() => setShowModal(false)} />}
    </div>
  );
});

MinifigTabs.displayName = 'MinifigTabs';

export default MinifigTabs;
