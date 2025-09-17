import { RootState } from '@/store';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsList } from '../ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { deleteMinifigure, setActiveMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { cn } from '@/utils/cn';
import { useDisclosureParam } from '@/hooks';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { CTAButton } from '../CTAButton';
import { Divider } from '../Divider';
import { AnimatePresence, motion } from 'motion/react';
import { TabButtonAnimation, TabItemAnimation } from '@/animations';
import { MinifigTabContent } from '../MinifigTabContent';

const MinifigTabs = memo(() => {
  const { activeCharacterId, characters } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const removeProjectTab = useDisclosureParam();
  const openModal = useDisclosureParam();

  const dispatch = useDispatch();

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
      removeProjectTab.onDisclosureClose();
    }
  }, [dispatch, removeProjectTab, tabToDelete]);

  const handleTabSelect = useCallback(
    (id: string) => {
      dispatch(setActiveMinifigure(id));
    },
    [dispatch],
  );

  return (
    <section className="w-full py-4">
      <div className="flex items-center justify-end"></div>
      <Tabs value={activeCharacterId || ''} onValueChange={handleTabSelect} className="flex-1">
        <TabsList className="w-full h-full flex px-2 overflow-x-auto gap-2 flex-wrap">
          <AnimatePresence>
            {characters.map((proj, idx) => (
              <motion.div
                key={proj._id}
                variants={TabItemAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={idx}
                className="py-4 "
              >
                <TabsTrigger
                  className={cn(
                    'flex items-center p-3 w-fit relative group cursor-pointer text-left md:text-sm rounded-sm bg-yellow-300 shadow-md shadow-yellow-400/50  ',
                    activeCharacterId === proj._id &&
                      'bg-minifig-brand-end text-white shadow-lg shadow-minifig-brand-end/50',
                  )}
                  key={proj._id}
                  value={proj._id}
                >
                  {/* Tab Content  */}

                  <MinifigTabContent
                    key={proj._id}
                    character={proj}
                    onDelete={handleDeleteClick}
                  />
                </TabsTrigger>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsList>

        <Divider className="mt-2 mb-2 h-[10px] bg-gray-800 shadow-gray-900/50" />

        <motion.div
          variants={TabButtonAnimation}
          initial="initial"
          animate="enter"
          className="self-end"
        >
          <CTAButton
            variant="default"
            className="bg-yellow-300 cursor-pointer text-black font-bold hover:bg-yellow-400 active:bg-yellow-400  border-b-6 active:border-b-transparent border-b-transparent hover:border-t-transparent active:border-t-tr active:border-l-0 text-md p-6 borderborder-gray-950 border-t-6 border-l-8 border-l-yellow-600 border-t-yellow-400 shadow-lg shadow-yellow-500/40  hover:-translate-x-0.5 active:-translate-x-0.5 transition-all duration-75 hover:border-l-0"
            onClick={() => openModal.onDisclosureOpen()}
          >
            Add New Project
          </CTAButton>
        </motion.div>
      </Tabs>

      <CreateMinifigModal
        mode="create"
        isOpen={openModal.open}
        onClose={openModal.onDisclosureClose()}
      />

      {removeProjectTab.open && (
        <ConfirmationDialog
          open={removeProjectTab.open}
          className="md:w-fit"
          emoji={{ text: '⚠️', emojiStyles: 'text-[80px] text-center' }}
          descriptionContainerStyle="max-w-[300px] mx-auto p-0 text-md text-black"
          actionContainerStyles="self-center justify-center"
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
