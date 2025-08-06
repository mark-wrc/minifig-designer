import { memo } from 'react';
import { IProductSpecificationCardProps } from './ProductSpecificationCard.types';

const ProductSpecificationCard = memo<IProductSpecificationCardProps>(({ productDetails }) => (
  <section className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-2 ">
    {productDetails.map((detail, index) => (
      <div
        key={index}
        className="flex flex-col items-center w-full gap-2 mb-2 bg-[#28385880] text-white rounded-lg shadow-sm p-6"
      >
        {detail.icon}

        <span className="font-semibold  text-base md:text-md p-3">{detail.label}</span>
        <span className="">{detail.subLabel}</span>
      </div>
    ))}
  </section>
));

ProductSpecificationCard.displayName = 'ProductSpecificationCard';
export default ProductSpecificationCard;
