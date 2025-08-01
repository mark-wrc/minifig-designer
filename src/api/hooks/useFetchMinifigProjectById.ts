import { useQuery } from '@tanstack/react-query';
import { fetchMinifigProjectById } from '../minifigProducts';
import { IMinifigProjectByIdResponse } from '@/types/Minifig';

export const useMinifigProjectById = (id: string) => {
  return useQuery<IMinifigProjectByIdResponse>({
    queryKey: ['useMinifigProjectById', id],
    queryFn: () => fetchMinifigProjectById(id),
    enabled: !!id,
  });
};

export default useMinifigProjectById;
