import { IMinifigBodyResponse } from './MinifigBodyResponse';
import { MinifigPartType } from './MinifigActions';

export interface MinifigPart {
  type: string;
  image: string;
  name: string;
  stock: number;
}

export interface IMinifigProductImage {
  public_id: string;
  url: string;
  _id: number;
}

// for creating a project
export interface MinifigPartData {
  _id: string;
  minifig_part_type: 'HEAD' | 'TORSO' | 'LEGS';
  product_name: string;
  product_description_1: string;
  product_description_2: string;
  product_description_3: string;
  product_images: IMinifigProductImage[];
  image: string;
  price: number;
  stock: number;
}

export interface SelectedMinifigItems {
  head?: MinifigPartData;
  torso?: MinifigPartData;
  legs?: MinifigPartData;
}

export interface IMinifigProject {
  _id: string;
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
  stock: number;
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
