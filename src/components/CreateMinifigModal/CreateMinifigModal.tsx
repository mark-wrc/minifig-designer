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
import { useProjectValidation } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { addCharacter, renameCharacter } from '@/store/minifigBuilder/minifigBuilderSlice';
import { RootState } from '@/store';

const CreateMinifigModal = memo<ICreateMinifigModalProps>(
  ({ onClose, initialProjectName, mode, characterId, isOpen, ...props }) => {
    const [projectName, setProjectName] = useState(initialProjectName);
    const [error, setError] = useState<string | undefined>();
    const dispatch = useDispatch();
    const characters = useSelector((state: RootState) => state.minifigBuilder.characters);

    useEffect(() => {
      if (isOpen && mode === 'create') {
        setProjectName('');
      } else {
        setProjectName(initialProjectName);
      }
    }, [initialProjectName, isOpen, mode]);

    const { validateProject } = useProjectValidation({
      characters,
      characterId,
      setError,
    });

    const createNewProject = useCallback(() => {
      dispatch(addCharacter(projectName?.trim() as string));
      onClose?.();
    }, [projectName, dispatch, onClose]);

    const updateExistingProject = useCallback(() => {
      dispatch(renameCharacter({ id: characterId!, name: projectName?.trim() as string }));
      onClose?.();
    }, [characterId, projectName, dispatch, onClose]);

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
      <Dialog open={isOpen} onOpenChange={() => onClose?.()} {...props}>
        <DialogContent className="p-12">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle className=" font-black text-3xl">START YOUR BUILD</DialogTitle>
              <DialogDescription className="my-4 text-lg">
                {mode === 'create' ? 'Name your Project' : 'Enter new project name'}
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
                title=" Save & Start Building"
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
