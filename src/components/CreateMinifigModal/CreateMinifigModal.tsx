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
import { useDispatch } from 'react-redux';
import { createMinifigure, renameCharacter } from '@/store/minifigBuilder/minifigBuilderSlice';
import { cn } from '@/lib/utils';
import { CTAButton } from '../CTAButton';

const CreateMinifigModal = memo<ICreateMinifigModalProps>(
  ({ onClose, initialProjectName, mode, characterId, ...props }) => {
    const [projectName, setProjectName] = useState(initialProjectName);
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();

    // prefill input field
    useEffect(() => {
      setProjectName(initialProjectName);
    }, [initialProjectName]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (projectName?.trim()) {
          if (mode === 'create') {
            dispatch(createMinifigure(projectName.trim()));
          } else {
            dispatch(renameCharacter({ id: characterId!, name: projectName.trim() }));
          }
          setProjectName('');
          setShowError(false);
          onClose?.();
        } else {
          setShowError(true);
        }
      },
      [dispatch, projectName, mode, characterId, onClose],
    );

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
        if (showError && e.target.value) {
          setShowError(false);
        }
      },
      [showError],
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
                className={cn(
                  showError && 'border-red-500 focus:border-red-500 ',
                  'text-center py-6',
                )}
              />

              {showError && <p className="text-red-500 text-sm">Please enter a project name</p>}
            </section>

            <DialogFooter className="mt-4">
              <CTAButton
                variant="ghost"
                className=" cursor-pointer text-lg bg-yellow-400 hover:bg-yellow-500 translate-x-1 translate-y-1 text-black font-bold py-6 px-6 "
              >
                Save & Start Building
              </CTAButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
);

CreateMinifigModal.displayName = 'CreateMinifigModal';

export default CreateMinifigModal;
