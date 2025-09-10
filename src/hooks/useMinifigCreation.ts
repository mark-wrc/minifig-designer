import { useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosureParam } from '@/hooks';
import type { RootState } from '@/store';
import { addCharacter, setSelectedPart } from '@/store/minifigBuilder/minifigBuilderSlice';
import type { MinifigPartData, SelectedMinifigItems } from '@/types/Minifig';
import { createEmptyMinifigProject } from '@/utils';
import { DEFAULT_PART_TYPE, SUB_COLLECTION_TO_PART_TYPE } from '@/constants/MinifigMapping';

{
  /* This hook manages the logic for creating, editing, and updating a minifig character */
}

export const useMinifigCreation = () => {
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const modalDisclosure = useDisclosureParam();

  const dispatch = useDispatch();
  const { characters, activeCharacterId } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const activeMinifigProject = characters.find((proj) => proj._id === activeCharacterId);

  const activeCharacter = useMemo(
    () => characters.find((c) => c._id === activeCharacterId) || null,
    [characters, activeCharacterId],
  );

  // Select a new lego piece

  const handleSelectMinifigItem = useCallback(
    (item: MinifigPartData, slotIndex?: number) => {
      if (!activeCharacter) {
        const newChar = createEmptyMinifigProject('New Minifig');
        dispatch(addCharacter(newChar.name));
        modalDisclosure.onDisclosureOpen();
        setModalMode('edit');
        return;
      }

      let partType: keyof SelectedMinifigItems = DEFAULT_PART_TYPE;

      if (item.minifig_part_type) {
        partType = item.minifig_part_type.toLowerCase() as keyof SelectedMinifigItems;
      } else if (item.product_sub_collections?.length) {
        const subCollectionName = item.product_sub_collections[0]?.name ?? '';
        partType = SUB_COLLECTION_TO_PART_TYPE[subCollectionName] ?? DEFAULT_PART_TYPE;
      }

      dispatch(
        setSelectedPart({
          minifig_part_type: partType,
          image: item.product_images?.[0]?.url ?? '',
          data: item,
          slotIndex,
        }),
      );
    },
    [activeCharacter, dispatch, modalDisclosure],
  );

  const handleCreateCharacter = useCallback(
    (name: string) => {
      dispatch(addCharacter(name));
      setModalMode('create');
      modalDisclosure.onDisclosureClose();
    },
    [dispatch, modalDisclosure],
  );

  const handleCloseModal = useCallback(() => {
    const closeModal = modalDisclosure.onDisclosureClose();
    closeModal();
  }, [modalDisclosure]);

  return {
    modalMode,
    setModalMode,
    modalDisclosure,
    activeCharacter,
    handleSelectMinifigItem,
    handleCreateCharacter,
    handleCloseModal,
    activeMinifigProject,
    characters,
  };
};
