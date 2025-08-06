import { IMinifigProductBaseDetails } from '@/types/Minifig';

export interface IProductSpecification {
  product_skill_level: IMinifigProductBaseDetails;
  product_designer: IMinifigProductBaseDetails;
  product_piece_count: number;
}
export interface productDimension {
  product_length: number;
  product_width: number;
  product_height: number;
}

export interface IMinifigProductSpecificationProps {
  minifigProductSpecification: IProductSpecification;
  productDimension?: productDimension;
}
