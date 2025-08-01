import { Fragment, memo } from 'react';
import { IMinifigProjectProps } from './MinifigProject.types';

const MinifigProjectCard = memo<IMinifigProjectProps>(({ summary, index }) => {
  const { project, minifigPart, totalPrice, hasCustomParts } = summary;

  return (
    <Fragment key={project.id || index}>
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-lg">{project.name}</h4>
          <span className="font-bold text-lg">${totalPrice}</span>
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
                  key={part.name}
                  className="flex items-center justify-between bg-white p-2 rounded border"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={part.image || '/placeholder.svg'}
                      alt={part.name}
                      className="w-8 h-8 rounded border object-cover"
                    />
                    <div>
                      <span className="font-medium text-gray-800">{part.name}</span>
                      <p className="text-xs text-gray-500">{part.type}</p>
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
          <div className="flex gap-2">
            <img
              src={project.head}
              alt="Head"
              className="w-12 h-12 rounded border"
              title={project.selectedItems?.head?.name || 'Default Head'}
            />
            <img
              src={project.torso}
              alt="Torso"
              className="w-12 h-12 rounded border"
              title={project.selectedItems?.torso?.name || 'Default Torso'}
            />
            <img
              src={project.legs}
              alt="Legs"
              className="w-12 h-12 rounded border"
              title={project.selectedItems?.legs?.name || 'Default Legs'}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

MinifigProjectCard.displayName = 'MinifigProjectCard';

export default MinifigProjectCard;
