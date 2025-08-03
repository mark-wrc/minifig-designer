import { useQuery } from '@tanstack/react-query';
import { fetchMinifigProjectById } from '../minifigProject';
import { IMinifigProjectByIdResponse } from '@/types';

export const useMinifigProjectById = (id: string) => {
  return useQuery<IMinifigProjectByIdResponse>({
    queryKey: ['useMinifigProjectById', id],
    queryFn: () => fetchMinifigProjectById(id),
    enabled: !!id,
  });
};

export default useMinifigProjectById;
