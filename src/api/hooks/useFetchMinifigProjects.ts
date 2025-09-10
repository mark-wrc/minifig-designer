// This file is no longer used due to changes in requirements

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
    refetchOnWindowFocus: false,
  });
};

export default useFetchMinifigProjects;
