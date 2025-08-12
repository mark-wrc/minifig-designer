import { IMinifigProject, MinifigPartData } from './Minifig';
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
  selectedItems: {
    hair?: MinifigPartData | null;
    head?: MinifigPartData | null;
    torso?: MinifigPartData | null;
    leg?: MinifigPartData | null;
  };
}

export interface IMinifigProjectResponse {
  success: boolean;
  project: IMinifigProject;
}
