import { memo } from 'react';
import { IMinifigWardrobeItemsDetailsProps } from './MinifigWardrobeItemDetails.types';
import { MoveLeft } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import { StyledText } from '../StyledText';
import { cn } from '@/lib/utils';
import { MinifigProductSpecification } from '../MinifigProductSpecification';
import { ColorBadge } from '@/components/ColorBadge';
import { motion } from 'motion/react';
import { ProductBackButtonAnimation, WardrobeItemDetailsAnimation } from '@/animations';
import { getBuilderImage } from '@/utils';
import { WOFLogo } from '@/assets/images';

const MinifigWardrobeItemDetails = memo<IMinifigWardrobeItemsDetailsProps>(
  ({ wardrobeItems, onClick, onCategoryClick }) => {
    const outOfstock = wardrobeItems.stock === 0;
    const builderImage = getBuilderImage(wardrobeItems.product_images);

    return (
      <section className="border-2 border-gray-950 rounded-md md:border-0 ">
        <div className="bg-minifig-brand-end text-white md:h-full overflow-y-auto minifig-scrollbar">
          {/* Inner Wrapper  */}
          <section className="p-3">
            <motion.div
              className="w-fit h-fit mb-8"
              variants={ProductBackButtonAnimation}
              initial="initial"
              animate="enter"
            >
              <span
                className="flex gap-1 cursor-pointer items-center hover:bg-black/40 px-2 rounded-md"
                onClick={() => onClick?.()}
              >
                <MoveLeft size={38} strokeWidth={1} />
                <StyledText className="uppercase font-bold mb-0 text-xs" text="Back" />
              </span>
            </motion.div>

            <motion.section
              variants={WardrobeItemDetailsAnimation}
              animate="enter"
              initial="initial"
              exit="exit"
              className="flex flex-col lg:flex-row gap-4 justify-between"
            >
              {/*Product image  */}
              <figure className="w-1/2 rounded-md bg-white h-fit p-1">
                {builderImage ? (
                  <img
                    key={builderImage._id}
                    className="rounded-md aspect-square object-contain "
                    src={builderImage.url}
                    alt={builderImage.public_id}
                  />
                ) : (
                  <div className="h-36 flex flex-col bg-minifig-brand-end rounded-md justify-center items-center">
                    <img className="opacity-30 grayscale " src={WOFLogo} />
                  </div>
                )}
              </figure>

              {/*Product details Section  */}
              <section className="w-full h-full">
                <StyledText
                  className="font-bold text-2xl mb-4"
                  text={wardrobeItems.product_name}
                />

                {/* Product Unavailability indicator  */}

                {outOfstock && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-destructive" />
                    <StyledText
                      className="text-destructive mb-0 font-semibold"
                      text="Unavailable"
                    />
                  </div>
                )}

                <StyledText className="font-bold text-2xl mb-4" text={`$${wardrobeItems.price}`} />

                {/* Product details section  */}

                <section>
                  <StyledText
                    showCheckMark={false}
                    className="font-semibold text-md"
                    text="Features & Classifications"
                  />
                  <div className="flex gap-2">
                    {wardrobeItems.product_sub_categories.map((subCategory) => (
                      <StyledText
                        key={subCategory._id}
                        className="rounded-full px-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 "
                        text={subCategory.name}
                      />
                    ))}
                    {wardrobeItems.product_sub_collections.map((subCollections) => (
                      <StyledText
                        className="rounded-full px-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 border border-purple-600/20 "
                        key={subCollections._id}
                        text={subCollections.name}
                      />
                    ))}
                  </div>

                  <div>
                    <StyledText className="font-semibold text-md" text="Bundle Details" />
                    <StyledText
                      className="rounded-full w-fit px-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 "
                      text={wardrobeItems.product_includes}
                    />
                  </div>

                  <div>
                    <StyledText className="font-semibold text-md" text="Color" />
                  </div>

                  <ColorBadge colorName={wardrobeItems.product_color.name} />
                </section>

                {/* Additional Product details */}

                {wardrobeItems.product_description_1 && (
                  <StyledText showCheckMark text={wardrobeItems.product_description_1} />
                )}

                {wardrobeItems.product_description_2 && (
                  <StyledText showCheckMark text={wardrobeItems.product_description_2} />
                )}

                {wardrobeItems.product_description_3 && (
                  <StyledText showCheckMark text={wardrobeItems.product_description_3} />
                )}

                {/* cta buttons */}
                <div className="mt-5 flex w-full">
                  <CTAButton
                    size={null}
                    variant="ghost"
                    disabled={outOfstock || !builderImage}
                    className={cn(
                      'bg-yellow-300 text-md font-bold border-l-8 border-t-6 border-b-6 border-b-transparent border-l-yellow-600 border-t-yellow-400 shadow-lg shadow-yellow-400/50 hover:shadow-md hover:border-l-0 hover:border-t-transparent active:border-l-0 active:border-t-transparent transition-all duration-75 w-fit py-3 px-6 self-end rounded-sm text-black',
                      outOfstock &&
                        'bg-red-500 border-l-red-700 border-t-red-400 shadow-md shadow-red-400/30 text-white',
                    )}
                    onClick={() => onCategoryClick(wardrobeItems)}
                  >
                    {outOfstock ? 'Out of Stock' : 'Add to Project'}
                  </CTAButton>
                </div>
              </section>
            </motion.section>

            {/* Product Specication section */}
          </section>

          <MinifigProductSpecification
            minifigProductSpecification={{
              product_piece_count: wardrobeItems.product_piece_count,
              product_designer: wardrobeItems.product_designer,
              product_skill_level: wardrobeItems.product_skill_level,
            }}
            productDimension={{
              product_length: wardrobeItems.product_length,
              product_width: wardrobeItems.product_width,
              product_height: wardrobeItems.product_height,
            }}
          />
        </div>
      </section>
    );
  },
);

MinifigWardrobeItemDetails.displayName = 'MinifigWardrobeItemDetails';

export default MinifigWardrobeItemDetails;
