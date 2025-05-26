import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { ICreateMinifigModalProps } from './CreateMinifigModal.types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { createMinifigure, renameCharacter } from '@/store/minifigBuilder/minifigBuilderSlice';
import { cn } from '@/lib/utils';

const CreateMinifigModal = memo<ICreateMinifigModalProps>(
  ({ onClose, initialProjectName, mode, characterId }) => {
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
      <Dialog open={true} onOpenChange={() => onClose?.()}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle className=" font-black text-3xl">START YOUR BUILD</DialogTitle>
            </DialogHeader>

            <section className="flex flex-col justify-center items-center gap-4">
              <sub className="my-4">
                {mode === 'create' ? 'Name your Project' : 'Enter new name'}
              </sub>

              <Input
                id="username"
                value={projectName}
                placeholder="Project name e.g. Willy ong"
                onChange={handleInputChange}
                autoFocus
                className={cn(showError && 'border-red-500 focus:border-red-500', 'text-center')}
              />

              {showError && <p className="text-red-500 text-sm">Please enter a project name</p>}
            </section>

            <DialogFooter className="mt-4">
              <Button className="cursor-pointer" type="submit">
                Save & Start Building
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
);

CreateMinifigModal.displayName = 'CreateMinifigModal';

export default CreateMinifigModal;
