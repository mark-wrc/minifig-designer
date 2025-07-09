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
  const { characters = [], activeCharacterId = null } = useSelector(
    (state: RootState) => state.minifigBuilder || { characters: [], activeCharacterId: null },
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
    <div className=" w-full flex  flex-wrap py-4  border-b-2 border-b-black">
      <Tabs
        value={activeCharacterId || undefined}
        onValueChange={(value) => dispatch(setActiveMinifigure(value))}
        className="flex-1"
      >
        <TabsList className="w-full h-full flex gap-2  justify-baseline px-2 overflow-x-auto ">
          {characters.map((character) => (
            <TabsTrigger
              className={cn(
                'flex items-center gap-4 px-4 py-2 relative group cursor-pointer border-1',
                activeCharacterId === character.id && 'bg-gray-300',
              )}
              key={character.id}
              value={character.id}
            >
              <div className=" flex flex-row justify-center items-center">
                <span className="mr-6">{character.name}</span>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 cursor-pointer"
                  onClick={(e) => handleDeleteCharacter(character.id, e)}
                >
                  <X className=" h-3 w-3" />
                </Button>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Button
        className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 font-bold"
        onClick={() => setShowModal(true)}
      >
        Create New Project
      </Button>

      {showModal && <CreateMinifigModal mode="create" onClose={() => setShowModal(false)} />}
    </div>
  );
});

MinifigTabs.displayName = 'MinifigTabs';

export default MinifigTabs;
