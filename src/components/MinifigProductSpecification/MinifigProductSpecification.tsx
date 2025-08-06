import { memo } from 'react';
import { IMinifigProductSpecificationProps } from './MinifigProductSpecification.types';
import { ProductSpecificationCard } from '../ProductSpecificationCard';
import { Box, Dices, Ruler, User } from 'lucide-react';
import { Divider } from '../Divider';

const MinifigProductSpecification = memo<IMinifigProductSpecificationProps>(
  ({ minifigProductSpecification, productDimension }) => {
    const formattedDimensions = productDimension
      ? `${productDimension.product_length}x${productDimension.product_width}x${productDimension.product_height} cm`
      : 'N/A';

    return (
      <section className="py-4 mt-4 bg-[#28385880] px-3">
        <div>
          <div className=" flex gap-2 items-center">
            <Divider className="w-1 h-8 rounded-full bg-yellow-300" />
            <p className="text-2xl my-4 font-semibold">Specifications</p>
          </div>

          <div className="flex">
            <ProductSpecificationCard
              productDetails={[
                {
                  icon: <Box className="text-orange-400" size={32} />,
                  label: 'Piece Count',
                  subLabel: minifigProductSpecification.product_piece_count,
                },
                {
                  icon: <Dices className="text-green-400" size={32} />,
                  label: 'Skill Level',
                  subLabel: minifigProductSpecification.product_skill_level.name,
                },
                {
                  icon: <Ruler className="text-blue-400" size={32} />,
                  label: 'Dimensions',
                  subLabel: formattedDimensions,
                },
                {
                  icon: <User className=" text-purple-400" size={32} />,
                  label: 'Designed By',
                  subLabel: minifigProductSpecification.product_designer.name,
                },
              ]}
            />
          </div>
        </div>
      </section>
    );
  },
);
MinifigProductSpecification.displayName = 'MinifigProductSpecification';

export default MinifigProductSpecification;
