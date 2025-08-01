import { useQuery } from '@tanstack/react-query';
import { MinifigPartType } from '@/types';
import { MinifigPartData } from '@/types/Minifig';
import { fetchMinifigProducts } from '../minifigProducts';

interface IFetchMinifigProductsParams {
  minifig_part_type?: MinifigPartType;
}

export const useFetchMinifigProducts = (params: IFetchMinifigProductsParams) => {
  return useQuery<MinifigPartData[]>({
    queryKey: ['useFetchMinifigProducts', params.minifig_part_type],
    queryFn: async () => {
      const response = await fetchMinifigProducts(params);
      return response.data.map((item) => ({ ...item }));
    },
    enabled: !!params.minifig_part_type,
  });
};

export default useFetchMinifigProducts;
