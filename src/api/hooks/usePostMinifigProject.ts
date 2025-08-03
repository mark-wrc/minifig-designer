import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMinifigProjects } from '../minifigProject';
import { IMinifigProjectPayload } from '@/types';

export const usePostMinifigProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IMinifigProjectPayload) => postMinifigProjects(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useFetchMinifigProjects'] });
    },
  });
};

export default usePostMinifigProject;
