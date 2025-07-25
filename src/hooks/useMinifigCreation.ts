import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosureParam } from '@/hooks';
import { RootState } from '@/store';
import { setSelectedPart } from '@/store/minifigBuilder/minifigBuilderSlice';
import { MinifigPartData } from '@/types/Minifig';

export const useMinifigCreation = () => {
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const modalDisclosure = useDisclosureParam();
  const dispatch = useDispatch();

  const { characters = [], activeCharacterId = null } = useSelector(
    (state: RootState) => state.minifigBuilder,
  );

  const ActiveMinifigProject = characters.find((char) => char.id === activeCharacterId);

  const handleSelectMinifigItem = useCallback(
    (item: MinifigPartData) => {
      if (characters.length === 0) {
        modalDisclosure.onDisclosureOpen();
        setModalMode('create');
        return;
      }
      dispatch(setSelectedPart(item));
    },
    [characters.length, dispatch, modalDisclosure],
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
    characters,
  };
};
