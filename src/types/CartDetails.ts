export interface ICartItem {
  id: string;
  partType: string;
  partName: string;
  partImage: string;
  price: number;
  addedAt: number;
  quantity: number;
  stock: number;
  color?: string;
  discount?: number;
  discounted_price?: number;
  includes?: string;
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
  color?: string; // Added color for consistency
}

export interface AddCharacterPayload {
  projectName: string;
  selectedParts: selectedMinifigParts[];
  pricePerItem?: number;
  quantity?: number;
  stock?: number;
  color: string;
}
