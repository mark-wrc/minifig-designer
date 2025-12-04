import { MinifigPartData } from '@/types/Minifig';
import axios from './axios';
import qs from 'qs';
import { MinifigPartType } from '@/types';

export interface MinifigProductsResponse {
  data: MinifigPartData[];
  message: string;
  products: MinifigPartData[];
  allProducts: MinifigPartData[];
  resPerPage: number;
  filteredProductCount: number;
  totalPages: number;
  currentPage: number;
}
interface MinifigProductsParams {
  minifig_part_type?: MinifigPartType;
  page?: number;
}

export const fetchMinifigProducts = async (
  params: MinifigProductsParams,
): Promise<MinifigProductsResponse> => {
  const { data } = await axios.get('/products', {
    params,
    paramsSerializer: (params) => qs.stringify(params),
  });
  console.log('fetchMinifigProducts: ', data);
  return data;
};

export const fetchAllMinifigProducts = async () => {
  const { data } = await axios.get('/products');
  console.log('FetchAllMinifigProducts:', data);
  return data;
};
