import { IMinifigProject } from '@/types/Minifig';
import axios from './axios';
import qs from 'qs';
import {
  IDeleteMinifigProjectResponse,
  IMinifigProjectByIdResponse,
  IMinifigProjectPayload,
  IMinifigProjectPayloadResponse,
} from '@/types';

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

export const deleteMinifigProject = async (id: string): Promise<IDeleteMinifigProjectResponse> => {
  const { data } = await axios.delete(`api/v1/me/minifig-projects/${id}`);
  return data;
};
