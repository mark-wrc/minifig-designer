// This file is no longer used due to changes in requirements

import { IMinifigProject } from '@/types/Minifig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMinifigProject } from '../minifigProject';

export const usePutMinifigProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IMinifigProject> }) =>
      updateMinifigProject(id, payload),

    // added a placehoder _data to avoid returning undefined
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects'] });

      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ['useMinifigProjectById', variables.id] });
      }
    },
  });
};

export default usePutMinifigProject;
