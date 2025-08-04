import { IMinifigProject } from '@/types/Minifig';
import { useQuery } from '@tanstack/react-query';
import { fetchMinifigProjects } from '../minifigProject';

const useFetchMinifigProjects = () => {
  return useQuery<IMinifigProject[]>({
    queryKey: ['useFetchMinifigProjects'],
    queryFn: async () => {
      const response = await fetchMinifigProjects();
      return response.projects;
    },
  });
};

export default useFetchMinifigProjects;
