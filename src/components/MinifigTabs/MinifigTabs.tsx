import { RootState } from '@/store';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsList } from '../ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { setActiveMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';
import { CreateMinifigModal } from '../CreateMinifigModal';
import { cn } from '@/lib/utils';
import { useDisclosureParam } from '@/hooks';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { CTAButton } from '../CTAButton';
import { Divider } from '../Divider';
import { AnimatePresence, motion } from 'motion/react';
import { TabButtonAnimation, TabItemAnimation } from '@/animations';
import { MinifigTabContent } from '../MinifigTabContent';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';
import { useDeleteMinifigProject } from '@/api/hooks';

const MinifigTabs = memo(() => {
  const { activeCharacterId = null } = useSelector(
    (state: RootState) => state.minifigBuilder || { characters: [], activeCharacterId: null },
  );

  const { data: projects = [] } = useFetchMinifigProjects();
  const { mutate: deleteProject } = useDeleteMinifigProject();
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
      deleteProject(tabToDelete, {
        onSuccess: (res) => {
          if (res.success) {
            setTabToDelete(null);
            removeProjectTab.onDisclosureClose();

            if (activeCharacterId === res.project.id) {
              dispatch(setActiveMinifigure(''));
            }
          }
        },
      });
    }
  }, [activeCharacterId, deleteProject, dispatch, removeProjectTab, tabToDelete]);

  return (
    <section className="w-full py-4">
      <div className="flex items-center justify-end"></div>
      <Tabs
        value={activeCharacterId || undefined}
        onValueChange={(value) => dispatch(setActiveMinifigure(value))}
        className="flex-1"
      >
        <TabsList className="w-full h-full flex px-2 overflow-x-auto gap-2 flex-wrap">
          <AnimatePresence>
            {projects.map((character, idx) => (
              <motion.div
                key={character.id}
                variants={TabItemAnimation}
                initial="initial"
                animate="enter"
                exit="exit"
                custom={idx}
              >
                <TabsTrigger
                  className={cn(
                    'flex items-center p-3 w-fit relative group cursor-pointer text-left md:text-sm rounded-sm font-semibold bg-yellow-500 overflow-y-hidden',
                    activeCharacterId === character.id &&
                      ' bg-minifig-brand-end  transition-all duration-300 text-white',
                  )}
                  key={character.id}
                  value={character.id}
                >
                  {/* Tab Content  */}
                  <MinifigTabContent character={character} onDelete={handleDeleteClick} />
                </TabsTrigger>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsList>

        <Divider className="mt-2 mb-2 h-[5px] bg-gray-950 rounded-full" />

        <motion.div
          variants={TabButtonAnimation}
          initial="initial"
          animate="enter"
          className="self-end"
        >
          <CTAButton
            variant="default"
            className="bg-yellow-300 cursor-pointer text-black hover:text-white hover:bg-minifig-brand-end text-md p-6 borderborder-gray-950"
            onClick={() => setShowModal(true)}
          >
            Add New Project
          </CTAButton>
        </motion.div>
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
