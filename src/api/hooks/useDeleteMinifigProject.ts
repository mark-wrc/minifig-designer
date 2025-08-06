import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMinifigProject } from '../minifigProject';
import { IDeleteMinifigProjectResponse } from '@/types';
import { setActiveMinifigure } from '@/store/minifigBuilder/minifigBuilderSlice';
import { useDispatch } from 'react-redux';

export const useDeleteMinifigProject = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<IDeleteMinifigProjectResponse, Error, string>({
    mutationFn: async (projectId: string) => {
      const response = await deleteMinifigProject(projectId);
      return response;
    },
    onSuccess: (data, projectId) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects'] });

        queryClient.removeQueries({ queryKey: ['useMinifigProjectById', projectId] });

        dispatch(setActiveMinifigure(null));
      }
    },
  });
};

export default useDeleteMinifigProject;
