import { memo } from 'react';
import { IProductSpecificationCardProps } from './ProductSpecificationCard.types';
import { AnimatePresence, motion } from 'motion/react';
import { ProductSpecificationCardAnimation } from '@/animations';
const ProductSpecificationCard = memo<IProductSpecificationCardProps>(({ productDetails }) => (
  <section className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2 w-full gap-2 ">
    <AnimatePresence>
      {productDetails.map((detail, index) => (
        <motion.div
          variants={ProductSpecificationCardAnimation}
          initial="initial"
          animate="enter"
          exit="exit"
          custom={index}
          key={index}
          className="flex flex-col items-center w-full gap-2 mb-2 bg-[#28385880] text-white rounded-lg shadow-sm p-6"
        >
          {detail.icon}

          <span className="font-semibold  text-base md:text-md p-3">{detail.label}</span>
          <span className="">{detail.subLabel}</span>
        </motion.div>
      ))}
    </AnimatePresence>
  </section>
));

ProductSpecificationCard.displayName = 'ProductSpecificationCard';
export default ProductSpecificationCard;
