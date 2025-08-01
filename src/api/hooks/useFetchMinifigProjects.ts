import { IMinifigProject } from '@/types/Minifig';
import { useQuery } from '@tanstack/react-query';
import { fetchMinifigProjects } from '../minifigProducts';

const useFetchMinifigProjects = () => {
  return useQuery<IMinifigProject[]>({
    queryKey: ['minifig-projects'],
    queryFn: async () => {
      const response = await fetchMinifigProjects();
      return response.data;
    },
  });
};

export default useFetchMinifigProjects;
