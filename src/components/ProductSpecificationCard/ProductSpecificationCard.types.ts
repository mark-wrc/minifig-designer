import React from 'react';

export interface IProductSpecificationDetails {
  icon: React.ReactElement;
  label: string | number;
  subLabel?: string | number;
}

export interface IProductSpecificationCardProps {
  productDetails: IProductSpecificationDetails[];
}
