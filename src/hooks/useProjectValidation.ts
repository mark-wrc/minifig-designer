import { useCallback } from 'react';
import { IMinifigProject } from '@/types/Minifig';
import { validateMinifigProjectName } from '@/utils';

interface ProjectValidationProps {
  characters: IMinifigProject[] | undefined;
  characterId: string | undefined;
  setError: (error: string | undefined) => void;
}

export const useProjectValidation = ({
  characters,
  characterId,
  setError,
}: ProjectValidationProps) => {
  const validateProject = useCallback(
    (projectName: string, isEdit: boolean) => {
      const validation = validateMinifigProjectName({
        newProjectName: projectName,
        existingProjects: isEdit
          ? (characters?.filter((c) => c._id !== characterId) ?? [])
          : (characters ?? []),
      });

      if (!validation.isValid) {
        setError(validation.error);
        return false;
      }

      return true;
    },
    [characters, characterId, setError],
  );

  return { validateProject };
};
