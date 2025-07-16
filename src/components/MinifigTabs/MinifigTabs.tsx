import { RootState } from '@/store';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsList } from '../ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { deleteMinifigure, setActiveMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDisclosureParam } from '@/hooks';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { CTAButton } from '../CTAButton';
import { Divider } from '../Divider';

const MinifigTabs = memo(() => {
  const { characters = [], activeCharacterId = null } = useSelector(
    (state: RootState) => state.minifigBuilder || { characters: [], activeCharacterId: null },
  );

  const removeProjectTab = useDisclosureParam();

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [tabToDelete, setTabToDelete] = useState<string | null>(null);

  const handleDeleteClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setTabToDelete(id);
      removeProjectTab.onDisclosureOpen();
    },
    [removeProjectTab],
  );

  const handleDeleteConfirm = useCallback(() => {
    if (tabToDelete) {
      dispatch(deleteMinifigure(tabToDelete));
      setTabToDelete(null);
    }
  }, [dispatch, tabToDelete]);

  return (
    <section className=" w-full py-4">
      <div className="flex items-center justify-end"></div>
      <Tabs
        value={activeCharacterId || undefined}
        onValueChange={(value) => dispatch(setActiveMinifigure(value))}
        className="flex-1"
      >
        <TabsList className="w-full h-full flex gap-2 justify-baseline px-2 overflow-x-auto flex-wrap">
          {characters.map((character) => (
            <TabsTrigger
              className={cn(
                'flex items-center gap- p-3 w-fit relative group cursor-pointer text-left rounded-sm font-semibold bg-white',
                activeCharacterId === character.id && 'bg-yellow-500 border-1  border-black/30',
              )}
              key={character.id}
              value={character.id}
            >
              <div className=" flex justify-between gap-6 w-full items-center">
                <CTAButton
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 cursor-pointer  hover:bg-red-500 rounded-full hover:text-white font-bold"
                  onClick={(e) => handleDeleteClick(character.id, e)}
                >
                  <X className="h-3 w-3 " />
                </CTAButton>
                <span className="">{character.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <Divider className="mt-4 h-[2px]" />

        <CTAButton
          className="bg-yellow-500 border-1 border-black/30 cursor-pointer self-end  text-xl p-6 hover:bg-yellow-600 font-bold"
          onClick={() => setShowModal(true)}
        >
          Create New Project
        </CTAButton>
      </Tabs>

      {showModal && <CreateMinifigModal mode="create" onClose={() => setShowModal(false)} />}

      {removeProjectTab.open && (
        <ConfirmationDialog
          open={removeProjectTab.open}
          className="md:w-fit"
          emoji={{ text: '⚠️', emojiStyles: 'text-[80px] text-center' }}
          descriptionContainerStyle="max-w-[300px] mx-auto p-0 text-md text-black"
          actionContainerStyles="self-center  justify-center"
          description="Are your sure that you'd like to remove this project"
          onConfirm={removeProjectTab.onDisclosureClose(handleDeleteConfirm)}
          onClose={removeProjectTab.onDisclosureClose()}
        />
      )}
    </section>
  );
});

MinifigTabs.displayName = 'MinifigTabs';

export default MinifigTabs;
