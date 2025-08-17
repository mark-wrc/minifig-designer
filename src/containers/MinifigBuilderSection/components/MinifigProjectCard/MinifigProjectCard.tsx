import { Fragment, memo } from 'react';
import { IMinifigProjectProps } from './MinifigProject.types';

import { formatCurrency } from '@/utils';
import { StyledText } from '@/components';

const MinifigProjectCard = memo<IMinifigProjectProps>(({ summary, index }) => {
  const { project, minifigPart, totalPrice, hasCustomParts } = summary;

  return (
    <Fragment key={project._id || index}>
      <section className="border rounded-lg p-2 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <StyledText className="font-bold text-xl text-wrap" as="p" text={project.name} />
          <StyledText
            className="font-bold text-xl text-green-600 "
            as="span"
            text={formatCurrency(totalPrice)}
          />
        </div>

        {!hasCustomParts ? (
          <div className="text-orange-500 text-sm bg-orange-50 p-2 rounded">
            <StyledText text="⚠️ No Minifig parts selected" />
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            <StyledText
              className="mb-3 font-semibold text-lg"
              text={`${minifigPart.length} Minifig parts selected:`}
            />
            <ul className="space-y-2 mb-3">
              {minifigPart.map((part) => (
                <li
                  key={part.product_name}
                  className="flex items-center justify-between bg-white p-2 rounded border"
                >
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className="flex justify-center gap-2 items-center flex-col md:flex-row">
                      <img
                        src={part.product_images?.[0]?.url}
                        alt={part.product_name}
                        className=" w-[70%] sm:w-[50%] md:w-1/4 rounded border object-cover"
                      />
                      {/* Product details section*/}
                      <section className="p-1 w-full">
                        <StyledText
                          className="font-bold text-lg text-gray-800"
                          text={part.product_name}
                        />
                        <StyledText
                          className="font-semibold text-lg text-gray-800"
                          text={part.product_color.name}
                        />
                        <StyledText
                          className="text-lg font-semibold text-gray-500"
                          text={part.minifig_part_type}
                        />
                      </section>
                    </div>

                    <StyledText
                      className="text-green-600 font-bold text-xl"
                      as="span"
                      text={formatCurrency(part.price)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </Fragment>
  );
});

MinifigProjectCard.displayName = 'MinifigProjectCard';

export default MinifigProjectCard;
