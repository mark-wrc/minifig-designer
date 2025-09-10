// This file is no longer used due to changes in requirements

import { IMinifigProject, SelectedMinifigItems } from './Minifig';
import { IMinifigBodyResponse } from './MinifigBodyResponse';

export type IMinifigProjectPayloadResponse = {
  projects: IMinifigProject[];
} & IMinifigBodyResponse;

export type IMinifigProjectByIdResponse = {
  project: IMinifigProject;
} & IMinifigBodyResponse;

export type IDeleteMinifigProjectResponse = {
  _id: string;
  project: IMinifigProject;
} & IMinifigBodyResponse;

export type IMinifigProjectPayload = IMinifigProject;
export interface ICreateMinifigProjectPayload {
  name: string;
  selectedItems: SelectedMinifigItems;
}

export interface IMinifigProjectResponse {
  success: boolean;
  project: IMinifigProject;
}
