// This file is no longer used due to changes in requirements

import { IMinifigProject } from '@/types/Minifig';
import axios from './axios';

import {
  ICreateMinifigProjectPayload,
  IDeleteMinifigProjectResponse,
  IMinifigProjectByIdResponse,
  IMinifigProjectPayloadResponse,
  IMinifigProjectResponse,
} from '@/types';

export const fetchMinifigProjects = (): Promise<IMinifigProjectPayloadResponse> =>
  axios.get('/me/minifig-projects').then((res) => res.data);

export const fetchMinifigProjectById = async (
  id: string,
): Promise<IMinifigProjectByIdResponse> => {
  const { data } = await axios.get(`/me/minifig-projects/${id}`);
  return data;
};

export const updateMinifigProject = async (id: string, payload: Partial<IMinifigProject>) => {
  const { data } = await axios.put(`/me/minifig-projects/${id}`, payload);
  return data;
};

export const postMinifigProjects = (
  payload: ICreateMinifigProjectPayload,
): Promise<IMinifigProjectResponse> =>
  axios.post('/me/minifig-projects', payload).then((res) => res.data);

export const deleteMinifigProject = async (
  projectId: string,
): Promise<IDeleteMinifigProjectResponse> => {
  const { data } = await axios.delete(`/me/minifig-projects/${projectId}`);
  return data;
};
