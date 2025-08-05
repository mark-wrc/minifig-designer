import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ICreateMinifigModalProps } from './CreateMinifigModal.types';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { CTAButton } from '../CTAButton';
import useFetchMinifigProjects from '@/api/hooks/useFetchMinifigProjects';
import { usePostMinifigProject, usePutMinifigProject } from '@/api/hooks';
import { useMutationHandlers, useProjectValidation } from '@/hooks';
import { useDispatch } from 'react-redux';
import { setActiveMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';
import { ICreateMinifigProjectPayload } from '@/types';

const CreateMinifigModal = memo<ICreateMinifigModalProps>(
  ({ onClose, initialProjectName, mode, characterId, ...props }) => {
    const [projectName, setProjectName] = useState(initialProjectName);
    const [error, setError] = useState<string | undefined>();
    const dispatch = useDispatch();

    const { data: characters, refetch: refetchProjects } = useFetchMinifigProjects();
    const { mutate: createProject, isPending: isCreating } = usePostMinifigProject();
    const { mutate: updateProject } = usePutMinifigProject();

    const { handleSuccess, handleError } = useMutationHandlers({
      setProjectName,
      setError,
      onClose,
    });

    const { validateProject } = useProjectValidation({
      characters,
      characterId,
      setError,
    });

    // prefill input field
    useEffect(() => {
      setProjectName(initialProjectName);
    }, [initialProjectName]);

    const createNewProject = useCallback(() => {
      const payload: ICreateMinifigProjectPayload = {
        name: projectName!.trim(),
        selectedItems: {
          head: undefined,
          torso: undefined,
          leg: undefined,
        },
      };

      createProject(payload, {
        onSuccess: (response) => {
          if (response.success && response.project) {
            // Refetch projects first, then set the active character
            refetchProjects().then(() => {
              dispatch(setActiveMinifigure(response.project._id));
            });
            handleSuccess();
          }
          onClose?.();
        },
        onError: () => handleError('Failed to create project'),
      });
    }, [
      projectName,
      createProject,
      onClose,
      refetchProjects,
      handleSuccess,
      dispatch,
      handleError,
    ]);
    // update project name
    const updateExistingProject = useCallback(() => {
      updateProject(
        {
          id: characterId!,
          payload: { name: projectName!.trim() },
        },
        {
          onSuccess: handleSuccess,
          onError: () => handleError('Failed to update project name'),
        },
      );
    }, [characterId, projectName, updateProject, handleSuccess, handleError]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateProject(projectName ?? '', mode === 'edit')) {
          return;
        }

        return mode === 'create' ? createNewProject() : updateExistingProject();
      },
      [mode, projectName, validateProject, createNewProject, updateExistingProject],
    );

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
        if (error && e.target.value) {
          setError(undefined);
        }
      },
      [error],
    );

    return (
      <Dialog open={true} onOpenChange={() => onClose?.()} {...props}>
        <DialogContent className="p-12">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle className=" font-black text-3xl">START YOUR BUILD</DialogTitle>

              <DialogDescription className="my-4 text-lg">
                {mode === 'create' ? 'Name your Project' : 'Enter new project name  '}
              </DialogDescription>
            </DialogHeader>

            <section className="flex flex-col justify-center items-center gap-4">
              <Input
                id="username"
                value={projectName}
                placeholder="Project name e.g. My Minifig Project"
                onChange={handleInputChange}
                autoFocus
                className={cn(error && 'border-red-500 focus:border-red-500 ', 'text-center py-6')}
              />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </section>

            <DialogFooter className="mt-4">
              <CTAButton
                isLoading={isCreating}
                title="   Save & Start Building"
                variant="ghost"
                className=" cursor-pointer text-lg bg-yellow-400 hover:bg-yellow-500 translate-x-1 translate-y-1 text-black font-bold py-6 px-6 "
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
);

CreateMinifigModal.displayName = 'CreateMinifigModal';

export default CreateMinifigModal;
