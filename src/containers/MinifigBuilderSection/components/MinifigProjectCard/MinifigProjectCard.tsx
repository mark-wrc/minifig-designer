import { Fragment, memo } from 'react';
import { IMinifigProjectProps } from './MinifigProject.types';

import { formatCurrency } from '@/utils';
import { StyledText } from '@/components';

const MinifigProjectCard = memo<IMinifigProjectProps>(({ summary, index }) => {
  const { project, minifigPart, totalPrice, hasCustomParts } = summary;

  return (
    <Fragment key={project._id || index}>
      <section className="border rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <StyledText className="font-semibold text-lg" as="h4" text={project.name} />
          <StyledText className="font-bold text-lg" as="span" text={formatCurrency(totalPrice)} />
        </div>

        {!hasCustomParts ? (
          <div className="text-orange-500 text-sm bg-orange-50 p-2 rounded">
            <StyledText text="⚠️ No Minifig parts selected" />
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            <StyledText
              className="mb-3 font-medium"
              text={`${minifigPart.length} Minifig parts selected:`}
            />
            <ul className="space-y-2 mb-3">
              {minifigPart.map((part) => (
                <li
                  key={part.product_name}
                  className="flex items-center justify-between bg-white p-2 rounded border"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={part.product_images?.[0]?.url}
                      alt={part.product_name}
                      className="w-1/4 rounded border object-cover"
                    />

                    {/* Product details section*/}
                    <section>
                      <StyledText className="font-medium text-gray-800" text={part.product_name} />
                      <StyledText
                        className="font-medium text-gray-800"
                        text={part.product_color.name}
                      />
                      <StyledText
                        className="text-xs text-gray-500"
                        text={part.minifig_part_type}
                      />
                    </section>
                  </div>

                  <StyledText
                    className="text-green-600 font-medium text-sm"
                    as="span"
                    text={formatCurrency(part.price)}
                  />
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
