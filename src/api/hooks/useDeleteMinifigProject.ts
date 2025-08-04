import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMinifigProject } from '../minifigProject';
import { IDeleteMinifigProjectResponse } from '@/types';

export const useDeleteMinifigProject = () => {
  const queryClient = useQueryClient();

  return useMutation<IDeleteMinifigProjectResponse, Error, string>({
    mutationFn: async (projectId: string) => {
      const response = await deleteMinifigProject(projectId);
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects'] });
      }
    },
  });
};

export default useDeleteMinifigProject;
