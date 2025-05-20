import { Product } from '@/types/Products';
import { axiosInstance } from '../axios';

interface ApiResponse {
  message: string;
  products: Product;
  similarProducts: Product[];
}

export const fetchMinifigProducts = (): Promise<ApiResponse> => {
  return axiosInstance.get('/products').then(({ data }) => data); // Remove the extra query string
};
