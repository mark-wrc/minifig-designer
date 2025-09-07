import { Fragment, memo } from 'react';
import { IMinifigProjectProps } from './MinifigProject.types';

import { formatCurrency } from '@/utils';
import { StyledText } from '@/components';

const MinifigProjectCard = memo<IMinifigProjectProps>(({ summary, index }) => {
  const { project, minifigPart, totalPrice, hasCustomParts } = summary;

  return (
    <Fragment key={project._id || index}>
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
        <>
          <StyledText
            className="mb-3 font-bold text-lg"
            text={`${minifigPart.length} Minifig parts selected:`}
          />
          <ul className="space-y-2 mb-3">
            {minifigPart.map((part) => (
              <li
                key={part.product_name}
                className="flex items-center justify-between p-2 rounded-md border-2 border-gray-300 bg-minifig-brand-end"
              >
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="flex justify-center gap-2 items-center flex-col md:flex-row">
                    <div className="p-2 w-[70%] sm:w-[50%] md:w-1/4 border-2 rounded-md bg-white border-gray-800">
                      <img
                        src={part.product_images?.[0]?.url}
                        alt={part.product_name}
                        className="aspect-square object-contain"
                      />
                    </div>
                    {/* Product details section*/}
                    <section className="p-1 w-full">
                      <StyledText
                        className="font-bold text-sm text-gray-300 capitalize mb-1"
                        text={part.product_name}
                      />
                      <StyledText
                        className="font-semibold text-sm transition-colors mb-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-600/20 w-fit px-2 rounded-full"
                        text={part.product_color.name}
                      />
                      <StyledText
                        className="text-sm font-bold transition-colors mb-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 border border-yellow-400/20 w-fit rounded-full px-2"
                        text={part.minifig_part_type}
                      />
                    </section>
                  </div>

                  <StyledText
                    className="text-gray-300 text-lg font-bold"
                    as="span"
                    text={formatCurrency(part.price)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Fragment>
  );
});

MinifigProjectCard.displayName = 'MinifigProjectCard';

export default MinifigProjectCard;
