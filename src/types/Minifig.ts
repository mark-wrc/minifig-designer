import { IMinifigBodyResponse } from './MinifigBodyResponse';
import { MinifigPartType } from './MinifigActions';

export type ProductImageUsage = 'MAIN_SITE' | 'MINIFIG_BUILDER' | 'BOTH';

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
  usage: ProductImageUsage;
}

export interface IMinifigProductBaseDetails {
  _id: string;
  name: string;
}

// for creating a project
export interface IBaseMinifigPart {
  _id: string;
  minifig_part_type: MinifigPartType;
  product_name: string;
  product_description_1: string;
  price: number;
  stock: number;
  product_color: IMinifigProductBaseDetails;
  product_images: IMinifigProductImage[];
  product_sub_collections?: IMinifigProductBaseDetails[];
}

export interface MinifigPartData {
  _id: string;
  minifig_part_type: MinifigPartType;
  product_name: string;
  product_description_1: string;
  product_description_2: string;
  product_description_3: string;
  product_images: IMinifigProductImage[];
  image: string;
  price: number;
  stock: number;
  product_sub_categories: IMinifigProductBaseDetails[];
  product_sub_collections: IMinifigProductBaseDetails[];
  product_skill_level: IMinifigProductBaseDetails;
  product_designer: IMinifigProductBaseDetails;
  product_piece_count: number;
  product_includes: string;
  product_length: number;
  product_width: number;
  product_height: number;
  product_color: IMinifigProductBaseDetails;
}

export type MinifigSlot = MinifigPartData | null;

export interface IApiMinifigSelectedPart {
  id: string;
  type: MinifigPartType;
  name: string;
  description: string;
  price: number;
  stock: number;
  color: string;
  displayType: string;
  product_images: IMinifigProductImage[];
}

export interface SelectedMinifigItems {
  hair?: MinifigPartData;
  head?: MinifigPartData;
  torso?: MinifigPartData;
  legs?: MinifigPartData;
  accessory?: MinifigSlot[];
}

export interface IMinifigProject {
  _id: string;
  name: string;
  hair: string;
  head: string;
  torso: string;
  legs: string;
  accessory: string[];
  selectedItems: SelectedMinifigItems;
}

export interface IMinifigCart {
  _id: string;
  minifig_part_type: MinifigPartType;
  product_name: string;
  image: string;
  price: number;
  stock: number;
  discount?: number;
  discounted_price?: number;
  color?: string;
  includes?: string;
  quantity?: number;
}

export interface MinfigProjectSummary {
  project: IMinifigProject;
  minifigPart: IBaseMinifigPart[];
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
