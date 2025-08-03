import { IMinifigBodyResponse } from './MinifigBodyResponse';
import { MinifigPartType } from './MinifigActions';

export interface MinifigPart {
  type: string;
  image: string;
  name: string;
  stock: number;
}

// for creating a project
export interface MinifigPartData {
  id: string;
  type: 'HEAD' | 'TORSO' | 'LEGS';
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface SelectedMinifigItems {
  head?: MinifigPartData;
  torso?: MinifigPartData;
  legs?: MinifigPartData;
}

export interface IMinifigProject {
  id: string;
  name: string;
  head: string;
  torso: string;
  legs: string;
  selectedItems: SelectedMinifigItems;
}

export interface CustomPart extends MinifigPart {
  price: number;
}

export interface MinfigProjectSummary {
  project: IMinifigProject;
  minifigPart: CustomPart[];
  totalPrice: number;
  hasCustomParts: boolean;
}

export interface IMinifigData {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  type: MinifigPartType;
}

export interface CartSummary {
  validProjects: number;
  totalItems: number;
  totalPrice: number;
  projectSummaries: MinfigProjectSummary[];
}

export type IMinifigPayload = MinifigPartData;

export type IMinifigPayloadResponse = {
  data: IMinifigPayload[];
} & IMinifigBodyResponse;
