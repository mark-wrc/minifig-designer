import {
  IMinifigProject,
  IMinifigProjectByIdResponse,
  IMinifigProjectPayload,
  IMinifigProjectPayloadResponse,
  MinifigPartData,
} from '@/types/Minifig';
import axios from './axios';
import qs from 'qs';
import { MinifigPartType } from '@/types';

interface MinifigProductsResponse {
  data: MinifigPartData[];
  message: string;
}

interface MinifigProductsParams {
  minifig_part_type?: MinifigPartType;
}
export const fetchMinifigProducts = async (
  params: MinifigProductsParams,
): Promise<MinifigProductsResponse> => {
  const { data } = await axios.get('api/v1/products', {
    params,
    paramsSerializer: (params) => qs.stringify(params),
  });
  return data;
};

//Minifig Project(character creation)
export const fetchMinifigProjects = (): Promise<IMinifigProjectPayloadResponse> =>
  axios.get('api/v1/me/minifig-projects').then((res) => res.data);

export const fetchMinifigProjectById = async (
  id: string,
): Promise<IMinifigProjectByIdResponse> => {
  const { data } = await axios.get(`api/v1/me/minifig-projects/${id}`);
  return data;
};

export const updateMinifigProject = async (id: string, payload: Partial<IMinifigProject>) => {
  const { data } = await axios.put(`api/v1/me/minifig-projects/${id}`, payload);
  return data;
};
export const postMinifigProjects = (
  payload: IMinifigProjectPayload,
): Promise<IMinifigProjectPayloadResponse> =>
  axios.post(`api/v1/me/minifig-projects/${qs.stringify(payload)}`).then((res) => res.data);
