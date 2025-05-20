import React, { memo, useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { ICreateMinifigModalProps } from './CreateMinifigModal.types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { createMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';

const CreateMinifigModal = memo<ICreateMinifigModalProps>(() => {
  const [projectName, setProjectName] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (projectName.trim()) {
        dispatch(createMinifigure(projectName.trim()));

        setProjectName('');
        setModalOpen(false);
      }
    },
    [dispatch, projectName],
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <Button className="cursor-pointer" onClick={() => setModalOpen(true)}>
        Add New Project
      </Button>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className=" font-black text-3xl">START YOUR BUILD</DialogTitle>
          </DialogHeader>

          <section className="flex flex-col justify-center items-center gap-4">
            <sub className="mb-4">Name your Project</sub>

            <Input
              id="username"
              placeholder="Project name e.g. Willy ong"
              required
              onChange={(e) => setProjectName(e.target.value)}
              autoFocus
            />
          </section>

          <DialogFooter>
            <Button className="cursor-pointer" type="submit" disabled={!projectName.trim()}>
              Save & Start Building
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

CreateMinifigModal.displayName = 'CreateMinifigModal';

export default CreateMinifigModal;
