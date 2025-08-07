import { Fragment, memo } from 'react';
import { IMinifigProjectProps } from './MinifigProject.types';
import { MinifigPreview } from '../MinifigPreview';
import { formatCurrency } from '@/utils';

const MinifigProjectCard = memo<IMinifigProjectProps>(({ summary, index }) => {
  const { project, minifigPart, totalPrice, hasCustomParts } = summary;

  return (
    <Fragment key={project._id || index}>
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-lg">{project.name}</h4>
          <span className="font-bold text-lg">{formatCurrency(totalPrice)}</span>
        </div>

        {!hasCustomParts ? (
          <div className="text-orange-500 text-sm bg-orange-50 p-2 rounded">
            <p>⚠️ No custom parts selected</p>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            <p className="mb-3 font-medium">{minifigPart.length} custom parts selected:</p>
            <ul className="space-y-2 mb-3">
              {minifigPart.map((part) => (
                <li
                  key={part.product_name}
                  className="flex items-center justify-between bg-white p-2 rounded border"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={part.image || '/placeholder.svg'}
                      alt={part.product_name}
                      className="w-8 h-8 rounded border object-cover"
                    />
                    <div>
                      <span className="font-medium text-gray-800">{part.product_name}</span>
                      <p className="text-xs text-gray-500">{part.minifig_part_type}</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium text-sm">${part.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-600 mb-2">Character Preview:</p>
          <MinifigPreview selectedItems={project.selectedItems} />
        </div>
      </div>
    </Fragment>
  );
});

MinifigProjectCard.displayName = 'MinifigProjectCard';

export default MinifigProjectCard;
