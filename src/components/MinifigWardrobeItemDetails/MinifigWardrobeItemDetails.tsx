import { memo } from 'react';
import { IMinifigWardrobeItemsDetailsProps } from './MinifigWardrobeItemDetails.types';
import { ArrowLeft } from 'lucide-react';
import { CTAButton } from '../CTAButton';
import { StyledText } from '../StyledText';
import { cn } from '@/lib/utils';
import { MinifigProductSpecification } from '../MinifigProductSpecification';
import { ColorBadge } from '@/ColorBadge';

const MinifigWardrobeItemDetails = memo<IMinifigWardrobeItemsDetailsProps>(
  ({ wardrobeItems, onClick, onCategoryClick }) => {
    const outOfstock = wardrobeItems.stock === 0;
    return (
      <section className="border-2 border-gray-950 rounded-md md:border-0 ">
        <div className="bg-minifig-brand-end text-white w-full h-full overflow-y-auto max-h-[620px] minifig-scrollbar">
          {/* Inner Wrapper  */}
          <section className="p-3">
            <CTAButton
              variant="default"
              onClick={onClick}
              icon={ArrowLeft}
              className="bg-yellow-500 text-black text-lg mb-8 hover:text-white"
            >
              Back
            </CTAButton>

            <section className="flex flex-col lg:flex-row gap-4 justify-between">
              {/*Product image  */}
              <figure className="w-1/2 rounded-md bg-white h-fit  border-2  border-gray-950">
                {wardrobeItems.product_images.map((item) => (
                  <img
                    key={item._id}
                    className=" rounded-md "
                    src={item.url}
                    alt={item.public_id}
                  />
                ))}
              </figure>

              {/*Product details Section  */}
              <section className="w-full h-full">
                <StyledText
                  className="font-bold text-2xl mb-4"
                  text={wardrobeItems.product_name}
                />

                {/* Product Unavailability indicator  */}

                {outOfstock && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-destructive" />
                    <p className="text-destructive">Unavailable</p>
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
                        className="rounded-full px-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 "
                        key={subCategory._id}
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
                <StyledText showCheckMark text={wardrobeItems.product_description_1} />
                <StyledText showCheckMark text={wardrobeItems.product_description_2} />
                {wardrobeItems.product_description_3 && (
                  <StyledText text={wardrobeItems.product_description_3} />
                )}

                {/* cta buttons */}
                <div className="mt-5 flex w-full">
                  <CTAButton
                    size={null}
                    variant="ghost"
                    disabled={outOfstock}
                    className={cn(
                      'bg-yellow-500 text-md w-fit py-3 px-6 self-end rounded-sm text-black',
                      outOfstock && 'bg-red-500',
                    )}
                    onClick={() => onCategoryClick(wardrobeItems)}
                  >
                    {outOfstock ? 'Out of Stock' : 'Add to Project'}
                  </CTAButton>
                </div>
              </section>
            </section>
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
