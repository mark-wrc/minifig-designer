import { IMinifigProjectPayload } from '@/types/Minifig';
import { postMinifigProjects } from '../minifigProducts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
