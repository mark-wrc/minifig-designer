import { MinifigPartData } from './Minifig';
import { MinifigPartType } from './MinifigActions';

export interface ICartItem {
  _id: string;
  name: string;
  images: string;
  color: string;
  price: number;
  stock: number;
  quantity: number;
  createdAt: number;
  partType: MinifigPartType;
  partName: string;
  addedAt: number;
}

export interface CartProject {
  projectName: string;
  items: ICartItem[];
  totalPrice: number;
  createdAt: number;
}

export interface selectedMinifigParts {
  type: string;
  image: string;
  name: string;
  price?: number;
  stock?: number;
  color?: string;
  _id: string;
}

export interface AddCharacterPayload {
  _id: string;
  projectName: string;
  selectedParts: MinifigPartData[];
  pricePerItem?: number;
  quantity?: number;
  stock?: number;
  color: string;
}
