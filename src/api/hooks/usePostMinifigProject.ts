// This file is no longer used due to changes in requirements

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMinifigProjects } from '../minifigProject';
import { ICreateMinifigProjectPayload } from '@/types';

export const usePostMinifigProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateMinifigProjectPayload) => postMinifigProjects(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects'] });
    },
  });
};

export default usePostMinifigProject;
