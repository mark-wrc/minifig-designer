import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDisclosureParam } from '@/hooks';
import { RootState } from '@/store';

import { MinifigPartData } from '@/types/Minifig';
import { usePutMinifigProject } from '@/api/hooks';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';

export const useMinifigCreation = () => {
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const modalDisclosure = useDisclosureParam();
  // const debouncedRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const { data: projects = [] } = useFetchMinifigProjects();
  const { activeCharacterId } = useSelector((state: RootState) => state.minifigBuilder);
  const { mutate: updateProject } = usePutMinifigProject();

  const ActiveMinifigProject = projects.find((proj) => proj._id === activeCharacterId);

  // const updateProjectWithDebounce = useCallback(
  //   (id: string, selectedItems: Record<string, MinifigPartData>) => {
  //     if (debouncedRef.current) {
  //       clearTimeout(debouncedRef.current);
  //     }

  //     debouncedRef.current = setTimeout(() => {
  //       updateProject({
  //         id,
  //         payload: { selectedItems },
  //       });
  //     }, 1000);
  //   },
  //   [updateProject],
  // );

  const handleSelectMinifigItem = useCallback(
    (item: MinifigPartData) => {
      if (projects.length === 0) {
        modalDisclosure.onDisclosureOpen();
        setModalMode('create');
        return;
      }
      if (ActiveMinifigProject) {
        const formattedItem = {
          id: item._id,
          type: item.minifig_part_type,
          name: item.product_name,
          description: item.product_description_1,

          image:
            item.product_images && item.product_images.length > 0
              ? item.product_images[0].url
              : undefined,
          price: item.price,
          stock: item.stock,
          product_color: item.product_color.name,
        };

        const updatedItems = {
          ...ActiveMinifigProject.selectedItems,
          [item.minifig_part_type.toLowerCase()]: formattedItem, // Assign the formatted item
        };
        updateProject({
          id: ActiveMinifigProject._id,
          payload: { selectedItems: updatedItems },
        });
      }
    },
    [projects.length, ActiveMinifigProject, modalDisclosure, updateProject],
  );

  const handleCloseModal = useCallback(() => {
    const closeModal = modalDisclosure.onDisclosureClose();
    closeModal();
    setModalMode('create');
  }, [modalDisclosure]);

  return {
    modalMode,
    setModalMode,
    modalDisclosure,
    ActiveMinifigProject,
    handleSelectMinifigItem,
    handleCloseModal,
    projects,
  };
};
