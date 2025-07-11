export interface ICartItem {
  id: string;
  partType: string;
  partName: string;
  partImage: string;
  price: number;
  addedAt: number;
  quantity: number;
  stock: number;
}

export interface CartProject {
  projectName: string;
  items: ICartItem[];
  totalPrice: number;
  createdAt: number;
}

export interface AddCharacterPayload {
  projectName: string;
  selectedParts: Array<{
    type: string;
    image: string;
    name: string;
  }>;
  pricePerItem?: number;
  quantity?: number;
  stock?: number;
}
