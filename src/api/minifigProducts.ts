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
  const source = data.allProducts ?? data.products;

  const filtered = source.filter(
    (product: { product_images?: { is_minifig_builder?: boolean }[] }) =>
      product.product_images?.some((img) => img.is_minifig_builder === true),
  );

  console.log('Minifig Product Params:', data);
  return filtered;
};

// export const fetchMinifigProducts = async (
//   params: MinifigProductsParams,
// ): Promise<MinifigProductsResponse> => {
//   const { data } = await axios.get('/products', {
//     params,
//     paramsSerializer: (params) => qs.stringify(params),
//   });

//   type Image = {
//     is_minifig_builder?: boolean;
//   };

//   type Product = {
//     product_images?: Image[];
//   };

//   // Filter products — only keep ones with a flagged image
//   const filtered = (data.products as Product[]).filter((product) =>
//     product.product_images?.some((img) => img.is_minifig_builder === true),
//   );

//   return {
//     ...data,
//     products: filtered,
//     filteredProductCount: filtered.length,
//     totalPages: Math.ceil(filtered.length / data.resPerPage),
//   };
// };

export const fetchAllMinifigProducts = async () => {
  const { data } = await axios.get('/products');
  console.log('Data::', data);
  return data;
};
// export const fetchAllMinifigProducts = async () => {
//   const { data } = await axios.get('/products');

//   const filtered = data.products.filter(
//     (product: { product_images?: { is_minifig_builder?: boolean }[] }) =>
//       product.product_images?.some((img) => img.is_minifig_builder === true),
//   );

//   return {
//     ...data,
//     products: filtered,
//     filteredProductCount: filtered.length,
//   };
// };
