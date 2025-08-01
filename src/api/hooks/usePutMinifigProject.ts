import { IMinifigProject } from '@/types/Minifig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMinifigProject } from '../minifigProducts';

export const usePutMinifigProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IMinifigProject> }) =>
      updateMinifigProject(id, payload),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProducts'] });
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProducts', variables.id] });
    },
  });
};

export default usePutMinifigProject;
