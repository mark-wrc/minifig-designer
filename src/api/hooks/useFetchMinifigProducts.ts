import { useQuery } from '@tanstack/react-query';
import { MinifigPartType } from '@/types';
import { fetchMinifigProducts, MinifigProductsResponse } from '../minifigProducts';

interface IFetchMinifigProductsParams {
  minifig_part_type?: MinifigPartType;
  page?: number;
}

export const useFetchMinifigProducts = (params: IFetchMinifigProductsParams) => {
  return useQuery<MinifigProductsResponse>({
    queryKey: ['useFetchMinifigProducts', params.minifig_part_type, params.page],
    queryFn: async () => {
      const response = await fetchMinifigProducts(params);
      return response;
    },
    enabled: !!params.minifig_part_type,
  });
};

export default useFetchMinifigProducts;
