import { IMinifigProject } from '@/types/Minifig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMinifigProject } from '../minifigProject';

export const usePutMinifigProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IMinifigProject> }) =>
      updateMinifigProject(id, payload),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects'] });
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects', variables.id] });
    },
  });
};

export default usePutMinifigProject;
