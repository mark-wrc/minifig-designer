import { MinifigPartData } from '@/types/Minifig';
import axios from './axios';
import qs from 'qs';
import { MinifigPartType } from '@/types';

interface MinifigProductsResponse {
  data: MinifigPartData[];
  message: string;
  products: MinifigPartData[];
  allProducts: MinifigPartData[];
}

interface MinifigProductsParams {
  minifig_part_type?: MinifigPartType;
}
export const fetchMinifigProducts = async (
  params: MinifigProductsParams,
): Promise<MinifigProductsResponse> => {
  const { data } = await axios.get('/products', {
    params,
    paramsSerializer: (params) => qs.stringify(params),
  });
  return data;
};

export const fetchAllMinifigProducts = async () => {
  const { data } = await axios.get('/products');
  return data;
};
