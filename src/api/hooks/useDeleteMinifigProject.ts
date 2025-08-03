import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMinifigProject } from '../minifigProject';
import { IDeleteMinifigProjectResponse } from '@/types';

export const useDeleteMinifigProject = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteMinifigProjectResponse, Error, string>({
    mutationFn: deleteMinifigProject,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProducts'] });
      }
    },
  });
};

export default useDeleteMinifigProject;
