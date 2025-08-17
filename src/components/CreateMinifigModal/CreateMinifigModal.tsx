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
import { MAX_PROJECT_NAME_LENGTH } from '@/constants/Minifig';

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
        const value = e.target.value.slice(0, MAX_PROJECT_NAME_LENGTH); // Limit input length
        setProjectName(value);
        if (error && value) {
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
                maxLength={MAX_PROJECT_NAME_LENGTH}
                autoFocus
                className={cn(error && 'border-red-500 focus:border-red-500 ', 'text-center py-6')}
              />
              <div className="flex flex-col items-center gap-1">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <small className="text-black font-bold text-lg">
                  {projectName?.length || 0}/{MAX_PROJECT_NAME_LENGTH} characters
                </small>
              </div>
            </section>
            <DialogFooter className="mt-4 ">
              <CTAButton
                title=" Save & Start Building"
                variant="ghost"
                className=" cursor-pointer text-lg bg-yellow-300 hover:shadow-md hover:bg-yellow-400 border-b-6 border-b-transparent  active:bg-yellow-400 hover:border-l-0 transition-all duration-75 active:border-l-0 border-l-8 border-t-8 border-l-yellow-600 border-t-yellow-400 shadow-lg shadow-yellow-500/40  text-black font-bold py-6 px-6 "
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
