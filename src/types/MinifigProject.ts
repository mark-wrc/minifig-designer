import { IMinifigProject } from './Minifig';
import { IMinifigBodyResponse } from './MinifigBodyResponse';

export type IMinifigProjectPayloadResponse = {
  data: IMinifigProject[];
} & IMinifigBodyResponse;

export type IMinifigProjectByIdResponse = {
  data: IMinifigProject;
} & IMinifigBodyResponse;

export type IDeleteMinifigProjectResponse = {
  project: IMinifigProject;
} & IMinifigBodyResponse;

export type IMinifigProjectPayload = IMinifigProject;
