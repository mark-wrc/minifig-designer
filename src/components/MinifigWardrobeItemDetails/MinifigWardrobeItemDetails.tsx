import { memo } from 'react';
import { IMinifigWardrobeItemsDetailsProps } from './MinifigWardrobeItemDetails.types';
import { ArrowLeft } from 'lucide-react';
import { CTAButton } from '../CTAButton';

const MinifigWardrobeItemDetails = memo<IMinifigWardrobeItemsDetailsProps>(
  ({ wardrobeItems, onClick, onCategoryClick }) => {
    return (
      <section className="border-2 border-gray-950 rounded-t-2xl p-2 md:border-0">
        <div className="bg-white rounded-lg  w-full p-3 h-full ">
          <CTAButton onClick={onClick} icon={ArrowLeft} className="bg-yellow-500">
            Back
          </CTAButton>
          <p className="font-bold text-2xl md:text-4xl">{wardrobeItems.name}</p>
          <p className="text-xl text-gray-800 mb-2">{wardrobeItems.description}</p>
          <img className="w-[50%] mx-auto " src={wardrobeItems.image} alt={wardrobeItems.name} />
          <p className="text-green-600 text-center font-bold text-xl">${wardrobeItems.price}</p>

          <div className="w-full flex justify-center mt-10">
            <CTAButton
              className="bg-yellow-500 text-md w-fit self-center px-6 -translate-y-2 rounded-sm"
              onClick={() => onCategoryClick(wardrobeItems)}
            >
              Add to project
            </CTAButton>
          </div>
        </div>
      </section>
    );
  },
);

MinifigWardrobeItemDetails.displayName = 'MinifigWardrobeItemDetails';

export default MinifigWardrobeItemDetails;
